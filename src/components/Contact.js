import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

// ──────── DEBUG CONFIG ────────
const {
  REACT_APP_EMAILJS_PUBLIC_KEY = 'MISSING_PUBLIC_KEY',
  REACT_APP_EMAILJS_SERVICE_ID = 'MISSING_SERVICE_ID',
  REACT_APP_EMAILJS_TEMPLATE_ID = 'MISSING_TEMPLATE_ID',
} = process.env;

console.log('EmailJS Config:', {
  service: REACT_APP_EMAILJS_SERVICE_ID,
  template: REACT_APP_EMAILJS_TEMPLATE_ID,
  publicKey: REACT_APP_EMAILJS_PUBLIC_KEY,
});

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
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

    const payload = {
      name: form.name,
      email: form.email,
      title: form.message,
    };
    console.log('Sending to EmailJS:', payload);

    try {
      const result = await emailjs.send(
        REACT_APP_EMAILJS_SERVICE_ID,
        REACT_APP_EMAILJS_TEMPLATE_ID,
        payload,
        REACT_APP_EMAILJS_PUBLIC_KEY
      );

      console.log('EmailJS SUCCESS:', result);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('EmailJS FAILED:', {
        message: err.message,
        text: err.text,
        status: err.status,
        details: err,
      });
      setStatus('error');
    } finally {
      setIsSending(false);
      // Auto-hide toast after 5 seconds
      setTimeout(() => setStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="contact">
      <h2>Get In Touch</h2>

      <form onSubmit={handleSubmit} noValidate>
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
          placeholder="Your Message (will be used as title)"
          rows="5"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn primary" disabled={isSending}>
          {isSending ? 'Sending…' : 'Send Message'}
        </button>
      </form>

      {/* ──────── TOP-RIGHT TOAST ──────── */}
      {status && (
        <div
          style={{
            position: 'fixed',
            top: '1rem',
            right: '1rem',
            minWidth: '300px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: '#fff',
            fontWeight: '600',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1000,
            animation: 'toastFade 5s forwards',
            backgroundColor: status === 'success' ? '#10b981' : '#ef4444',
          }}
        >
          {status === 'success'
            ? 'Your message has been sent successfully!'
            : 'Something went wrong. Please try again.'}
        </div>
      )}

      {/* ──────── TOAST ANIMATION (inline) ──────── */}
      <style jsx>{`
        @keyframes toastFade {
          0%   { opacity: 0; transform: translateY(-10px); }
          10%  { opacity: 1; transform: translateY(0); }
          85%  { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default Contact;