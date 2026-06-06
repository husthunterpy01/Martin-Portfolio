import React, { useState } from "react";
import { FaBuilding, FaBriefcase, FaChevronDown } from "react-icons/fa";
import ddecImg from '../image/company_icon/DDEC.png';

const volunteers = [
  {
    role: "Volunteer Software Engineer",
    company: "Darling Downs Environmental Council",
    companyIcon: ddecImg,
    location: "Queensland (remote)",
    period: "May 2026 – Now",
    details: [
      "Design the users UI using Figma",
      "Implement volunteer's notification page and list users using ReactJS and SpringBoot"
    ]
  }
];

const Volunteer = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggle = (index) => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section id="volunteer">
      <h2>Volunteer</h2>

      <div className="timeline interactive-timeline">
        {volunteers.map((exp, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div key={idx} className="timeline-item interactive-item">
              <div className={`timeline-dot ${isActive ? "active-dot" : ""}`} />

              <button
                className={`timeline-header ${isActive ? "active" : ""}`}
                onClick={() => toggle(idx)}
              >
                <div className="timeline-header-main">
                  {exp.companyIcon ? (
                    <img 
                      src={exp.companyIcon} 
                      alt={`${exp.company} logo`}
                      className="timeline-icon timeline-company-icon"
                    />
                  ) : (
                    <FaBriefcase className="timeline-icon" />
                  )}
                  <div>
                    <h3 className="timeline-role">{exp.role}</h3>
                    <p className="timeline-company">
                      <FaBuilding style={{ marginRight: 6 }} />
                      {exp.company}
                    </p>
                    <p className="timeline-meta">
                      {exp.location} · {exp.period}
                    </p>
                  </div>
                </div>
                <FaChevronDown
                  className={`chevron ${isActive ? "chevron-open" : ""}`}
                />
              </button>

              <div
                className={`timeline-details-wrapper ${
                  isActive ? "open" : ""
                }`}
              >
                <ul className="timeline-details">
                  {exp.details.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Volunteer;
