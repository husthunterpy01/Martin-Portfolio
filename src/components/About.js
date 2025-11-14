import React from 'react';

const About = () => {
  return React.createElement(
    'section',
    { id: 'about', className: 'about' },
    React.createElement('h2', null, 'About Me'),
    React.createElement(
      'p',
      null,
      "I'm a passionate web developer who loves building beautiful, fast, and user-friendly applications. I specialize in React, Node.js, and modern UI/UX."
    ),
    React.createElement(
      'div',
      { className: 'skills' },
      React.createElement('span', null, 'React'),
      React.createElement('span', null, 'JavaScript'),
      React.createElement('span', null, 'Tailwind'),
      React.createElement('span', null, 'Node.js'),
      React.createElement('span', null, 'MongoDB')
    )
  );
};

export default About;