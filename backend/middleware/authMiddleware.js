import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    console.log('Brak lub błędny nagłówek autoryzacji');
    return res.status(401).json({ error: 'Brak tokena' });
  }

  const token = authHeader.split(' ')[1];

  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET nie został ustawiony!');
    return res.status(500).json({ error: 'Błąd serwera - brak JWT_SECRET' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log('Błąd weryfikacji tokena:', err.message);
    return res.status(403).json({ error: 'Nieprawidłowy token' });
  }
};

export default authMiddleware;
