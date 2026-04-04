import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { branches } from './sriLankaPath';

const ease = [0.16, 1, 0.3, 1];

const inquiryTypes = [
  'General Inquiry',
  'Sales',
  'Product Information',
  'Project Inquiry',
  'Service / Support',
  'Branch Contact',
];

export default function ContactForm() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    inquiryType: '',
    branch: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Log form data (no API)
    console.log('Contact form submission:', form);
    setSubmitted(true);
  };

  return (
    <section className="contact-form-section" id="contact-form" ref={ref}>
      <motion.div
        className="contact-form-header"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease }}
      >
        <p className="contact-form-kicker">Inquiry</p>
        <h2 className="contact-form-title">
          Send a <em>Message</em>
        </h2>
        <p className="contact-form-subtitle">
          Fill out the form below and our team will respond within 24 hours.
        </p>
      </motion.div>

      <div className="contact-form-container">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              className="contact-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease }}
            >
              {/* Row 1: Name + Company */}
              <motion.div
                className="contact-form-row"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease }}
              >
                <div className="contact-form-field">
                  <label className="contact-form-label" htmlFor="cf-name">Full Name</label>
                  <input
                    id="cf-name"
                    name="name"
                    type="text"
                    className="contact-form-input"
                    placeholder="John Perera"
                    required
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="contact-form-field">
                  <label className="contact-form-label" htmlFor="cf-company">
                    Company <span className="optional">(optional)</span>
                  </label>
                  <input
                    id="cf-company"
                    name="company"
                    type="text"
                    className="contact-form-input"
                    placeholder="Your company"
                    value={form.company}
                    onChange={handleChange}
                  />
                </div>
              </motion.div>

              {/* Row 2: Email + Phone */}
              <motion.div
                className="contact-form-row"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.18, ease }}
              >
                <div className="contact-form-field">
                  <label className="contact-form-label" htmlFor="cf-email">Email Address</label>
                  <input
                    id="cf-email"
                    name="email"
                    type="email"
                    className="contact-form-input"
                    placeholder="you@example.com"
                    required
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="contact-form-field">
                  <label className="contact-form-label" htmlFor="cf-phone">Phone Number</label>
                  <input
                    id="cf-phone"
                    name="phone"
                    type="tel"
                    className="contact-form-input"
                    placeholder="+94 7X XXX XXXX"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
              </motion.div>

              {/* Row 3: Inquiry Type + Branch */}
              <motion.div
                className="contact-form-row"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.26, ease }}
              >
                <div className="contact-form-field">
                  <label className="contact-form-label" htmlFor="cf-inquiry">Inquiry Type</label>
                  <select
                    id="cf-inquiry"
                    name="inquiryType"
                    className="contact-form-select"
                    value={form.inquiryType}
                    onChange={handleChange}
                  >
                    <option value="">Select type…</option>
                    {inquiryTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="contact-form-field">
                  <label className="contact-form-label" htmlFor="cf-branch">Preferred Branch</label>
                  <select
                    id="cf-branch"
                    name="branch"
                    className="contact-form-select"
                    value={form.branch}
                    onChange={handleChange}
                  >
                    <option value="">Select branch…</option>
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>
              </motion.div>

              {/* Row 4: Message */}
              <motion.div
                className="contact-form-field"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.34, ease }}
              >
                <label className="contact-form-label" htmlFor="cf-message">Message</label>
                <textarea
                  id="cf-message"
                  name="message"
                  className="contact-form-textarea"
                  placeholder="Tell us about your project or inquiry…"
                  value={form.message}
                  onChange={handleChange}
                />
              </motion.div>

              {/* Submit */}
              <motion.button
                type="submit"
                className="contact-form-submit"
                data-cursor="expand"
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.42, ease }}
              >
                Send Inquiry
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.button>

              <motion.p
                className="contact-form-note"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5, ease }}
              >
                Our team will get back to you within 24 hours.
              </motion.p>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              className="contact-form-success"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease }}
            >
              <div className="contact-form-success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3>Inquiry Sent</h3>
              <p>Thank you. Our team will reach out to you shortly.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
