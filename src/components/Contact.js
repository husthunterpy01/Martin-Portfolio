import { triggerCat } from './PixelCat';
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { PiGithubLogo, PiLinkedinLogo, PiEnvelopeSimple } from 'react-icons/pi';

const {
  REACT_APP_EMAILJS_PUBLIC_KEY = '',
  REACT_APP_EMAILJS_SERVICE_ID = '',
  REACT_APP_EMAILJS_TEMPLATE_ID = '',
} = process.env;

const socialLinks = [
  {
    href: 'mailto:martindang2801@gmail.com',
    label: 'martindang2801@gmail.com',
    icon: PiEnvelopeSimple,
  },
  {
    href: 'https://linkedin.com/in/martin-dang-a19420251',
    label: 'LinkedIn',
    icon: PiLinkedinLogo,
  },
  {
    href: 'https://github.com/husthunterpy01',
    label: 'GitHub',
    icon: PiGithubLogo,
  },
];

const EMPTY_FORM = { name: '', email: '', message: '' };

const Contact = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = 'Please enter a valid email address.';
    }
    if (!form.message.trim()) next.message = 'Please write a message.';
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

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
      triggerCat();
      setForm(EMPTY_FORM);
    } catch (err) {
      console.error('EmailJS failed:', err);
      setStatus('error');
    } finally {
      setIsSending(false);
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="section page">
      <div className="container contact-layout">
        <div className="contact-info reveal">
          <h1 className="page-title">Get In Touch</h1>
          <p className="page-intro">
            Have a question, opportunity, or project in mind? Send me a message
            and I&apos;ll get back to you as soon as I can.
          </p>

          <ul className="contact-links">
            {socialLinks.map(({ href, label, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="contact-link"
                >
                  <Icon aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <form className="contact-form reveal" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              type="text"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
              required
            />
            {errors.name && (
              <p className="field-error" id="contact-name-error">
                {errors.name}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
              required
            />
            {errors.email && (
              <p className="field-error" id="contact-email-error">
                {errors.email}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows="6"
              value={form.message}
              onChange={handleChange}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
              required
            />
            {errors.message && (
              <p className="field-error" id="contact-message-error">
                {errors.message}
              </p>
            )}
          </div>

          <button type="submit" className="btn primary" disabled={isSending}>
            {isSending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>

      {status && (
        <div
          className={`toast ${status === 'success' ? 'toast-success' : 'toast-error'}`}
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
