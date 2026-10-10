import React from 'react';
import {
  PiCode,
  PiGlobe,
  PiBrain,
  PiDatabase,
  PiCloud,
  PiPackage,
} from 'react-icons/pi';
import TechIcon from './TechIcon';
import Timeline from './Timeline';
import uwaIcon from '../image/school_icon/logo_uwa.png';
import hustIcon from '../image/school_icon/hust_logo.png';

const techStacks = [
  {
    label: 'Languages',
    icon: PiCode,
    items: ['Python', 'C#', 'Java', 'JavaScript'],
  },
  {
    label: 'Frameworks',
    icon: PiGlobe,
    items: [
      'ASP.NET',
      'Spring Boot',
      'FastAPI',
      'Flask',
      'ReactJS',
      'NextJs',
      'Angular',
    ],
  },
  {
    label: 'Artificial Intelligence',
    icon: PiBrain,
    items: ['PyTorch', 'Scikit-learn', 'HuggingFace', 'TensorFlow'],
  },
  {
    label: 'Databases',
    icon: PiDatabase,
    items: ['PostgreSQL', 'SQL Server', 'MongoDB', 'MySQL', 'OpenSearch'],
  },
  {
    label: 'Cloud',
    icon: PiCloud,
    items: ['AWS', 'Azure'],
    note: 'AWS: Redshift, S3, Glue, EC2. Azure: Data Lake, Function, Container Apps.',
  },
  {
    label: 'Orchestration and data',
    icon: PiPackage,
    items: ['Docker', 'Github Actions', 'dbt', 'Airflow', 'Kafka', 'Spark'],
  },
];

const education = [
  {
    title: 'Master of Information Technology (Applied Computing)',
    org: 'University of Western Australia (UWA)',
    logo: uwaIcon,
    period: 'Feb 2025 - Dec 2026 (expected)',
    details: [
      'CGPA: 6.33 / 7.',
      'Specialised in applied computing with a focus on software engineering, distributed systems, and cloud computing.',
      'Built full-stack and data-driven applications through practical, project-based coursework.',
      'Applied machine learning and data analytics techniques to real-world software problems.',
    ],
  },
  {
    title: 'Bachelor of Electronics and Telecommunications Engineering',
    org: 'Hanoi University of Science and Technology',
    logo: hustIcon,
    period: 'Aug 2019 - Oct 2023',
    details: [
      'GPA: 3.72 / 4.0.',
      'Completed foundational and advanced coursework in electronics, programming, and telecommunications systems.',
      'Focused on software engineering, embedded systems, and database management throughout the degree.',
      'Developed graduation project on bee sound classification using deep learning, later published in Ecological Informatics (Elsevier, 2023).',
    ],
  },
];

const About = () => (
  <>
    <section id="about" className="section page">
      <div className="container">
        <div className="about-copy reveal">
          <h1 className="page-title">About Me</h1>
          <p className="page-intro">
            Software developer and AI enthusiast with hands-on experience
            building production systems in .NET and Python, spanning backend
            architecture, RESTful APIs, data pipelines, machine learning models,
            and cloud applications.
          </p>
          <p className="body-copy">
            I care about writing clean, maintainable code and designing systems
            that stay reliable as they grow, whether that means tightening
            performance, improving test coverage, or simplifying a tangled
            workflow. Recently I have been working on data engineering and
            automation, and I enjoy the full lifecycle: researching and
            prototyping an idea, shipping it through CI/CD, and monitoring it in
            the wild.
          </p>
        </div>

        <div className="stack reveal" id="tech-stack">
          <h2 className="section-title">Tech stack</h2>
          <div className="stack-grid">
            {techStacks.map(({ label, icon: Icon, items, note }) => (
              <div key={label} className="stack-group">
                <h3 className="stack-title">
                  <Icon aria-hidden="true" />
                  {label}
                </h3>
                <ul className="chip-list">
                  {items.map((item) => (
                    <li key={item} className="chip">
                      <TechIcon techName={item} className="chip-icon" />
                      {item}
                    </li>
                  ))}
                </ul>
                {note && <p className="stack-note">{note}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section id="education" className="section page">
      <div className="container reveal">
        <h2 className="page-title page-title-sm">Education</h2>
        <p className="page-intro">
          Academic background in engineering and information technology, with a
          focus on AI, software systems, and applied research.
        </p>
        <Timeline items={education} />
      </div>
    </section>
  </>
);

export default About;
