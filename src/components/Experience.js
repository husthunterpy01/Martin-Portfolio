import React, { useState } from 'react';
import { FaBuilding, FaBriefcase, FaChevronDown, FaRegCalendarAlt } from 'react-icons/fa';
import fptIcon from '../image/company_icon/fpt.png';
import viettelIcon from '../image/company_icon/viettel.png';
import filIcon from '../image/company_icon/fil.png';
import fsdsIcon from '../image/company_icon/fsds.png';
import shootingStarIcon from '../image/company_icon/shooting_stars.png';
import ddecImg from '../image/company_icon/DDEC.png';

const experiences = [
  {
    role: 'Sharepoint System and Automation Engineer Intern',
    company: 'Shooting Stars',
    companyIcon: shootingStarIcon,
    location: 'Perth, Australia',
    period: 'July 2026 – Now',
    details: ['Coming soon'],
  },
  {
    role: 'Machine Learning Engineer Intern',
    company: 'Full Stack Data Science',
    companyIcon: fsdsIcon,
    location: 'Remote',
    period: 'Nov 2025 – March 2026',
    details: [
      'Researched and evaluated high-quality Data & AI content sources and designed the scraping strategy; implemented Selenium crawlers for multiple sources with de-duplication and structured data output.',
      'Built and deployed an end-to-end data pipeline on Azure Cloud with CI/CD, automating the ingestion, cleaning and enrichment of scraped posts, and adding monitoring to keep track of job health.',
      'Integrated the FastAPI backend pipeline with the internal knowledge-sharing platform to auto-publish curated “hot news” posts, and developed dashboards that track trending topics, key authors and domains, helping the team quickly discover and discuss the latest Data & AI developments.',
    ],
  },
  {
    role: 'Software Developer',
    company: 'FPT Software',
    companyIcon: fptIcon,
    location: 'Hanoi, Vietnam',
    period: 'Jan 2024 – Feb 2025',
    details: [
      'Developed high-performance RESTful APIs with ASP.NET for a US-based pension payroll platform using Clean Architecture and CQRS, supporting ~500 concurrent users.',
      'Raised automated test coverage from 42% to over 80% using xUnit and CI-friendly test suites.',
      'Built a Korean WPF application to remotely control software deployment on ~200 machines via RDP and PowerShell automation.',
      'Visualised device metrics from OpenSearch logs with multi-line charts in a WPF Lepoco UI dashboard.',
    ],
  },
  {
    role: 'Undergraduate Student Researcher (Part-time)',
    company: 'Future Internet Lab – Hanoi University of Science and Technology',
    companyIcon: filIcon,
    location: 'Hanoi, Vietnam',
    period: 'Oct 2021 – Nov 2023',
    details: [
      'Processed ICS / water factory datasets (SCADA, WADI) and experimented with Graph Neural Networks for anomaly detection.',
      'Diagnosed and improved a Vietnamese company’s anomaly prediction in an IMS system using K-means clustering and PCA.',
      'Researched beehive audio classification with a CNN-GRU hybrid model, improving accuracy by ~1% for bee sound identification.',
    ],
  },
  {
    role: 'Core Network Engineer Intern',
    company: 'Viettel Cyber Security',
    companyIcon: viettelIcon,
    location: 'Hanoi, Vietnam',
    period: 'Jul 2022 – Dec 2022',
    details: [
      'Worked on telecommunication security in CoreNetwork field, focusing on IMS architecture.',
      'Simulated phone call conversations using Zoiper and call flow analysis with Wireshark.',
      'Deployed CoreNetwork topology systems with simple components using Docker and Java.',
    ],
  },
];

const volunteers = [
  {
    role: 'Volunteer Software Engineer',
    company: 'Darling Downs Environmental Council',
    companyIcon: ddecImg,
    location: 'Queensland (remote)',
    period: 'May 2026 – Now',
    details: [
      'Design the users UI using Figma',
      "Implement volunteer's notification page and list users using ReactJS and SpringBoot",
    ],
  },
];

function Timeline({ items, activeIndex, onToggle }) {
  return (
    <div className="timeline interactive-timeline">
      {items.map((exp, idx) => {
        const isActive = idx === activeIndex;
        return (
          <div key={`${exp.company}-${exp.period}`} className="timeline-item interactive-item">
            <div className={`timeline-dot ${isActive ? 'active-dot' : ''}`} />

            <button
              className={`timeline-header ${isActive ? 'active' : ''}`}
              onClick={() => onToggle(idx)}
              type="button"
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
                    <span className="timeline-location">{exp.location}</span>
                    <span className="timeline-period">
                      <FaRegCalendarAlt className="timeline-period-icon" aria-hidden="true" />
                      {exp.period}
                    </span>
                  </p>
                </div>
              </div>
              <FaChevronDown className={`chevron ${isActive ? 'chevron-open' : ''}`} />
            </button>

            <div className={`timeline-details-wrapper ${isActive ? 'open' : ''}`}>
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
  );
}

const Experience = () => {
  const [workActiveIndex, setWorkActiveIndex] = useState(-1);
  const [volunteerActiveIndex, setVolunteerActiveIndex] = useState(-1);

  const toggleWork = (index) => {
    setWorkActiveIndex((prev) => (prev === index ? -1 : index));
  };

  const toggleVolunteer = (index) => {
    setVolunteerActiveIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <>
      <section id="experience" className="page-section">
        <h2>Work Experience</h2>
        <p className="page-intro">
          Professional roles across software engineering, machine learning, and
          backend development.
        </p>
        <Timeline
          items={experiences}
          activeIndex={workActiveIndex}
          onToggle={toggleWork}
        />
      </section>

      <section id="volunteer" className="volunteer page-section">
        <h2>Volunteer</h2>
        <p className="page-intro">
          Contributing my software engineering skills to organizations and causes
          that create positive impact in the community.
        </p>
        <Timeline
          items={volunteers}
          activeIndex={volunteerActiveIndex}
          onToggle={toggleVolunteer}
        />
      </section>
    </>
  );
};

export default Experience;
