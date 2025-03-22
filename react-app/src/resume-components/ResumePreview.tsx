import React, { useState } from "react";
import styles from "./ResumePreview.module.css";
import { stringify } from "querystring";
import { useToast } from "../components/Toast/ToastContext";

interface ResumePreviewProps {
  sections: {
    title: string;
    content: string;
  }[];
  onSectionUpdate: (sectionIndex: number, updatedContent: string) => void;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  sections,
  onSectionUpdate,
}) => {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const { showToast } = useToast();
  // TODO: chatNessages needs to retrive actual chat data
  const [chatMessages, setChatMessages] = useState<
    Array<{ type: "user" | "assistant"; content: string }>
  >([
    {
      type: "assistant",
      content:
        "Hello! I'm your AI resume assistant. I can help you improve your resume. What would you like to focus on?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleEditStart = (section: { content: string }, index: number) => {
    setEditContent(section.content);
    setActiveSection(index);
    setIsEditing(true);
  };

  const handleEditSave = () => {
    if (activeSection !== null) {
      onSectionUpdate(activeSection, editContent);
      setIsEditing(false);
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setActiveSection(null);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: "user" as const,
      content: inputMessage,
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userMessage),
      });

      if (!response.ok) {
        throw new Error("Error sending message");
      }
      let aiResponseData = await response.json();
      aiResponseData = JSON.parse(aiResponseData);
      const aiMessage = {
        type: "assistant" as const,
        content: aiResponseData.candidates[0].content.parts[0].text,
      };
      setChatMessages((prev) => [...prev, aiMessage]);
      // TODO: update conversation history with each message sent and display it
    } catch (error) {
      showToast("Could not send message", "error");
    }

    // TODO: Implement actual AI response
    /*setTimeout(() => {
            const aiResponse = {
                type: 'assistant' as const,
                content: 'I can help you improve that section. Would you like me to suggest some improvements?'
            };
            setChatMessages(prev => [...prev, aiResponse]);
        }, 1000);*/
  };

  return (
    <div className={styles.previewContainer}>
      <div className={styles.resumePreview}>
        <div className={styles.resumeHeader}>
          <h1>Your Name</h1>
          <p>Software Developer</p>
          <div className={styles.contactInfo}>
            <span>email@example.com</span>
            <span>•</span>
            <span>(123) 456-7890</span>
            <span>•</span>
            <span>LinkedIn</span>
          </div>
        </div>

        <div className={styles.resumeContent}>
          {sections.map((section, index) => (
            <div key={index} className={styles.resumeSection}>
              <div className={styles.sectionHeader}>
                <h2>{section.title}</h2>
                <button
                  onClick={() => handleEditStart(section, index)}
                  className={styles.editButton}
                >
                  Edit
                </button>
              </div>
              {isEditing && activeSection === index ? (
                <div className={styles.editMode}>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className={styles.editTextarea}
                  />
                  <div className={styles.editActions}>
                    <button
                      onClick={handleEditSave}
                      className={styles.saveButton}
                    >
                      Save
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className={styles.cancelButton}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className={styles.sectionContent}>
                  {section.content.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.chatPanel}>
        <div className={styles.chatHeader}>
          <span className={styles.chatIcon}>💬</span>
          <h3>AI Resume Assistant</h3>
        </div>

        <div className={styles.chatMessages}>
          {chatMessages.map((message, index) => (
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
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Ask me anything about your resume..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
