import React, { useState, useRef, useEffect } from "react";
import { chatWithTutor } from "../services/geminiService";
import { Message } from "../types";
import { useLanguage } from "../LanguageContext";

const AITutor: React.FC = () => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "model",
      text: t.tutor.greeting,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        role: "model",
        text: t.tutor.greeting,
      },
    ]);
  }, [t.tutor.greeting]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);

    const history = messages.map((m) => ({
      role: m.role,
      parts: [{ text: m.text }],
    }));

    const response = await chatWithTutor(history, userMsg);

    setMessages((prev) => [...prev, { role: "model", text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-xl flex flex-col h-[600px]">
      <div className="p-6 border-b border-slate-700 bg-slate-800 rounded-t-2xl">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <span className="bg-indigo-500 w-2 h-8 mr-4 rounded-full"></span>
          {t.tutor.title}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-900/50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-lg text-sm ${
                msg.role === "user"
                  ? "bg-primary text-white rounded-br-none"
                  : "bg-slate-700 text-slate-200 rounded-bl-none"
              }`}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: msg.text
                    .replace(/\n/g, "<br />")
                    .replace(
                      /\`\`\`(.*?)\`\`\`/gs,
                      '<pre class="bg-black/30 p-2 mt-2 rounded font-mono text-xs overflow-x-auto">$1</pre>'
                    )
                    .replace(
                      /\`(.*?)\`/g,
                      '<code class="bg-black/30 px-1 rounded font-mono">$1</code>'
                    ),
                }}
              />
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-700 p-4 rounded-lg rounded-bl-none">
              <div className="flex space-x-2">
                <div
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-slate-800 border-t border-slate-700 rounded-b-2xl">
        <form onSubmit={handleSend} className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.tutor.placeholder}
            className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-primary hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {t.tutor.send}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AITutor;
