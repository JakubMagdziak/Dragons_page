import React from "react";
import { useTranslation } from "react-i18next";

function Contact() {
  const { t } = useTranslation();

  return (
    <section className="page-section">
      <h1>{t("contact.title")}</h1>
      <p>{t("contact.description")}</p>
      <ul>
        <li>Email: kontakt@twojekolo.pl</li>
        <li>Discord: zaproszenie</li>
        <li>Sala: B-123</li>
      </ul>
    </section>
  );
}

export default Contact;
