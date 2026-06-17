import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Mail, MessageSquare, ShieldAlert, Check } from 'lucide-react';

const GithubIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export function ContactPage({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatusMessage('INITIALIZING SECURE LINK...');

    const name = formData.name;
    const emailInput = formData.email;
    const subject = formData.subject;
    const message = formData.message;

    // Load configs from import.meta.env
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;
    const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    let telegramSent = false;
    let emailSent = false;

    // 1. Send Telegram Message
    if (botToken && chatId && botToken.trim() !== '' && chatId.trim() !== '') {
      setStatusMessage('TRANSMITTING TO TELEGRAM CLIENT...');
      try {
        const text = `📨 *New Portfolio Message*:\n\n*Name:* ${name}\n*Email:* ${emailInput}\n*Subject:* ${subject}\n\n*Message:* ${message}`;
        const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: 'Markdown'
          })
        });
        if (res.ok) {
          telegramSent = true;
        } else {
          console.error('Telegram bot response not OK:', await res.text());
        }
      } catch (err) {
        console.error('Telegram transmission failed:', err);
      }
    }

    // 2. Send Email via Web3Forms (Silent submission)
    if (web3Key && web3Key.trim() !== '') {
      setStatusMessage('DISPATCHING SECURE EMAIL...');
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            access_key: web3Key,
            name: name,
            email: emailInput,
            subject: `Portfolio Contact: ${subject}`,
            message: message
          })
        });
        if (res.ok) {
          emailSent = true;
        } else {
          console.error('Web3Forms response not OK:', await res.text());
        }
      } catch (err) {
        console.error('Email transmission failed:', err);
      }
    }

    // 3. Fallback to Mailto client if Web3Forms is not configured
    if (!web3Key || web3Key.trim() === '') {
      setStatusMessage('FALLING BACK TO LOCAL MAIL CLIENT...');
      const mailtoEmail = 'aumdpandya310306@gmail.com';
      const mailtoSubject = encodeURIComponent(subject);
      const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${emailInput}\n\nMessage:\n${message}`);
      
      // Open mailto link
      window.location.href = `mailto:${mailtoEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;
      emailSent = true; 
    }

    setSending(false);
    
    // We treat either Telegram success or mailto/Web3Forms success as overall success
    if (telegramSent || emailSent) {
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } else {
      alert('Transmission failed. Please check your Bot Token / Web3Forms configuration in .env');
    }
  };

  const cardTransition = { type: 'spring', stiffness: 60, damping: 15 };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={cardTransition}
      className="w-full max-w-2xl mx-auto bg-oatmeal text-charcoal p-8 border-2 border-charcoal relative z-10"
      style={{ boxShadow: '6px 6px 0px 0px #1E1E1E' }}
    >
      {/* Tape Effect */}
      <div className="absolute -top-2.5 left-10 w-16 h-5 bg-[#D5D2C8]/75 border border-charcoal/10 -rotate-3 z-10 shadow-sm" />
      <div className="absolute -top-2.5 right-10 w-16 h-5 bg-terracotta/40 border border-charcoal/10 rotate-3 z-10 shadow-sm" />

      {/* Header */}
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-charcoal/10">
        <button 
          onClick={onClose}
          className="flex items-center gap-2 font-mono text-xs font-bold px-3 py-1.5 border-2 border-charcoal bg-[#F4F1EA] hover:bg-charcoal hover:text-oatmeal cursor-pointer transition-all duration-200"
          style={{ boxShadow: '2px 2px 0px 0px #1E1E1E' }}
        >
          <ArrowLeft className="w-4 h-4" /> BACK TO PORTFOLIO
        </button>
        <span className="font-mono text-xs text-charcoal/60 uppercase">System / Contact</span>
      </div>

      <AnimatePresence mode="wait">
        {!success ? (
          <motion.div
            key="contact-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-6 text-left">
              <h2 className="font-serif text-4xl font-extrabold mb-2 text-charcoal">SEND MESSAGE </h2>
              <p className="font-sans text-sm text-charcoal/70">
                Establish a direct link. Drop a message below, and it will be routed directly to my workspace.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-mono text-xs font-bold uppercase tracking-wider text-charcoal/80">
                    01  YOUR NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    disabled={sending}
                    className="border-2 border-charcoal bg-oatmeal text-charcoal focus:outline-none focus:border-terracotta p-3 rounded-none font-mono text-sm shadow-[2px_2px_0px_0px_#1E1E1E]"
                  />
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-mono text-xs font-bold uppercase tracking-wider text-charcoal/80">
                    02 EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. john@example.com"
                    disabled={sending}
                    className="border-2 border-charcoal bg-oatmeal text-charcoal focus:outline-none focus:border-terracotta p-3 rounded-none font-mono text-sm shadow-[2px_2px_0px_0px_#1E1E1E]"
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="font-mono text-xs font-bold uppercase tracking-wider text-charcoal/80">
                  03  SUBJECT LINE
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Project Consultation"
                  disabled={sending}
                  className="border-2 border-charcoal bg-oatmeal text-charcoal focus:outline-none focus:border-terracotta p-3 rounded-none font-mono text-sm shadow-[2px_2px_0px_0px_#1E1E1E]"
                />
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-mono text-xs font-bold uppercase tracking-wider text-charcoal/80">
                  04  YOUR MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your thoughts here..."
                  disabled={sending}
                  className="border-2 border-charcoal bg-oatmeal text-charcoal focus:outline-none focus:border-terracotta p-3 rounded-none font-mono text-sm shadow-[2px_2px_0px_0px_#1E1E1E] resize-none"
                />
              </div>

              {/* Status Message Indicator */}
              {statusMessage && (
                <div className="font-mono text-xs font-bold text-terracotta animate-pulse bg-charcoal/5 p-3 border border-charcoal/10 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4" /> {statusMessage}
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-terracotta text-oatmeal font-mono font-bold text-sm border-2 border-charcoal hover:bg-charcoal hover:text-oatmeal cursor-pointer hover:shadow-[4px_4px_0px_0px_#1E1E1E] hover:-translate-x-[2px] hover:-translate-y-[2px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ boxShadow: '2px 2px 0px 0px #1E1E1E' }}
                >
                  <Send className="w-4 h-4" /> {sending ? 'TRANSMITTING...' : 'INITIALIZE_TRANSMISSION '}
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success-message"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12 flex flex-col items-center justify-center"
          >
            <div className="w-16 h-16 rounded-full bg-terracotta border-2 border-charcoal flex items-center justify-center text-oatmeal font-bold text-2xl mb-6 shadow-[2px_2px_0px_0px_#1E1E1E]">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-3xl font-bold mb-4">TRANSMISSION_SUCCESSFUL </h3>
            <p className="font-sans text-sm text-charcoal/80 max-w-md mb-8">
              Your message was sent successfully. Both email and Telegram message relays have logged the transmission details.
            </p>
            <button 
              onClick={() => { setSuccess(false); setStatusMessage(''); }}
              className="font-mono text-xs font-bold px-4 py-2 border-2 border-charcoal bg-[#F4F1EA] hover:bg-charcoal hover:text-oatmeal cursor-pointer transition-all duration-200"
              style={{ boxShadow: '2px 2px 0px 0px #1E1E1E' }}
            >
              SEND_NEW_TRANSMISSION 
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alternative options */}
      <div className="mt-8 pt-6 border-t border-charcoal/10 space-y-4 text-xs font-mono text-charcoal/60">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <a 
            href={`mailto:aumdpandya310306@gmail.com`} 
            className="flex items-center gap-1.5 hover:text-terracotta transition-colors"
          >
            <Mail className="w-3.5 h-3.5" /> Direct: aumdpandya310306@gmail.com
          </a>
          <a 
            href="https://t.me" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 hover:text-terracotta transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" /> Message via Telegram
          </a>
        </div>
        
        <div className="flex justify-center sm:justify-start gap-6 pt-3 border-t border-charcoal/5">
          <a 
            href="https://github.com/Aum3136" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 hover:text-terracotta transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" /> GitHub
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 hover:text-terracotta transition-colors"
          >
            <LinkedinIcon className="w-3.5 h-3.5" /> LinkedIn
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1.5 hover:text-terracotta transition-colors"
          >
            <TwitterIcon className="w-3.5 h-3.5" /> Twitter
          </a>
        </div>
      </div>
    </motion.div>
  );
}
