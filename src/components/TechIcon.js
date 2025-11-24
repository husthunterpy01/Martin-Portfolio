import React from 'react';
import {
  // Programming Languages
  SiPython,
  SiJavascript,
  // Web & Application
  SiDotnet,
  SiFastapi,
  SiFlask,
  SiReact,
  // AI & Machine Learning
  SiPytorch,
  SiTensorflow,
  // Databases & Search
  SiMysql,
  SiMongodb,
  // Data & Orchestration
  SiDocker,
  SiApachespark,
  SiApachekafka,
} from 'react-icons/si';

// Custom C# icon SVG
const CSharpIcon = ({ className }) => (
  <svg 
    className={className}
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.568 16.234c-.23.384-.576.576-1.038.576-.23 0-.46-.058-.69-.173l-1.15.69c.23.115.46.23.69.345.576.23 1.15.345 1.726.345 1.15 0 2.074-.576 2.768-1.726.23-.345.345-.806.345-1.382 0-.576-.115-1.037-.345-1.382-.23-.345-.576-.576-1.038-.806l-1.15.69c.23.23.345.576.345 1.038 0 .23-.058.46-.173.69zm-2.768-2.768c-.23.23-.576.345-1.038.345-.23 0-.46-.058-.69-.173l-1.15.69c.23.115.46.23.69.345.576.23 1.15.345 1.726.345 1.15 0 2.074-.576 2.768-1.726.23-.345.345-.806.345-1.382 0-.576-.115-1.037-.345-1.382-.23-.345-.576-.576-1.038-.806l-1.15.69c.23.23.345.576.345 1.038 0 .23-.058.46-.173.69zm-2.768-2.768c-.23.23-.576.345-1.038.345-.23 0-.46-.058-.69-.173l-1.15.69c.23.115.46.23.69.345.576.23 1.15.345 1.726.345 1.15 0 2.074-.576 2.768-1.726.23-.345.345-.806.345-1.382 0-.576-.115-1.037-.345-1.382-.23-.345-.576-.576-1.038-.806l-1.15.69c.23.23.345.576.345 1.038 0 .23-.058.46-.173.69z"/>
  </svg>
);

// Custom Java icon SVG (simplified Java logo)
const JavaIcon = ({ className }) => (
  <svg 
    className={className}
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8.851 18.56s-.82.536.933.786c2.097.286 3.743.286 6.323 0 1.354-.107 1.146-.536 1.146-.536l-1.287-.857s.214.643-1.287.857c-2.097.357-4.812.357-6.323 0-1.287-.214-1.287-.643-1.287-.643l1.787.5zm-.643-1.214s-1.146 1.073.5 1.43c1.787.286 4.812.357 7.106 0 1.43-.214 1.073-.643.643-.857l-1.073-.643s.357.357-1.073.643c-2.097.5-5.123.357-6.823 0-1.287-.286-.93-.857-.93-.857l1.25.286zm11.425-5.123s.643-1.43-.643-2.097c-1.43-.643-3.037-.5-3.037-.5s.357-.5 1.43-.357c.857.107 1.787.357 2.554.857 1.43.857 1.787 2.097 1.787 2.097l-2.097-.857zm-13.39.214s-1.43 1.287.5 2.097c1.787.643 5.123.857 7.106.5 1.787-.286 1.43-.857 1.073-1.073l-1.073-.5s.357.357-1.073.643c-2.097.5-5.123.357-6.823 0-1.287-.286-1.43-1.073-1.43-1.073l2.554.5zm12.39-2.554s1.073-1.43-1.073-2.554c-2.097-1.073-5.123-.5-5.123-.5s.643-.643 1.787-.214c.857.286 1.787.857 2.554 1.43 1.43 1.073 1.787 2.097 1.787 2.097l-1.932-.357zm-10.246.214c-1.43-.857-2.554-.5-2.554-.5s.214.357 1.43.857c1.073.5 2.554.857 4.18.857 1.787 0 3.037-.357 3.037-.357s-.214.214-1.43.5c-1.787.357-3.743.357-5.123 0-1.287-.286-2.097-.857-2.097-.857l3.488.214zm12.39 3.037s.857.643-.5 1.43c-1.43.857-4.812 1.073-6.823.857-1.787-.214-1.43-.643-1.073-.857l.857-.5s-.214.357 1.073.5c2.097.286 5.123.214 6.823-.214 1.287-.286.93-.857.93-.857l-1.25.643zm-13.39.5s-1.43 1.287.5 2.097c1.787.643 5.123.857 7.106.5 1.787-.286 1.43-.857 1.073-1.073l-1.073-.5s.357.357-1.073.643c-2.097.5-5.123.357-6.823 0-1.287-.286-1.43-1.073-1.43-1.073l2.554.5z"/>
  </svg>
);

// Fallback icon component for technologies without specific icons
const DefaultIcon = ({ className }) => (
  <svg 
    className={className}
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
  </svg>
);

// Scikit-learn icon (using a generic ML icon)
const ScikitLearnIcon = ({ className }) => (
  <svg 
    className={className}
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
);

// OpenSearch icon (using a search icon)
const OpenSearchIcon = ({ className }) => (
  <svg 
    className={className}
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

// Custom SQL Server icon SVG (database cylinder)
const SqlServerIcon = ({ className }) => (
  <svg 
    className={className}
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="12" cy="5" rx="8" ry="3"/>
    <path d="M4 8v8c0 1.1 3.6 2 8 2s8-.9 8-2V8"/>
    <ellipse cx="12" cy="19" rx="8" ry="3"/>
    <path d="M4 5v14M20 5v14"/>
  </svg>
);

// Custom Azure icon SVG (cloud shape)
const AzureIcon = ({ className }) => (
  <svg 
    className={className}
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.36 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.64-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
  </svg>
);

// Custom AWS icon SVG (arrow/arc shape representing AWS logo)
const AwsIcon = ({ className }) => (
  <svg 
    className={className}
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l8 4v7.64l-8 4-8-4V8.18l8-4z"/>
    <path d="M12 8l-4 2v4l4 2 4-2v-4l-4-2zm0 1.36l2.5 1.25v2.78L12 14.64l-2.5-1.25v-2.78L12 9.36z"/>
  </svg>
);

const techIconMap = {
  // Programming Languages
  'C#': CSharpIcon,
  'Python': SiPython,
  'Java': JavaIcon,
  'JavaScript': SiJavascript,
  // Web & Application
  'ASP.NET': SiDotnet,
  'FastAPI': SiFastapi,
  'Flask': SiFlask,
  'ReactJS': SiReact,
  'React': SiReact,
  // AI & Machine Learning
  'PyTorch': SiPytorch,
  'Scikit-learn': ScikitLearnIcon,
  'TensorFlow': SiTensorflow,
  // Databases & Search
  'SQL Server': SqlServerIcon,
  'MySQL': SiMysql,
  'MongoDB': SiMongodb,
  'OpenSearch': OpenSearchIcon,
  // Cloud Platforms
  'Azure': AzureIcon,
  'AWS': AwsIcon,
  // Data & Orchestration
  'Docker': SiDocker,
  'Spark': SiApachespark,
  'Kafka': SiApachekafka,
};

const TechIcon = ({ techName, className = '' }) => {
  const IconComponent = techIconMap[techName];
  
  if (!IconComponent) {
    // Fallback for technologies without icons
    return <DefaultIcon className={className} aria-label={`${techName} icon`} />;
  }

  return (
    <IconComponent 
      className={className}
      aria-label={`${techName} icon`}
    />
  );
};

export default TechIcon;
