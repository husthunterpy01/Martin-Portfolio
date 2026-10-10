import React from 'react';
import Timeline from './Timeline';
import fptIcon from '../image/company_icon/fpt.png';
import viettelIcon from '../image/company_icon/viettel.png';
import filIcon from '../image/company_icon/fil.png';
import fsdsIcon from '../image/company_icon/fsds.png';
import shootingStarIcon from '../image/company_icon/shooting_stars.png';
import ddecImg from '../image/company_icon/DDEC.png';

export const experiences = [
  {
    title: 'Automation Developer',
    org: 'Shooting Stars',
    logo: shootingStarIcon,
    location: 'Perth, Australia',
    period: 'July 2026 - Present',
    details: [
      'Developed Power Automate workflows to track certificate expiry dates, auto-generating monthly compliance reports and staged reminders, reducing manual follow-up by 80%.',
      'Optimised SharePoint data retrieval logic across 15 views and designed the front end for a new hub, reducing profile load times and improving the user experience.',
    ],
  },
  {
    title: 'Data Engineer Intern',
    org: 'Full Stack Data Science',
    logo: fsdsIcon,
    location: 'Remote',
    period: 'Nov 2025 - Mar 2026',
    details: [
      'Engineered LinkedIn scrapers using Selenium automation to sanitise technical trending posts and store curated data in Azure Data Lake.',
      'Integrated GPT-4 auto-summarisation and hashtag generation into the publishing pipeline for a platform of over 700 users.',
      'Modelled LinkedIn user relationships as a graph with NetworkX to identify high-engagement personas and prioritise the next scraping batch by network centrality.',
      'Built and deployed an end-to-end data pipeline on Azure with CI/CD, adding monitoring to keep track of job health, and integrated the FastAPI backend with the internal knowledge-sharing platform to auto-publish curated posts.',
    ],
  },
  {
    title: 'Software Developer',
    org: 'FPT Software',
    logo: fptIcon,
    location: 'Hanoi, Vietnam',
    period: 'Jan 2024 - Feb 2025',
    details: [
      'Engineered high-performance RESTful APIs in ASP.NET Core using Clean Architecture and CQRS for a US-based pension payroll platform, supporting 500+ concurrent users.',
      'Raised unit test coverage from 42% to above 80% with XUnit, improving regression reliability and minimising production defects.',
      'Developed a WPF desktop application for a Korean client to centralise remote software deployment across 200 machines simultaneously, using the RDP protocol and PowerShell automation to replace machine-by-machine deployment.',
      'Built real-time device health monitoring in WPF from OpenSearch logs, enabling the ops team to detect and respond to deployment anomalies.',
    ],
  },
  {
    title: 'Undergraduate Student Researcher (Part-time)',
    org: 'Future Internet Lab, Hanoi University of Science and Technology',
    logo: filIcon,
    location: 'Hanoi, Vietnam',
    period: 'Oct 2021 - Nov 2023',
    details: [
      'Processed ICS / water factory datasets (SCADA, WADI) and experimented with Graph Neural Networks for anomaly detection.',
      'Diagnosed and improved a Vietnamese company’s anomaly prediction in an IMS system using K-means clustering and PCA.',
      'Researched beehive audio classification with a CNN-GRU hybrid model, improving accuracy by ~1% for bee sound identification.',
    ],
  },
  {
    title: 'Core Network Engineer Intern',
    org: 'Viettel Cyber Security',
    logo: viettelIcon,
    location: 'Hanoi, Vietnam',
    period: 'Jul 2022 - Dec 2022',
    details: [
      'Worked on telecommunication security in the core network field, focusing on IMS architecture.',
      'Simulated phone call conversations using Zoiper and analysed call flows with Wireshark.',
      'Deployed core network topology systems with simple components using Docker and Java.',
    ],
  },
];

export const volunteers = [
  {
    title: 'Volunteer Software Engineer',
    org: 'Darling Downs Environmental Council',
    logo: ddecImg,
    location: 'Queensland (remote)',
    period: 'May 2026 - Present',
    details: [
      'Design the users UI using Figma.',
      "Implement the volunteer notification page and user list using ReactJS and Spring Boot.",
    ],
  },
];

const Experience = () => (
  <>
    <section id="experience" className="section page">
      <div className="container reveal">
        <h1 className="page-title">Work Experience</h1>
        <p className="page-intro">
          Professional roles across software engineering, data engineering, and
          automation.
        </p>
        <Timeline items={experiences} defaultOpen={0} />
      </div>
    </section>

    <section id="volunteer" className="section page">
      <div className="container reveal">
        <h2 className="page-title page-title-sm">Volunteer</h2>
        <p className="page-intro">
          Contributing my software engineering skills to organizations and
          causes that create positive impact in the community.
        </p>
        <Timeline items={volunteers} />
      </div>
    </section>
  </>
);

export default Experience;
