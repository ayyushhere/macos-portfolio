import React, { useState, useRef, useEffect } from 'react';
import WindowControls from '#components/WindowControls';
import WindowWrapper from '#hoc/WindowWrapper';
import { Bot, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// --- Local AI Brain ---
const knowledgeBase = {
    greeting: [
        "Hi there! I'm Ayush's personal AI. How can I help you today?",
        "Hello! I know everything about Ayush's technical background. What do you want to know?",
        "Hey! Welcome to the portfolio. Ask me about Ayush's skills, projects, or experience!"
    ],
    skills: [
        "Ayush is highly skilled in React.js, Node.js, Express, MongoDB, and Tailwind CSS. He's also proficient in Java, C++, TypeScript, and Next.js!",
        "His tech stack revolves around the MERN stack (MongoDB, Express, React, Node.js). He also has deep knowledge of OOPs, DBMS, and OS.",
        "From frontend polish with React and Tailwind to backend architecture with Express and MongoDB, Ayush is a full-stack developer. He also codes in Java and Python."
    ],
    experience: [
        "He's currently a Web Developer at MyGreenhouse and previously interned at FutureStack GenAI and SkillCraft Technology. Check the Resume folder for more details!",
        "His experience spans multiple internships, including Web Development at MyGreenhouse and Full Stack roles where he built responsive applications.",
        "Ayush has hands-on industry experience building modern web apps. He's interned at MyGreenhouse, FutureStack GenAI, and SkillCraft Technology."
    ],
    projects: [
        "Ayush has built some amazing stuff! A standout is 'Clothify' (a full-stack E-commerce platform), and a Real-time Chat App using Socket.io.",
        "His projects include 'Clothify' (MERN stack e-commerce), a fully functional Real-time Chat application, and of course, this macOS-inspired portfolio!",
        "You should definitely check out his projects like Clothify and his real-time chat application. They showcase his full-stack capabilities."
    ],
    education: [
        "Ayush is currently pursuing a B.Tech in Computer Science at Acropolis Institute of Technology and Research (AITR), Indore (2022-2026), with a 7.95 CGPA.",
        "He studies Computer Science (B.Tech) at AITR, Indore, and is expected to graduate in 2026. Prior to that, he completed his schooling with top grades.",
        "He's a CS undergrad at Acropolis Institute (AITR) graduating in 2026. He maintains a solid 7.95 CGPA while building out his full-stack projects."
    ],
    contact: [
        "You can reach him via email at ayushchoubisa642@gmail.com, or check out his LinkedIn and GitHub in the Contact window!",
        "Want to hire him? Drop an email at ayushchoubisa642@gmail.com or connect with him on LinkedIn.",
        "The best way to reach Ayush is via his email: ayushchoubisa642@gmail.com. You can also click the Contact icon on the desktop."
    ],
    about: [
        "Ayush is a passionate Full-Stack Developer specializing in the MERN stack. He loves building highly interactive, scalable web applications.",
        "He's a web developer who bridges the gap between beautiful design (like this macOS clone) and robust backend logic.",
        "Ayush is a driven developer from India, focusing on React, Node.js, and modern software architecture."
    ],
    default: [
        "That's an interesting question! While I don't have the exact details on that, I can tell you all about Ayush's skills, projects, and work experience.",
        "I'm not exactly sure about that. I'm mainly programmed to assist you with exploring Ayush's resume and portfolio. Ask me about his tech stack!",
        "Hmm, I don't know the answer to that. Try asking me about Ayush's education, experience, or how to contact him!"
    ]
};

const keywords = {
    greeting: ['hi', 'hello', 'hey', 'morning', 'afternoon', 'sup'],
    skills: ['skill', 'tech', 'stack', 'language', 'framework', 'know', 'react', 'node', 'java'],
    experience: ['experience', 'work', 'job', 'intern', 'company'],
    projects: ['project', 'build', 'create', 'portfolio', 'app', 'clothify'],
    education: ['education', 'study', 'college', 'degree', 'university', 'btech', 'school'],
    contact: ['contact', 'email', 'hire', 'phone', 'reach', 'linkedin', 'github'],
    about: ['who', 'about', 'yourself', 'background', 'bio']
};

const getAIResponse = (input) => {
    const text = input.toLowerCase();
    let matchedCategory = 'default';
    for (const [category, words] of Object.entries(keywords)) {
        if (words.some(word => text.includes(word))) {
            matchedCategory = category;
            break;
        }
    }
    const responses = knowledgeBase[matchedCategory];
    return responses[Math.floor(Math.random() * responses.length)];
};
// ----------------------

const Messages = ({ windowKey }) => {
    const [messages, setMessages] = useState([
        { text: "Hi! I'm Ayush-AI. I know everything about Ayush's experience, projects, and skills. What would you like to know?", isBot: true }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollContainerRef = useRef(null);

    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, loading]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userText = input.trim();
        setInput("");
        setMessages(prev => [...prev, { text: userText, isBot: false }]);
        setLoading(true);

        setTimeout(() => {
            const aiReply = getAIResponse(userText);
            setMessages(prev => [...prev, { text: aiReply, isBot: true }]);
            setLoading(false);
        }, Math.random() * 1000 + 800);
    };

    return (
        <div className="w-full h-full flex bg-[#0a0a0a]/90 overflow-hidden shadow-2xl relative z-50">
            {/* Sidebar */}
            <div className="w-[220px] shrink-0 border-r border-white/10 bg-[#252525]/95 flex flex-col h-full z-20">
                <div id="window-header" className="!bg-transparent !border-b-0 h-10 shrink-0 w-full">
                    <WindowControls target={windowKey} />
                </div>
                
                <div className="p-3">
                    <div className="flex items-center gap-2 p-2 rounded-md bg-[#2d5be3]/80 text-white shadow-inner">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center shrink-0 shadow-lg">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold truncate">Ayush AI</p>
                            <p className="text-xs text-white/70 truncate">Virtual Assistant</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-[#1e1e1e]/90 relative min-w-0 h-full overflow-hidden">
                <div className="h-12 border-b border-white/10 flex items-center px-6 shrink-0 bg-white/5 z-10 w-full">
                    <p className="text-sm font-semibold text-gray-200">To: <span className="text-gray-400">Ayush AI</span></p>
                </div>

                <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scroll-smooth">
                    <div className="flex flex-col items-center justify-center my-6 shrink-0">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg mb-3">
                            <Bot className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-200">Ayush AI</h2>
                        <p className="text-xs text-gray-400">iMessage</p>
                    </div>

                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex w-full ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                            <div className={`max-w-[85%] md:max-w-[75%] px-4 py-2.5 rounded-2xl shadow-md text-sm leading-relaxed ${
                                msg.isBot 
                                ? 'bg-[#2a2a2a] text-gray-200 rounded-tl-sm border border-white/5' 
                                : 'bg-blue-600 text-white rounded-tr-sm'
                            }`}>
                                <div className="prose prose-invert prose-sm max-w-none">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {msg.text}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="flex w-full justify-start">
                            <div className="bg-[#2a2a2a] px-4 py-3 rounded-2xl rounded-tl-sm border border-white/5 flex gap-1.5 items-center">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 shrink-0 w-full border-t border-white/5 z-10">
                    <form onSubmit={handleSend} className="relative flex items-center w-full">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Message..."
                            className="w-full bg-[#3a3a3a]/80 text-gray-200 text-sm rounded-full py-2.5 pl-5 pr-12 outline-none border border-white/10 focus:border-white/30 transition-all placeholder:text-gray-500"
                            disabled={loading}
                        />
                        <button 
                            type="submit" 
                            disabled={!input.trim() || loading}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center disabled:opacity-50 transition-colors shrink-0"
                        >
                            <Send className="w-3.5 h-3.5 -ml-0.5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WindowWrapper(Messages, 'messages');