import React, { useState } from 'react';
import styles from './ResumeChat.module.css';

interface Message {
    type: 'user' | 'assistant';
    content: string;
}

interface ResumeChatProps {
    onSendMessage: (message: string) => void;
}

const ResumeChat: React.FC<ResumeChatProps> = ({ onSendMessage }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            type: 'assistant',
            content: 'Hello! I\'m your AI resume assistant. How can I help you today?'
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = () => {
        if (!inputMessage.trim()) return;

        const userMessage: Message = {
            type: 'user',
            content: inputMessage
        };

        setMessages(prev => [...prev, userMessage]);
        onSendMessage(inputMessage);
        setInputMessage('');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatHeader}>
                <span className={styles.chatIcon}>💬</span>
                <h3>AI Resume Assistant</h3>
            </div>

            <div className={styles.chatMessages}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`${styles.message} ${styles[message.type]}`}
                    >
                        <div className={styles.messageContent}>
                            <p>{message.content}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.chatInput}>
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your resume..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ResumeChat; 