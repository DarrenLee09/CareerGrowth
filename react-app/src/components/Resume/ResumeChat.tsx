import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResumeChat as ResumeChatType, ChatMessage } from '../../types';
import './Resume.css';

interface ResumeChatProps {
    chat: ResumeChatType;
    onSendMessage: (message: string) => Promise<void>;
}

const ResumeChat: React.FC<ResumeChatProps> = ({ chat, onSendMessage }) => {
    const [message, setMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chat.messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setIsTyping(true);
        try {
            await onSendMessage(message);
            setMessage('');
        } finally {
            setIsTyping(false);
        }
    };

    const formatTimestamp = (date: Date) => {
        return new Date(date).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="resume-chat">
            <div className="chat-header">
                <h3>AI Resume Assistant</h3>
                <p>Chat with AI to improve your resume</p>
            </div>

            <div className="chat-container" ref={chatContainerRef}>
                <div className="messages">
                    <AnimatePresence>
                        {chat.messages.map((msg, index) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                                className={`message ${msg.role}`}
                            >
                                <div className="message-content">
                                    {msg.role === 'assistant' && (
                                        <div className="assistant-avatar">AI</div>
                                    )}
                                    <div className="message-bubble">
                                        <p>{msg.content}</p>
                                        <span className="message-time">
                                            {formatTimestamp(msg.timestamp)}
                                        </span>
                                    </div>
                                </div>
                                {msg.context && (
                                    <div className="message-context">
                                        {msg.context.section && (
                                            <span className="context-badge section">
                                                {msg.context.section}
                                            </span>
                                        )}
                                        {msg.context.suggestion && (
                                            <span className="context-badge suggestion">
                                                Suggestion
                                            </span>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="typing-indicator"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <form onSubmit={handleSubmit} className="chat-input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask about improving your resume..."
                    disabled={isTyping}
                />
                <button type="submit" disabled={isTyping || !message.trim()}>
                    Send
                </button>
            </form>
        </div>
    );
};

export default ResumeChat; 