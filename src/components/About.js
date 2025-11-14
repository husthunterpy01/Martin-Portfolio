import React from 'react';

const techStacks = [
  {
    label: 'Programming Languages',
    icon: '💻',
    items: ['C#', 'Python', 'Java', 'JavaScript'],
  },
  {
    label: 'Web & Application Development',
    icon: '🌐',
    items: ['ASP.NET (6/8, WPF, WinForms)', 'FastAPI', 'Flask', 'ReactJS'],
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
    items: ['Azure (DevOps, SQL, Functions)', 'AWS (EC2, Redshift, S3, Glue, Athena)'],
  },
  {
    label: 'Data & Orchestration',
    icon: '📦',
    items: ['Docker', 'Spark', 'Kafka'],
  },
];

const About = () => {
  return (
    <section id="about" className="about">
      <h2>About Me</h2>
      <p>
        I&apos;m a software developer and AI enthusiast with experience building
        production systems in .NET and Python. I enjoy designing clean backend
        architectures, training machine learning models, and turning ideas into
        robust, scalable applications.
      </p>
      <p>
        Recently I&apos;ve been focusing on machine learning infrastructure,
        data-driven features, and backend services that support real products.
      </p>

      <div className="stack-grid">
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
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
