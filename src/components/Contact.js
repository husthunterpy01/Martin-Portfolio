import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [isSending, setIsSending] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSending(true);
    setStatus(null);

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID',   // <- replace
        'YOUR_TEMPLATE_ID',  // <- replace
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        'YOUR_PUBLIC_KEY'    // <- replace
      );

      setIsSending(false);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });

      // hide notification after 5s
      setTimeout(() => setStatus(null), 5000);
    } catch (err) {
      console.error(err);
      setIsSending(false);
      setStatus('error');
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="contact">
      <h2>Get In Touch</h2>

      <form onSubmit={handleSubmit}>
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
          rows="5"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn primary" disabled={isSending}>
          {isSending ? 'Sending…' : 'Send Message'}
        </button>
      </form>

      <div className="social-links">
        <a href="https://linkedin.com" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href="https://github.com/husthunterpy01" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">
          Twitter
        </a>
      </div>

      {/* 5-second notification */}
      {status && (
        <div className={`toast ${status === 'success' ? 'toast-success' : 'toast-error'}`}>
          {status === 'success'
            ? '✅ Your message has been sent successfully!'
            : '❌ Something went wrong. Please try again.'}
        </div>
      )}
    </section>
  );
};

export default Contact;
