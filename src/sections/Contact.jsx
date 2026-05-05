import { useState } from 'react';
import { PORTFOLIO_DATA } from '../constants';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');

        setTimeout(() => {
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus(''), 3000);
        }, 1500);
    };

    return (
        <section id="contact" className="py-16 relative z-10">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col items-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">
                        Get In Touch
                    </h2>
                    <div className="w-16 h-1 bg-slate-700 rounded-full" />
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold text-white mb-4">
                            Let's build something awesome.
                        </h3>
                        <p className="text-slate-400 text-base mb-8 leading-relaxed">
                            Whether you have a specific project in mind, need technical advice, or just want to say hi, my inbox is always open!
                        </p>

                        <div className="space-y-4">
                            <a href={`mailto:${PORTFOLIO_DATA.contact.email}`} className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-800 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                                    <FiMail />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 font-medium">Email</p>
                                    <p className="text-slate-300">{PORTFOLIO_DATA.contact.email}</p>
                                </div>
                            </a>

                            <a href={`tel:${PORTFOLIO_DATA.contact.phone.replace(/\s+/g, '')}`} className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-800 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                                    <FiPhone />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 font-medium">Phone</p>
                                    <p className="text-slate-300">{PORTFOLIO_DATA.contact.phone}</p>
                                </div>
                            </a>

                            <div className="flex items-center gap-4 p-4 rounded-xl">
                                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
                                    <FiMapPin />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 font-medium">Location</p>
                                    <p className="text-slate-300">India</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8 rounded-2xl">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-1.5">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-primary transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1.5">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-primary transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-1.5">Message</label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-primary transition-colors resize-none"
                                        placeholder="How can I help you?"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="w-full py-3 rounded-lg bg-primary hover:bg-blue-600 text-white font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                                >
                                    {status === 'sending' ? (
                                        <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    ) : status === 'success' ? (
                                        "Message Sent!"
                                    ) : (
                                        <><FiSend /> Send Message</>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
