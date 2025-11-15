import React, { useState } from 'react';
import { FaGraduationCap, FaUniversity, FaChevronDown } from 'react-icons/fa';

const education = [
  {
    degree: "Master of Information Technology (AI Specialisation)",
    school: "University of Western Australia (UWA)",
    period: "2024 – 2026",
    details: [
      "Focused on Machine Learning, Natural Language Processing, and AI systems.",
      "Strong coursework in distributed systems, cloud computing, and software design."
    ]
  },
  {
    degree: "Bachelor of Electronics and Telecommunications Engineering",
    school: "Hanoi University of Science and Technology",
    period: "2019 – 2023",
    details: [
      "Completed foundational and advanced coursework in electronics, programming, and telecommunications systems.",
      "Focused on software engineering, embedded systems, and database management throughout the degree.",
      "Developed graduation project on bee sound classification using deep learning, later published in Ecological Informatics (Elsevier, 2023).",
      "Built multiple OOP-based applications using Java, C, and Python during academic and lab projects."
    ]
  }
];

const Education = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="education">
      <h2>Education</h2>

      <div className="timeline">
        {education.map((edu, idx) => (
          <div key={idx} className="interactive-item">
            {/* Timeline Dot */}
            <div className={`timeline-dot ${openIndex === idx ? 'active-dot' : ''}`} />

            {/* Collapsible Header */}
            <button
              className={`timeline-header ${openIndex === idx ? 'active' : ''}`}
              onClick={() => toggle(idx)}
            >
              <div className="timeline-header-main">
                <FaGraduationCap className="timeline-icon" />
                <div>
                  <h3 className="timeline-role">{edu.degree}</h3>
                  <p className="timeline-company">
                    <FaUniversity style={{ marginRight: '6px', fontSize: '0.85rem' }} />
                    {edu.school}
                  </p>
                  <p className="timeline-meta">{edu.period}</p>
                </div>
              </div>
              <FaChevronDown className={`chevron ${openIndex === idx ? 'chevron-open' : ''}`} />
            </button>

            {/* Details (Collapsible) */}
            <div className={`timeline-details-wrapper ${openIndex === idx ? 'open' : ''}`}>
              <ul className="timeline-details">
                {edu.details.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;