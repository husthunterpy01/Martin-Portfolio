import React, { useState } from "react";
import { FaBuilding, FaBriefcase, FaChevronDown } from "react-icons/fa";
import fptIcon from '../image/company_icon/fpt.png';
import viettelIcon from '../image/company_icon/viettel.png';
import filIcon from '../image/company_icon/fil.png';
import fsdIcon from '../image/company_icon/fsds.png';

const experiences = [
  {
    role: "Machine Learning Engineer Intern",
    company: "Full Stack Data Science",
    companyIcon: fsdIcon,
    location: "Perth, Australia (Remote)",
    period: "Nov 2025 – Now",
    details: [
      "Researched and evaluated high-quality Data & AI content sources and designed the scraping strategy; implemented Selenium crawlers for multiple sources with de-duplication and structured data output.",
      "Built and deployed an end-to-end data pipeline on Azure Cloud with CI/CD, automating the ingestion, cleaning and enrichment of scraped posts, and adding monitoring to keep track of job health.",
      "Integrated the FastAPI backend pipeline with the internal knowledge-sharing platform to auto-publish curated “hot news” posts, and developed dashboards that track trending topics, key authors and domains, helping the team quickly discover and discuss the latest Data & AI developments."
  ]
  },
  {
    role: "Software Developer",
    company: "FPT Software",
    companyIcon: fptIcon,
    location: "Hanoi, Vietnam",
    period: "Jan 2024 – Jan 2025",
    details: [
      "Developed high-performance RESTful APIs with ASP.NET for a US-based pension payroll platform using Clean Architecture and CQRS, supporting ~500 concurrent users.",
      "Raised automated test coverage from 42% to over 80% using xUnit and CI-friendly test suites.",
      "Built a Korean WPF application to remotely control software deployment on ~200 machines via RDP and PowerShell automation.",
      "Visualised device metrics from OpenSearch logs with multi-line charts in a WPF Lepoco UI dashboard."
    ]
  },
  {
    role: "Undergraduate Student Researcher (Part-time)",
    company: "Future Internet Lab – Hanoi University of Science and Technology",
    companyIcon: filIcon,
    location: "Hanoi, Vietnam",
    period: "Oct 2021 – Nov 2023",
    details: [
      "Processed ICS / water factory datasets (SCADA, WADI) and experimented with Graph Neural Networks for anomaly detection.",
      "Diagnosed and improved a Vietnamese company’s anomaly prediction in an IMS system using K-means clustering and PCA.",
      "Researched beehive audio classification with a CNN-GRU hybrid model, improving accuracy by ~1% for bee sound identification."
    ]
  },
  {
    role: "Core Network Engineer Intern",
    company: "Viettel Cyber Security",
    companyIcon: viettelIcon,
    location: "Hanoi, Vietnam",
    period: "Jul 2022 – Dec 2022",
    details: [
      "Worked on telecommunication security in CoreNetwork field, focusing on IMS architecture.",
      "Simulated phone call conversations using Zoiper and call flow analysis with Wireshark.",
      "Deployed CoreNetwork topology systems with simple components using Docker and Java."
    ]
  }
];

const Experience = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggle = (index) => {
    setActiveIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section id="experience">
      <h2>Work Experience</h2>

      <div className="timeline interactive-timeline">
        {experiences.map((exp, idx) => {
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

export default Experience;
