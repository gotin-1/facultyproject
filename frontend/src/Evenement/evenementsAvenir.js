import React, { useEffect, useState } from "react";
import AppelImage from "../assets/documents/Appel_Contrbution.png";
import JournéeImage from "../assets/documents/Journée_doctorale.png";
import PDF1 from "../assets/documents/Appel_Contrbution.pdf";
import PDF2 from "../assets/documents/4_5774101161694992166.pdf";
import PDF3 from "../assets/documents/دعوة للنشر.pdf";
import "../assets/css/evenement.css";

// Correctly define the initial data
const initialEvenementR = [
  {
    id: 1,
    titre: "JOURNÉE DE RECHERCHE SCIENTIFIQUE 2022 DE L'ESTC (JRS'22-ESTC)",
    afficheUrl: AppelImage,
    date: "2022-06-16",
    description:
      "École Supérieure de Technologie organise la Journée de Recherche Scientifique 2022 de l'ESTC sous le thème «La recherche scientifique au service de l'innovation» le 16 juin...",
    pdf: PDF1,
    link: "#",
  },
  {
    id: 2,
    titre: "Journée doctorale organisée",
    afficheUrl: JournéeImage,
    date: "2024-10-16",
    description:
      "Journée doctorale organisée par :Le laboratoire « Droit et management des affaires »À la Faculté des Sciences Juridiques Economiques et Sociales Ain Chock-Salle de conférence 2-",
    pdf: PDF2,
    link: "#",
  },
  {
    id: 3,
    titre: "Atelier sur le Développement Durable et l'Énergie",
    afficheUrl: AppelImage,
    date: "2023-12-12",
    description:
      "Un atelier pratique pour explorer les solutions durables dans le domaine de l'énergie et du développement.",
    pdf: PDF3,
    link: "#",
  },
];

// Export the initial data correctly
export { initialEvenementR };

export default function EvenementRecent() {
  const [evenements, setEvenements] = useState(initialEvenementR);

  useEffect(() => {
    fetch("http://localhost:8080/facultyproject/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        return response.json();
      })
      .then((data) => setEvenements((prev) => [...prev, ...data]))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDownload = (pdf) => {
    const link = document.createElement("a");
    link.href = pdf;
    link.download = pdf.split("/").pop();
    link.click();
  };

  return (
    <div className="evenement-page">
      <div className="evenement-grid">
        {evenements.map((eve) => (
          <div className="evenement-card" key={eve.id}>
            <img
              src={eve.afficheUrl}
              alt={eve.titre}
              className="evenement-photo"
            />
            <div className="evenement-content">
              <h3 className="evenement-title">{eve.titre}</h3>
              <p className="evenement-date">
                {new Date(eve.date).toLocaleDateString()}
              </p>
              <p className="evenement-description">{eve.description}</p>
              <div>
                {eve.pdf && (
                  <button
                    onClick={() => handleDownload(eve.pdf)}
                    className="evenement-download-button"
                  >
                    Télécharger le PDF
                  </button>
                )}
                {eve.link && (
                  <a href={eve.link} className="evenement-link">
                    Lire la suite
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
