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
    name: '', company: '', email: '', phone: '',
    inquiryType: '', branch: '', message: '',
  });

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); console.log('Contact form:', form); setSubmitted(true); };

  return (
    <section className="cf-section" id="contact-form" ref={ref}>
      <div className="cf-container">
        {/* Left — Form */}
        <motion.div
          className="cf-left"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease }}
        >
          <p className="cf-kicker">Inquiry</p>
          <h2 className="cf-title">Send a <em>Message</em></h2>
          <p className="cf-subtitle">Fill out the form and our team will respond within 24 hours.</p>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                className="cf-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease }}
              >
                <div className="cf-row">
                  <div className="cf-field">
                    <label className="cf-label" htmlFor="cf-name">Full Name</label>
                    <input id="cf-name" name="name" type="text" className="cf-input" placeholder="John Perera" required value={form.name} onChange={handleChange} />
                  </div>
                  <div className="cf-field">
                    <label className="cf-label" htmlFor="cf-company">Company <span className="cf-opt">(optional)</span></label>
                    <input id="cf-company" name="company" type="text" className="cf-input" placeholder="Your company" value={form.company} onChange={handleChange} />
                  </div>
                </div>

                <div className="cf-row">
                  <div className="cf-field">
                    <label className="cf-label" htmlFor="cf-email">Email Address</label>
                    <input id="cf-email" name="email" type="email" className="cf-input" placeholder="you@example.com" required value={form.email} onChange={handleChange} />
                  </div>
                  <div className="cf-field">
                    <label className="cf-label" htmlFor="cf-phone">Phone Number</label>
                    <input id="cf-phone" name="phone" type="tel" className="cf-input" placeholder="+94 7X XXX XXXX" value={form.phone} onChange={handleChange} />
                  </div>
                </div>

                <div className="cf-row">
                  <div className="cf-field">
                    <label className="cf-label" htmlFor="cf-inquiry">Inquiry Type</label>
                    <select id="cf-inquiry" name="inquiryType" className="cf-select" value={form.inquiryType} onChange={handleChange}>
                      <option value="">Select type…</option>
                      {inquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="cf-field">
                    <label className="cf-label" htmlFor="cf-branch">Preferred Branch</label>
                    <select id="cf-branch" name="branch" className="cf-select" value={form.branch} onChange={handleChange}>
                      <option value="">Select branch…</option>
                      {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="cf-field">
                  <label className="cf-label" htmlFor="cf-message">Message</label>
                  <textarea id="cf-message" name="message" className="cf-textarea" placeholder="Tell us about your project or inquiry…" value={form.message} onChange={handleChange} />
                </div>

                <button type="submit" className="cf-submit" data-cursor="expand">
                  Send Inquiry
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                className="cf-success"
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease }}
              >
                <div className="cf-success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3>Inquiry Sent</h3>
                <p>Thank you. Our team will reach out to you shortly.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right — HQ Info + Hours */}
        <motion.div
          className="cf-right"
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease }}
        >
          <div className="cf-info-card">
            <div className="cf-info-badge">HEAD OFFICE</div>
            <h3 className="cf-info-title">Peliyagoda</h3>

            <div className="cf-info-group">
              <div className="cf-info-label">Address</div>
              <div className="cf-info-value">No. 42, Industrial Zone,<br/>Peliyagoda, Colombo,<br/>Sri Lanka</div>
            </div>

            <div className="cf-info-group">
              <div className="cf-info-label">Hotline</div>
              <div className="cf-info-value"><a href="tel:+94112345678">+94 11 234 5678</a></div>
            </div>

            <div className="cf-info-group">
              <div className="cf-info-label">Email</div>
              <div className="cf-info-value"><a href="mailto:info@elcardoindustries.lk">info@elcardoindustries.lk</a></div>
            </div>

            <div className="cf-info-group">
              <div className="cf-info-label">Business Hours</div>
              <div className="cf-info-value cf-hours">
                Mon – Fri: 8:30 AM – 5:30 PM<br/>
                Saturday: 8:30 AM – 1:00 PM<br/>
                Sunday: Closed
              </div>
            </div>

            <div className="cf-info-divider" />

            <div className="cf-info-group">
              <div className="cf-info-label">Direct Lines</div>
              <div className="cf-info-phones">
                <div className="cf-info-phone">
                  <span>Sales Inquiries</span>
                  <a href="tel:+94112345679">+94 11 234 5679</a>
                </div>
                <div className="cf-info-phone">
                  <span>Service & Repairs</span>
                  <a href="tel:+94112345680">+94 11 234 5680</a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
