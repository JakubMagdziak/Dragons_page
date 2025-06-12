import React, { useEffect, useRef } from "react";

const POINT_RADIUS = 6.5;
const NAVBAR_HEIGHT = 60;
const MAX_DISTANCE = 150;
const LINE_WIDTH = 1.5;

const createRandomPoint = (width, height) => {
  const vx = (Math.random() - 0.5) * 0.8;
  const vy = (Math.random() - 0.5) * 0.8;
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx,
    vy,
    vxOriginal: vx,
    vyOriginal: vy,
  };
};

const NetworkNodes = ({ isRunning = true, isDarkMode = true }) => {
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const animationIdRef = useRef(null);

  // Ustawianie prędkości punktów wg stanu animacji
  const setPointsVelocity = (points, running) => {
    points.forEach((p) => {
      if (running) {
        p.vx = p.vxOriginal;
        p.vy = p.vyOriginal;
      } else {
        p.vx = 0;
        p.vy = 0;
      }
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - NAVBAR_HEIGHT;
    };
    resize();
    window.addEventListener("resize", resize);

    const numPoints = 60;
    pointsRef.current = new Array(numPoints)
      .fill(0)
      .map(() => createRandomPoint(canvas.width, canvas.height));

    setPointsVelocity(pointsRef.current, isRunning);

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Tło dynamiczne
      ctx.fillStyle = isDarkMode ? "black" : "white";
      ctx.fillRect(0, 0, width, height);

      // Kolory zależne od trybu
      const POINT_COLOR = isDarkMode ? "#00ff00" : "#009900";
      const SHADOW_COLOR = isDarkMode
        ? "rgba(0, 255, 0, 0.8)"
        : "rgba(10, 207, 10, 0.86)";
      const LINE_COLOR = isDarkMode
        ? "rgba(0, 255, 0, 0.6)"
        : "rgba(0, 161, 0, 0.81)";

      ctx.strokeStyle = LINE_COLOR;
      ctx.lineWidth = LINE_WIDTH;
      ctx.shadowColor = SHADOW_COLOR;
      ctx.shadowBlur = 5;

      const points = pointsRef.current;

      // Rysowanie dynamicznych linii między punktami
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const p1 = points[i];
          const p2 = points[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist <= MAX_DISTANCE) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Rysowanie punktów
      ctx.fillStyle = POINT_COLOR;
      ctx.shadowColor = SHADOW_COLOR;
      ctx.shadowBlur = 10;
      points.forEach(({ x, y }) => {
        ctx.beginPath();
        ctx.arc(x, y, POINT_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      });

      // Aktualizacja pozycji punktów jeśli animacja działa
      if (isRunning) {
        points.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < POINT_RADIUS) p.vx = Math.abs(p.vx);
          if (p.x > width - POINT_RADIUS) p.vx = -Math.abs(p.vx);
          if (p.y < POINT_RADIUS) p.vy = Math.abs(p.vy);
          if (p.y > height - POINT_RADIUS) p.vy = -Math.abs(p.vy);
        });
      }

      animationIdRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
    };
  }, [isRunning, isDarkMode]);

  // Gdy isRunning się zmienia, aktualizujemy prędkości
  useEffect(() => {
    setPointsVelocity(pointsRef.current, isRunning);
  }, [isRunning]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        position: "fixed",
        top: `${NAVBAR_HEIGHT}px`,
        left: 0,
        width: "100vw",
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
        zIndex: -1,
        backgroundColor: isDarkMode ? "black" : "white",
      }}
    />
  );
};

export default NetworkNodes;
