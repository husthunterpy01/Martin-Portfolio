import React from 'react';

const Contact = () => {
  return React.createElement(
    'section',
    { id: 'contact', className: 'contact' },
    React.createElement('h2', null, 'Get In Touch'),
    React.createElement(
      'form',
      { onSubmit: e => e.preventDefault() },
      React.createElement('input', { type: 'text', placeholder: 'Your Name' }),
      React.createElement('input', { type: 'email', placeholder: 'Your Email' }),
      React.createElement('textarea', { placeholder: 'Your Message', rows: 5 }),
      React.createElement('button', { type: 'submit' }, 'Send Message')
    ),
    React.createElement(
      'div',
      { className: 'social-links' },
      React.createElement('a', { href: '#' }, 'LinkedIn'),
      React.createElement('a', { href: '#' }, 'GitHub'),
      React.createElement('a', { href: '#' }, 'Twitter')
    )
  );
};

export default Contact;