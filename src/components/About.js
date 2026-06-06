import React, { useState } from 'react';
import { FaGraduationCap, FaUniversity, FaChevronDown, FaRegCalendarAlt } from 'react-icons/fa';
import TechIcon from './TechIcon';
import uwaIcon from '../image/school_icon/logo_uwa.png';
import hustIcon from '../image/school_icon/hust_logo.png';

const techStacks = [
  {
    label: 'Programming Languages',
    icon: '💻',
    items: ['C#', 'Python', 'Java', 'JavaScript'],
  },
  {
    label: 'Web & Application',
    icon: '🌐',
    items: ['ASP.NET', 'FastAPI', 'Flask', 'ReactJS'],
  },
  {
    label: 'AI & Machine Learning',
    icon: '🤖',
    items: ['PyTorch', 'Scikit-learn', 'TensorFlow'],
  },
  {
    label: 'Databases & Search',
    icon: '🗄️',
    items: ['SQL Server', 'MySQL', 'MongoDB', 'OpenSearch'],
  },
  {
    label: 'Cloud Platforms',
    icon: '☁️',
    items: ['Azure', 'AWS'],
  },
  {
    label: 'Data & Orchestration',
    icon: '📦',
    items: ['Docker', 'Spark', 'Kafka'],
  },
];

const education = [
  {
    degree: 'Master of Information Technology (Applied Computing Specialisation)',
    school: 'University of Western Australia (UWA)',
    schoolIcon: uwaIcon,
    period: '2025 – 2026',
    details: [
      'Specialised in applied computing with a focus on software engineering, distributed systems, and cloud computing.',
      'Built full-stack and data-driven applications through practical, project-based coursework.',
      'Applied machine learning and data analytics techniques to real-world software problems.',
    ],
  },
  {
    degree: 'Bachelor of Electronics and Telecommunications Engineering',
    school: 'Hanoi University of Science and Technology',
    schoolIcon: hustIcon,
    period: '2019 – 2023',
    details: [
      'Completed foundational and advanced coursework in electronics, programming, and telecommunications systems.',
      'Focused on software engineering, embedded systems, and database management throughout the degree.',
      'Developed graduation project on bee sound classification using deep learning, later published in Ecological Informatics (Elsevier, 2023).',
      'Built multiple OOP-based applications using Java, C, and Python during academic and lab projects.',
    ],
  },
];

const About = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleEducation = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <>
      <section id="about" className="about page-section">
        <h2>About Me</h2>
        <p className="page-intro">
          Software developer and AI enthusiast with hands-on experience building
          production systems in .NET and Python — spanning backend architecture,
          RESTful APIs, machine learning models, and scalable cloud applications.
          I care about writing clean, maintainable code and designing systems that
          stay reliable as they grow, whether that means tightening performance,
          improving test coverage, or simplifying a tangled workflow.
        </p>
        <p>
          Recently I&apos;ve been focusing on machine learning infrastructure,
          data-driven features, and backend services that support real products.
          I enjoy working across the full lifecycle — from researching and
          prototyping an idea, to shipping it through CI/CD, to monitoring it in
          the wild — and I&apos;m always looking for opportunities to turn complex,
          messy problems into clear, well-engineered solutions.
        </p>

        <div className="stack-grid" id="tech-stack">
          {techStacks.map((stack) => (
            <div key={stack.label} className="stack-group">
              <div className="stack-header">
                <span className="stack-icon" aria-hidden="true">
                  {stack.icon}
                </span>
                <span className="stack-title">{stack.label}</span>
              </div>
              <div className="skills">
                {stack.items.map((item) => (
                  <span key={item} className="skill-item">
                    <TechIcon techName={item} className="skill-tech-icon" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="education" className="education page-section">
        <h2>Education</h2>
        <p className="page-intro">
          Academic background in engineering and information technology, with a
          focus on AI, software systems, and applied research.
        </p>

        <div className="timeline">
          {education.map((edu, idx) => (
            <div key={edu.school} className="interactive-item">
              <div
                className={`timeline-dot ${
                  openIndex === idx ? 'active-dot' : ''
                }`}
              />

              <button
                className={`timeline-header ${
                  openIndex === idx ? 'active' : ''
                }`}
                onClick={() => toggleEducation(idx)}
                type="button"
              >
                <div className="timeline-header-main">
                  {edu.schoolIcon ? (
                    <img
                      src={edu.schoolIcon}
                      alt={`${edu.school} logo`}
                      className="timeline-icon timeline-school-icon"
                    />
                  ) : (
                    <FaGraduationCap className="timeline-icon" />
                  )}
                  <div>
                    <h3 className="timeline-role">{edu.degree}</h3>
                    <p className="timeline-company">
                      <FaUniversity
                        style={{ marginRight: '6px', fontSize: '0.85rem' }}
                      />
                      {edu.school}
                    </p>
                    <p className="timeline-meta">
                      <span className="timeline-period">
                        <FaRegCalendarAlt className="timeline-period-icon" aria-hidden="true" />
                        {edu.period}
                      </span>
                    </p>
                  </div>
                </div>
                <FaChevronDown
                  className={`chevron ${
                    openIndex === idx ? 'chevron-open' : ''
                  }`}
                />
              </button>

              <div
                className={`timeline-details-wrapper ${
                  openIndex === idx ? 'open' : ''
                }`}
              >
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
    </>
  );
};

export default About;
