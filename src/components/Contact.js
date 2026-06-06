import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const {
  REACT_APP_EMAILJS_PUBLIC_KEY = '',
  REACT_APP_EMAILJS_SERVICE_ID = '',
  REACT_APP_EMAILJS_TEMPLATE_ID = '',
} = process.env;

const socialLinks = [
  {
    href: 'https://linkedin.com',
    label: 'LinkedIn',
    icon: FaLinkedin,
  },
  {
    href: 'https://github.com/husthunterpy01',
    label: 'GitHub',
    icon: FaGithub,
  },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setStatus(null);

    const payload = {
      name: form.name,
      email: form.email,
      title: form.message,
    };

    try {
      await emailjs.send(
        REACT_APP_EMAILJS_SERVICE_ID,
        REACT_APP_EMAILJS_TEMPLATE_ID,
        payload,
        REACT_APP_EMAILJS_PUBLIC_KEY
      );

      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('EmailJS failed:', err);
      setStatus('error');
    } finally {
      setIsSending(false);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="contact page-section">
      <div className="contact-layout">
        <div className="contact-info">
          <h2>Get In Touch</h2>
          <p className="page-intro">
            Have a question, opportunity, or project in mind? Send me a message
            and I&apos;ll get back to you as soon as I can.
          </p>

          <div className="social-links contact-social-links">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="social-link"
                aria-label={label}
              >
                <Icon className="social-icon" />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            value={form.message}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn primary" disabled={isSending}>
            {isSending ? 'Sending…' : 'Send Message'}
          </button>
        </form>
      </div>

      {status && (
        <div
          className={`contact-toast ${
            status === 'success' ? 'contact-toast-success' : 'contact-toast-error'
          }`}
          role="status"
        >
          {status === 'success'
            ? 'Your message has been sent successfully!'
            : 'Something went wrong. Please try again.'}
        </div>
      )}
    </section>
  );
};

export default Contact;
