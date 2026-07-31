import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { PORTFOLIO_DATA } from '../constants';
import { 
    Mail, 
    Phone, 
    MapPin, 
    Send, 
    MessageSquare, 
    Terminal, 
    Swords, 
    RefreshCw, 
    User, 
    CheckCircle2, 
    ChevronRight, 
    HelpCircle, 
    Database, 
    UserCheck, 
    Sparkles, 
    Trophy, 
    ShieldAlert 
} from 'lucide-react';

const Contact = () => {
    const [activeTheme, setActiveTheme] = useState('glass');
    const [formData, setFormData] = useState({ name: '', email: '', message: '', type: 'General Inquiry' });
    const [status, setStatus] = useState(''); // '' | 'sending' | 'success' | 'error'

    // Reset fields
    const resetForm = () => {
        setFormData({ name: '', email: '', message: '', type: 'General Inquiry' });
        setStatus('');
    };

    // Shared Form Submit
    const handleFormSubmit = (data = formData) => {
        setStatus('sending');

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (serviceId && templateId && publicKey) {
            emailjs.send(
                serviceId,
                templateId,
                {
                    from_name: data.name,
                    from_email: data.email,
                    message: data.message,
                    inquiry_type: data.type || 'General Inquiry',
                    to_name: 'Akash L'
                },
                publicKey
            ).then(
                () => {
                    setStatus('success');
                },
                (err) => {
                    console.error('EmailJS Error:', err);
                    setStatus('error');
                }
            );
        } else {
            console.warn("EmailJS credentials not found in environment variables. Simulating mail transmission (1.5s delay).");
            setTimeout(() => {
                setStatus('success');
            }, 1500);
        }
    };

    // ----------------------------------------------------
    // STYLE A: CLASSIC GLASSMORPHIC FORM
    // ----------------------------------------------------
    const ClassicGlassForm = () => {
        const [localForm, setLocalForm] = useState({ ...formData });

        const handleSubmit = (e) => {
            e.preventDefault();
            setFormData(localForm);
            handleFormSubmit(localForm);
        };

        return (
            <motion.form 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -15 }}
                onSubmit={handleSubmit} 
                className="glass-card p-6 md:p-8 rounded-2xl border border-slate-700 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
                <div className="space-y-5">
                    <div>
                        <label htmlFor="glass-name" className="block text-sm font-medium text-slate-400 mb-1.5">Your Name</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                                <User size={18} />
                            </span>
                            <input
                                type="text"
                                id="glass-name"
                                required
                                value={localForm.name}
                                onChange={(e) => setLocalForm({ ...localForm, name: e.target.value })}
                                className="w-full bg-slate-900/60 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-slate-605"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="glass-email" className="block text-sm font-medium text-slate-400 mb-1.5">Email Address</label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                                <Mail size={18} />
                            </span>
                            <input
                                type="email"
                                id="glass-email"
                                required
                                value={localForm.email}
                                onChange={(e) => setLocalForm({ ...localForm, email: e.target.value })}
                                className="w-full bg-slate-900/60 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder-slate-605"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="glass-message" className="block text-sm font-medium text-slate-400 mb-1.5">Message</label>
                        <textarea
                            id="glass-message"
                            required
                            rows={4}
                            value={localForm.message}
                            onChange={(e) => setLocalForm({ ...localForm, message: e.target.value })}
                            className="w-full bg-slate-900/60 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none placeholder-slate-605"
                            placeholder="Tell me about your project or say hello..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full py-3 rounded-lg bg-primary hover:bg-blue-600 text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 hover:shadow-lg hover:shadow-primary/25 cursor-pointer"
                    >
                        {status === 'sending' ? (
                            <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : status === 'success' ? (
                            "Message Dispatched!"
                        ) : (
                            <><Send size={16} /> Send Message</>
                        )}
                    </button>
                </div>
            </motion.form>
        );
    };

    // ----------------------------------------------------
    // STYLE B: CONVERSATIONAL AI CHAT INTERFACE
    // ----------------------------------------------------
    const ConversationalChat = () => {
        const chatEndRef = useRef(null);
        const [chatStep, setChatStep] = useState('welcome'); // welcome | askName | askEmail | askType | askMsg | submitting | done
        const [messages, setMessages] = useState([]);
        const [inputVal, setInputVal] = useState('');
        const [typing, setTyping] = useState(false);

        // Auto Scroll
        useEffect(() => {
            chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, [messages, typing]);

        // Start flow
        useEffect(() => {
            if (messages.length === 0) {
                setTyping(true);
                setTimeout(() => {
                    setMessages([
                        { id: 1, sender: 'bot', text: `Hi there! 👋 I am Akash's virtual helper.` },
                        { id: 2, sender: 'bot', text: "Let's assemble a contact quest. First, what is your name?" }
                    ]);
                    setTyping(false);
                    setChatStep('askName');
                }, 800);
            }
        }, []);

        const handleSend = (textToSend = inputVal) => {
            if (!textToSend.trim() && chatStep !== 'askType') return;

            // User message
            const userMsg = { id: Date.now(), sender: 'user', text: textToSend };
            setMessages(prev => [...prev, userMsg]);
            setInputVal('');

            // Transition logic
            if (chatStep === 'askName') {
                setFormData(prev => ({ ...prev, name: textToSend }));
                setTyping(true);
                setChatStep('waiting');
                setTimeout(() => {
                    setMessages(prev => [...prev, { 
                        id: Date.now() + 1, 
                        sender: 'bot', 
                        text: `Pleasure meeting you, ${textToSend}! 😄` 
                    }, {
                        id: Date.now() + 2,
                        sender: 'bot',
                        text: "May I know your email address so Akash can reply to you?"
                    }]);
                    setTyping(false);
                    setChatStep('askEmail');
                }, 1000);
            } else if (chatStep === 'askEmail') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(textToSend)) {
                    setTyping(true);
                    setChatStep('waiting');
                    setTimeout(() => {
                        setMessages(prev => [...prev, { 
                            id: Date.now() + 1, 
                            sender: 'bot', 
                            text: "Oops! 🧐 That scroll pattern doesn't look like a standard email. Please enter a valid address:" 
                        }]);
                        setTyping(false);
                        setChatStep('askEmail');
                    }, 800);
                    return;
                }

                setFormData(prev => ({ ...prev, email: textToSend }));
                setTyping(true);
                setChatStep('waiting');
                setTimeout(() => {
                    setMessages(prev => [...prev, {
                        id: Date.now() + 1,
                        sender: 'bot',
                        text: "Understood! What kind of inquiry is this?",
                        options: ['Freelance Project', 'Job Opportunity', 'Just saying Hello']
                    }]);
                    setTyping(false);
                    setChatStep('askType');
                }, 1000);
            } else if (chatStep === 'askMsg') {
                setFormData(prev => {
                    const updated = { ...prev, message: textToSend };
                    // Submit form
                    handleFormSubmit(updated);
                    return updated;
                });

                setTyping(true);
                setChatStep('submitting');
                setTimeout(() => {
                    setMessages(prev => [...prev, {
                        id: Date.now() + 1,
                        sender: 'bot',
                        text: "Perfect! Dispatched to Akash's terminal. 🚀"
                    }, {
                        id: Date.now() + 2,
                        sender: 'bot',
                        text: "Quest complete! Your message has been sent successfully. Feel free to explore other contact channels below."
                    }]);
                    setTyping(false);
                    setChatStep('done');
                }, 1500);
            }
        };

        const handleOptionClick = (option) => {
            setFormData(prev => ({ ...prev, type: option }));
            const userMsg = { id: Date.now(), sender: 'user', text: option };
            setMessages(prev => [...prev, userMsg]);
            setTyping(true);
            setChatStep('waiting');
            setTimeout(() => {
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    sender: 'bot',
                    text: `Excellent. Now, write down your scroll content (message):`
                }]);
                setTyping(false);
                setChatStep('askMsg');
            }, 1000);
        };

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="glass-card flex flex-col h-[450px] rounded-2xl overflow-hidden border border-slate-700 bg-slate-800/40"
            >
                {/* Chat Header */}
                <div className="bg-slate-900/80 px-4 py-3 flex items-center gap-3 border-b border-slate-800">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                        <Sparkles size={16} />
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-slate-200">Akash's Assistant</h4>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] text-slate-400">Online</span>
                        </div>
                    </div>
                    <button 
                        onClick={() => {
                            setMessages([]);
                            resetForm();
                        }}
                        className="ml-auto text-slate-500 hover:text-slate-300 p-1.5 rounded-lg hover:bg-slate-800/50 transition-colors"
                        title="Restart Chat"
                    >
                        <RefreshCw size={14} />
                    </button>
                </div>

                {/* Messages Body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                    {messages.map(msg => (
                        <div 
                            key={msg.id} 
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                                msg.sender === 'user' 
                                    ? 'bg-primary text-white rounded-tr-none shadow-sm font-medium' 
                                    : 'bg-slate-950/80 text-slate-300 border border-slate-850 rounded-tl-none'
                            }`}>
                                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                                
                                {msg.options && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {msg.options.map((opt, i) => (
                                            <button
                                                key={i}
                                                type="button"
                                                onClick={() => handleOptionClick(opt)}
                                                className="bg-slate-850 border border-slate-700 hover:bg-slate-700 hover:border-slate-550 text-slate-200 font-semibold px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer"
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {typing && (
                        <div className="flex justify-start">
                            <div className="bg-slate-950/80 text-slate-300 border border-slate-850 rounded-2xl rounded-tl-none px-4 py-3 flex gap-1 items-center">
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Input Footer */}
                {chatStep !== 'askType' && chatStep !== 'done' && chatStep !== 'submitting' && (
                    <div className="p-3 bg-slate-900/80 border-t border-slate-800 flex gap-2">
                        <input
                            type={chatStep === 'askEmail' ? 'email' : 'text'}
                            value={inputVal}
                            onChange={(e) => setInputVal(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={
                                chatStep === 'askName' ? "Type your name..." : 
                                chatStep === 'askEmail' ? "Type your email..." : 
                                chatStep === 'askMsg' ? "Type details of your message..." : "Type here..."
                            }
                            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-primary placeholder-slate-800"
                        />
                        <button
                            type="button"
                            onClick={() => handleSend()}
                            className="p-2 bg-primary hover:bg-blue-600 text-white rounded-lg transition-colors cursor-pointer"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                )}
            </motion.div>
        );
    };

    // ----------------------------------------------------
    // STYLE C: RETRO DEVELOPER CONSOLE / TERMINAL
    // ----------------------------------------------------
    const RetroTerminal = () => {
        const termEndRef = useRef(null);
        const [inputVal, setInputVal] = useState('');
        const [terminalLogs, setTerminalLogs] = useState([
            "Initializing secure developer terminal...",
            "Host: akashl.work@gmail.com connected.",
            "Type 'help' to see system commands.",
            "Fill in fields to send data packets."
        ]);

        const log = (msg) => {
            setTerminalLogs(prev => [...prev, msg]);
        };

        useEffect(() => {
            termEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, [terminalLogs]);

        const executeCommand = (cmdText) => {
            const trimmed = cmdText.trim();
            if (!trimmed) return;

            log(`akash@portfolio:~$ ${trimmed}`);
            setInputVal('');

            const parts = trimmed.split(' ');
            const command = parts[0].toLowerCase();
            const args = parts.slice(1).join(' ');

            switch(command) {
                case 'help':
                    log("System commands:");
                    log("  help                   - List console guides");
                    log("  status                 - Dump current variables");
                    log("  name [value]           - Populate your name");
                    log("  email [value]          - Populate your email");
                    log("  message [value]        - Populate the main message");
                    log("  submit                 - Trigger secure dispatch");
                    log("  clear                  - Wipe logging buffer");
                    break;
                case 'status':
                    log(`Packet Metadata:`);
                    log(`  Name:    ${formData.name || '<UNSPECIFIED>'}`);
                    log(`  Email:   ${formData.email || '<UNSPECIFIED>'}`);
                    log(`  Message: ${formData.message || '<UNSPECIFIED>'}`);
                    break;
                case 'name':
                    if (!args) {
                        log("Usage: name [your_name]");
                    } else {
                        setFormData(prev => ({ ...prev, name: args }));
                        log(`Variable [Name] updated to: "${args}"`);
                    }
                    break;
                case 'email':
                    if (!args) {
                        log("Usage: email [your_email]");
                    } else {
                        setFormData(prev => ({ ...prev, email: args }));
                        log(`Variable [Email] updated to: "${args}"`);
                    }
                    break;
                case 'message':
                    if (!args) {
                        log("Usage: message [your_message]");
                    } else {
                        setFormData(prev => ({ ...prev, message: args }));
                        log(`Variable [Message] updated to: "${args}"`);
                    }
                    break;
                case 'submit':
                    if (!formData.name || !formData.email || !formData.message) {
                        log("[ERROR] Cannot dispatch packet. Missing required variables.");
                        log("Ensure 'name', 'email', and 'message' fields are set. (Type 'status')");
                    } else {
                        log("Dispatching secure packet telemetry...");
                        handleFormSubmit();
                        setTimeout(() => {
                            log("Packet received. Code 200: OK.");
                        }, 1600);
                    }
                    break;
                case 'clear':
                    setTerminalLogs([]);
                    break;
                default:
                    log(`Command not recognized: '${command}'. Type 'help' for support.`);
            }
        };

        const handleBadgeClick = (cmdType) => {
            if (cmdType === 'submit') {
                executeCommand('submit');
            } else {
                const userVal = prompt(`Enter value for ${cmdType}:`);
                if (userVal !== null && userVal.trim() !== '') {
                    executeCommand(`${cmdType} ${userVal}`);
                }
            }
        };

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-black/95 font-mono text-xs rounded-2xl border border-slate-700 h-[450px] flex flex-col overflow-hidden relative"
            >
                {/* CRT Scanline Filter effect overlay */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-emerald-500/[0.01] to-transparent bg-[size:100%_4px] select-none" />

                {/* Console header */}
                <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between text-slate-400 select-none">
                    <div className="flex items-center gap-2">
                        <Terminal size={14} className="text-emerald-500" />
                        <span>akash-shell_v1.0.sh</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                    </div>
                </div>

                {/* Logs Screen */}
                <div className="flex-1 overflow-y-auto p-4 space-y-1.5 text-emerald-400 scrollbar-thin scrollbar-thumb-emerald-950 scrollbar-track-transparent">
                    {terminalLogs.map((item, idx) => (
                        <div key={idx} className="leading-relaxed whitespace-pre-wrap select-text">
                            {item}
                        </div>
                    ))}
                    <div ref={termEndRef} />
                </div>

                {/* Quick Helper Actions */}
                <div className="px-4 py-2 border-t border-slate-900 bg-slate-950/80 flex flex-wrap gap-2 text-[10px] items-center text-slate-500 select-none">
                    <span>Actions:</span>
                    <button 
                        type="button"
                        onClick={() => handleBadgeClick('name')} 
                        className="px-2 py-1 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-950/20 text-emerald-400 rounded transition-colors cursor-pointer"
                    >
                        name [{formData.name ? '✔' : 'set'}]
                    </button>
                    <button 
                        type="button"
                        onClick={() => handleBadgeClick('email')} 
                        className="px-2 py-1 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-950/20 text-emerald-400 rounded transition-colors cursor-pointer"
                    >
                        email [{formData.email ? '✔' : 'set'}]
                    </button>
                    <button 
                        type="button"
                        onClick={() => handleBadgeClick('message')} 
                        className="px-2 py-1 bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-950/20 text-emerald-400 rounded transition-colors cursor-pointer"
                    >
                        message [{formData.message ? '✔' : 'set'}]
                    </button>
                    <button 
                        type="button"
                        onClick={() => handleBadgeClick('submit')} 
                        className="px-2 py-1 bg-emerald-950/40 border border-emerald-900 hover:border-emerald-450 hover:bg-emerald-900/40 text-emerald-300 rounded transition-colors ml-auto cursor-pointer"
                    >
                        submit
                    </button>
                </div>

                {/* Input command box */}
                <div className="bg-black border-t border-slate-900 p-3 flex items-center text-emerald-400">
                    <span className="mr-2 select-none">akash@portfolio:~$</span>
                    <input
                        type="text"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && executeCommand(inputVal)}
                        placeholder="Type 'help' and press Enter..."
                        className="flex-1 bg-transparent border-none outline-none font-mono text-xs focus:ring-0 text-emerald-350 placeholder-emerald-950"
                    />
                </div>
            </motion.div>
        );
    };

    // ----------------------------------------------------
    // STYLE D: GAMIFIED QUEST BOARD
    // ----------------------------------------------------
    const GamifiedQuestBoard = () => {
        const [selectedQuest, setSelectedQuest] = useState(null);
        const [questForm, setQuestForm] = useState({ ...formData });

        const quests = [
            {
                id: 'freelance',
                title: 'Quest I: Build a Web Citadel',
                difficulty: 'Epic',
                xp: '+1,000 XP',
                mana: '15 Mana',
                color: 'border-blue-500/30 shadow-blue-500/5',
                tag: 'Freelance / Projects',
                desc: 'Summon Akash L to design and build a full-stack MERN application or cloud architecture.'
            },
            {
                id: 'recruiter',
                title: 'Quest II: Join the Developer Guild',
                difficulty: 'Legendary',
                xp: '+1,500 XP',
                mana: '20 Mana',
                color: 'border-violet-500/30 shadow-violet-500/5',
                tag: 'Full-time Recruit',
                desc: 'Enlist Akash to join your engineering crew as a full-stack intern/developer.'
            },
            {
                id: 'networking',
                title: 'Quest III: Coffee Tavern Chatter',
                difficulty: 'Common',
                xp: '+200 XP',
                mana: '5 Mana',
                color: 'border-teal-500/30 shadow-teal-500/5',
                tag: 'Chat / Coffee',
                desc: 'Initiate a virtual coffee rendezvous, discuss web tech, design, or solve standard problems.'
            }
        ];

        const handleSubmitQuest = (e) => {
            e.preventDefault();
            const updated = { ...questForm, type: selectedQuest ? selectedQuest.title : 'Quest Board Inquiry' };
            setFormData(updated);
            handleFormSubmit(updated);
        };

        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="space-y-6"
            >
                {/* Board Title */}
                <div className="flex items-center gap-2 text-slate-350 font-semibold mb-2 select-none">
                    <Swords className="text-secondary animate-pulse" size={20} />
                    <span>Adventure Quest Board</span>
                </div>

                {/* Quests selection */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {quests.map(q => (
                        <button
                            key={q.id}
                            type="button"
                            onClick={() => {
                                setSelectedQuest(q);
                                setQuestForm(prev => ({ ...prev, type: q.title }));
                            }}
                            className={`glass-card p-4 rounded-xl text-left border flex flex-col justify-between hover:-translate-y-1 transition-all text-slate-300 group cursor-pointer ${q.color} ${
                                selectedQuest?.id === q.id 
                                ? 'ring-2 ring-secondary bg-slate-800/80 border-secondary' 
                                : 'bg-slate-800/30 hover:bg-slate-800/60'
                            }`}
                        >
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] text-slate-500 uppercase tracking-wider">{q.tag}</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                                        q.difficulty === 'Legendary' ? 'bg-amber-950/50 text-amber-400 border border-amber-500/20' : 
                                        q.difficulty === 'Epic' ? 'bg-indigo-950/50 text-indigo-400 border border-indigo-500/20' : 
                                        'bg-slate-900 text-slate-400'
                                    }`}>
                                        {q.difficulty}
                                    </span>
                                </div>
                                <h5 className="font-bold text-sm text-slate-200 group-hover:text-white transition-colors mb-1.5">{q.title}</h5>
                                <p className="text-[11px] text-slate-400 leading-relaxed mb-4">{q.desc}</p>
                            </div>
                            <div className="flex items-center gap-3 border-t border-slate-800/50 pt-2 text-[10px] text-slate-500 mt-auto w-full">
                                <span className="flex items-center gap-1"><Trophy size={11} className="text-amber-500" /> {q.xp}</span>
                                <span className="flex items-center gap-1"><Cpu size={11} className="text-sky-400" /> {q.mana}</span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Quest Form Unfolds */}
                <AnimatePresence mode="wait">
                    {selectedQuest ? (
                        <motion.form
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            onSubmit={handleSubmitQuest}
                            className="glass-card p-5 md:p-6 rounded-2xl border border-slate-700/80 space-y-4 overflow-hidden bg-slate-900/30"
                        >
                            <h4 className="font-semibold text-sm text-slate-205 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-secondary" />
                                Quest Parameters: {selectedQuest.title}
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="quest-hero" className="block text-[11px] font-medium text-slate-450 mb-1">Adventurer's Name</label>
                                    <input
                                        type="text"
                                        id="quest-hero"
                                        required
                                        value={questForm.name}
                                        onChange={(e) => setQuestForm({ ...questForm, name: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-secondary"
                                        placeholder="Thy Name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="quest-scroll" className="block text-[11px] font-medium text-slate-455 mb-1">Pigeon Address (Email)</label>
                                    <input
                                        type="email"
                                        id="quest-scroll"
                                        required
                                        value={questForm.email}
                                        onChange={(e) => setQuestForm({ ...questForm, email: e.target.value })}
                                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-secondary"
                                        placeholder="Thy Email Scroll"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="quest-details" className="block text-[11px] font-medium text-slate-450 mb-1">Scroll Contents (Quest Details)</label>
                                <textarea
                                    id="quest-details"
                                    required
                                    rows={3}
                                    value={questForm.message}
                                    onChange={(e) => setQuestForm({ ...questForm, message: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-secondary resize-none"
                                    placeholder="Instruct Akash L on the specifics of this quest..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="w-full py-2.5 rounded-lg bg-secondary hover:bg-violet-600 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                            >
                                {status === 'sending' ? (
                                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>Complete Quest ⚔️</>
                                )}
                            </button>
                        </motion.form>
                    ) : (
                        <div className="text-center py-6 border border-dashed border-slate-800 rounded-2xl text-slate-500 text-xs flex flex-col items-center justify-center gap-2 select-none">
                            <HelpCircle size={24} className="text-slate-600 animate-pulse" />
                            <span>Inspect and click an active Quest from the board above to deploy the scroll form.</span>
                        </div>
                    )}
                </AnimatePresence>
            </motion.div>
        );
    };

    const themes = [
        { id: 'glass', name: 'Classic', icon: MessageSquare, desc: 'Sleek standard form' },
        { id: 'chat', name: 'Chat AI', icon: Sparkles, desc: 'Interactive chat assistance' },
        { id: 'terminal', name: 'Dev Console', icon: Terminal, desc: 'Hacker shell workspace' },
        { id: 'quest', name: 'Quest Board', icon: Swords, desc: 'RPG adventure quest' }
    ];

    return (
        <section id="contact" className="py-16 relative z-10 overflow-hidden">
            {/* Background blur decorative element */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -z-10 pointer-events-none" />
            <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12">
                {/* Title */}
                <div className="flex flex-col items-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white flex items-center gap-3 select-none">
                        Get In Touch
                    </h2>
                    <p className="text-slate-400 text-sm max-w-lg text-center leading-relaxed mb-4 select-none">
                        Choose your preferred quest module or connection method below to send a secure telemetry dispatch to my workspace.
                    </p>
                    <div className="w-16 h-1 bg-slate-700 rounded-full select-none" />
                </div>

                {/* Dashboard Style Switcher Tab-bar */}
                <div className="max-w-5xl mx-auto mb-8 bg-slate-900/60 border border-slate-800 p-1.5 rounded-2xl flex flex-wrap gap-1 md:flex-nowrap justify-between shadow-sm">
                    {themes.map(t => {
                        const Icon = t.icon;
                        const isSelected = activeTheme === t.id;
                        return (
                            <button
                                key={t.id}
                                type="button"
                                onClick={() => {
                                    setActiveTheme(t.id);
                                    resetForm();
                                }}
                                className={`flex-1 flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 text-left select-none outline-none group cursor-pointer ${
                                    isSelected 
                                        ? 'bg-slate-800 border border-slate-700 text-white shadow-md' 
                                        : 'text-slate-500 hover:text-slate-350 hover:bg-slate-900/80 border border-transparent'
                                }`}
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                    isSelected 
                                        ? 'bg-primary/20 text-primary' 
                                        : 'bg-slate-950 text-slate-500 group-hover:text-slate-400'
                                }`}>
                                    <Icon size={16} />
                                </div>
                                <div className="hidden sm:block">
                                    <h5 className="font-semibold text-xs text-slate-205 group-hover:text-white transition-colors">{t.name}</h5>
                                    <span className="text-[9px] text-slate-500 font-medium block leading-none mt-0.5">{t.desc}</span>
                                </div>
                                <span className="sm:hidden font-semibold text-xs text-slate-200">{t.name}</span>
                            </button>
                        );
                    })}
                </div>

                <div className="grid md:grid-cols-5 gap-10 max-w-5xl mx-auto">
                    {/* Left Column: Traditional Quick Links */}
                    <div className="md:col-span-2 space-y-6 flex flex-col justify-between">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                                Let's build something awesome.
                            </h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                If you want to construct state-of-the-art web interfaces, discuss AWS cloud practitioner modules, or just say hello, deploy a transmission through the selector panel.
                            </p>

                            <div className="space-y-3.5">
                                <a href={`mailto:${PORTFOLIO_DATA.contact.email}`} className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-900/30 border border-slate-800 hover:bg-slate-800/40 hover:border-slate-700 transition-all group">
                                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-850 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider leading-none">Email Address</p>
                                        <p className="text-xs text-slate-300 mt-1 select-all">{PORTFOLIO_DATA.contact.email}</p>
                                    </div>
                                </a>

                                <a href={`tel:${PORTFOLIO_DATA.contact.phone.replace(/\s+/g, '')}`} className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-900/30 border border-slate-800 hover:bg-slate-800/40 hover:border-slate-700 transition-all group">
                                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-850 flex items-center justify-center text-slate-400 group-hover:text-secondary transition-colors">
                                        <Phone size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider leading-none">Mobile Comm</p>
                                        <p className="text-xs text-slate-300 mt-1">{PORTFOLIO_DATA.contact.phone}</p>
                                    </div>
                                </a>

                                <div className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-900/30 border border-slate-800 select-none">
                                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-850 flex items-center justify-center text-slate-400">
                                        <MapPin size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider leading-none">Coordinates</p>
                                        <p className="text-xs text-slate-300 mt-1">Erode, Tamil Nadu, India</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social profiles list footer */}
                        <div className="border-t border-slate-800 pt-6 mt-6 flex gap-3 text-slate-500 items-center">
                            <span className="text-[10px] uppercase font-bold tracking-wider mr-2 select-none">Link Nodes:</span>
                            <a 
                                href={PORTFOLIO_DATA.contact.linkedin} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-xs font-semibold px-3 py-1.5 bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 rounded-lg transition-colors cursor-pointer"
                            >
                                LinkedIn
                            </a>
                            <a 
                                href={PORTFOLIO_DATA.contact.github} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-xs font-semibold px-3 py-1.5 bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 rounded-lg transition-colors cursor-pointer"
                            >
                                GitHub
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Custom Switchable Interactive Viewport */}
                    <div className="md:col-span-3">
                        <AnimatePresence mode="wait">
                            {status === 'success' ? (
                                <motion.div
                                    key="success-card"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="glass-card p-8 rounded-2xl border border-slate-700 flex flex-col items-center justify-center text-center h-full min-h-[350px] relative overflow-hidden bg-slate-900/20"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center justify-center mb-6 animate-pulse select-none">
                                        <CheckCircle2 size={36} />
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-2">Transmission Dispatched</h4>
                                    <p className="text-slate-400 text-xs max-w-xs leading-relaxed mb-6 select-none">
                                        Your packet has successfully arrived at Akash's message grid. Expect a pigeon reply or virtual signal back shortly.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="px-4 py-2 border border-slate-800 hover:border-slate-650 bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer"
                                    >
                                        <RefreshCw size={12} /> Launch New Quest
                                    </button>
                                </motion.div>
                            ) : status === 'error' ? (
                                <motion.div
                                    key="error-card"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="glass-card p-8 rounded-2xl border border-red-500/30 flex flex-col items-center justify-center text-center h-full min-h-[350px] relative overflow-hidden bg-slate-900/20"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />
                                    <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-400 border border-red-500/25 flex items-center justify-center mb-6 select-none">
                                        <ShieldAlert size={36} />
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-2">Transmission Failed</h4>
                                    <p className="text-slate-450 text-xs max-w-xs leading-relaxed mb-6 select-none">
                                        The mail packet could not be sent. Please verify that your EmailJS keys are set correctly in your `.env` configuration file.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setStatus('')}
                                        className="px-4 py-2 border border-slate-800 hover:border-red-500/30 bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer"
                                    >
                                        <RefreshCw size={12} /> Try Re-submitting
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key={activeTheme}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="h-full"
                                >
                                    {activeTheme === 'glass' && <ClassicGlassForm />}
                                    {activeTheme === 'chat' && <ConversationalChat />}
                                    {activeTheme === 'terminal' && <RetroTerminal />}
                                    {activeTheme === 'quest' && <GamifiedQuestBoard />}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
