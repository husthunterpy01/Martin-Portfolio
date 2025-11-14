import React from 'react';
import { FaGraduationCap, FaUniversity } from 'react-icons/fa';

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
  return (
    <section id="education">
      <h2>Education</h2>

      <div className="stack-grid">
        {education.map((edu, idx) => (
          <div key={idx} className="stack-group">
            <div className="stack-header">
              <FaGraduationCap className="skill-icon" />
              <span className="stack-title">{edu.degree}</span>
            </div>

            <p style={{ color: '#9ca3af', marginBottom: '0.4rem' }}>
              <FaUniversity style={{ marginRight: '6px' }} /> {edu.school}
            </p>
            <p style={{ color: '#64748b', marginBottom: '1rem', fontSize: '0.85rem' }}>
              {edu.period}
            </p>

            {edu.details.map((line, i) => (
              <p key={i} style={{ fontSize: '0.85rem', color: '#d1d5db', marginBottom: '0.4rem' }}>
                • {line}
              </p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
