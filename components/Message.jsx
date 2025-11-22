import React, { useState, useEffect } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Prism from "prismjs";
import toast from "react-hot-toast";
import { markdownComponents } from "@/components/MarkDown";
import { assets } from "@/assets/assets";

const MessageBubble = ({ role, content }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  const copyMessage = () => {
    navigator.clipboard.writeText(content);
    toast.success("Message copied to clipboard");
  };

  return (
    <div className={`flex w-full ${role === "user" ? "justify-end" : "justify-start"} mb-6`}>
      <div
        className={`relative group flex items-start gap-3 max-w-[80%] rounded-2xl p-5 shadow-xl transition-all duration-200
        ${
          role === "user"
            ? "bg-gradient-to-br from-blue-600 to-cyan-700 border border-white/10 text-white"
            : "bg-white/10 backdrop-blur-md border border-cyan-400/30 text-white"
        }`}
      >

        {/* AI Avatar */}
        {role !== "user" && (
          <Image
            src={assets.logo_icon1}
            alt="ai"
            className="h-10 w-10 rounded-full border border-white/20 shadow-lg"
          />
        )}

        {/* MESSAGE CONTENT */}
        <div className="flex-1 whitespace-pre-line leading-relaxed overflow-x-auto text-[16px]">
          {role === "user" ? (
            <span className="text-white break-words">{content}</span>
          ) : (
            <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
          )}
        </div>

        {/* ACTION ICONS */}
        <div
          className={`absolute opacity-0 group-hover:opacity-100 transition-all duration-200 flex gap-3
          ${role === "user" ? "right-2 -bottom-8" : "left-1 -bottom-10"}`}
        >
          <Image onClick={copyMessage} src={assets.copy_icon} alt="copy" className="w-5 cursor-pointer hover:scale-110" />

          {role !== "user" && (
            <>
              <Image src={assets.regenerate_icon} alt="regen" className="w-5 cursor-pointer hover:scale-110" />
              <Image src={assets.like_icon} alt="like" className="w-5 cursor-pointer hover:scale-110" />
              <Image src={assets.dislike_icon} alt="dislike" className="w-5 cursor-pointer hover:scale-110" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default function ChatUI() {
  const [messages, setMessages] = useState([
    { role: "ai", content: "Hello 🌌 I am **COSMOS-AI** — ask me anything about space & astrophysics!" }
  ]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-[#050b18] to-black bg-fixed text-white px-4 py-6 flex flex-col">

      <div className="flex-1 w-full mx-auto max-w-4xl overflow-y-auto space-y-4 pb-10">
        {messages.map((msg, index) => (
          <MessageBubble key={index} role={msg.role} content={msg.content} />
        ))}
      </div>

      {/* Typing indicator */}
      <div className="flex gap-2 items-center mt-2 mx-auto">
        <span className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></span>
        <span className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse delay-150"></span>
        <span className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse delay-300"></span>
      </div>
    </div>
  );
}
