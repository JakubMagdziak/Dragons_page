import React from "react";
import { useTranslation } from "react-i18next";

function Projects() {
  const { t } = useTranslation();

  return (
    <section className="page-section">
      <h1>{t("projects.title")}</h1>
      <p>{t("projects.description")}</p>
      {/* TODO: lista projektów w przyszłości */}
    </section>
  );
}

export default Projects;
