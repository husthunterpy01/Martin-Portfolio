import React from 'react';

const Navbar = () => {
  return React.createElement(
    'nav',
    { className: 'navbar' },
    React.createElement(
      'div',
      { className: 'logo' },
      'Martin'
    ),
    React.createElement(
      'ul',
      { className: 'nav-links' },
      React.createElement('li', null, React.createElement('a', { href: '#' }, 'Home')),
      React.createElement('li', null, React.createElement('a', { href: '#about' }, 'About')),
      React.createElement('li', null, React.createElement('a', { href: '#projects' }, 'Projects')),
      React.createElement('li', null, React.createElement('a', { href: '#contact' }, 'Contact'))
    )
  );
};

export default Navbar;