import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import Markdown from "react-markdown";
import Prism from "prismjs";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { markdownComponents } from "./MarkDown";
const Message = ({ role, content }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  const copyMessage = () => {
    navigator.clipboard.writeText(content);
    toast.success("Message copied to clipboard");
  };

 

  return (
    <div
      className={`flex flex-col w-full text-sm ${
        role === "user" ? "items-end" : "items-center"
      }`}
    >
      <div
        className={`flex w-full mb-8 ${
          role === "user" ? "justify-end pr-4" : "justify-center"
        }`}
      >
        <div
          className={`group relative flex rounded-xl ${
            role === "user"
              ? "max-w-2xl py-3 bg-[#53535b] px-5 flex-row-reverse mr-4"
              : "max-w-6xl py-4 gap-3 bg-white/5 px-6"
          }`}
        >
          <div
            className={`opacity-0 group-hover:opacity-100 absolute ${
              role === "user" ? "right-2 top-14" : "left-9 -bottom-10"
            } transition-all`}
          >
            <div className="flex items-center gap-2 opacity-70">
              {role === "user" ? (
                <>
                  <Image
                    onClick={copyMessage}
                    src={assets.copy_icon}
                    alt=""
                    className="w-4 cursor-pointer"
                  />
                  <Image
                    src={assets.pencil_icon}
                    alt=""
                    className="w-4.5 cursor-pointer"
                  />
                </>
              ) : (
                <>
                  <Image
                    onClick={copyMessage}
                    src={assets.copy_icon}
                    alt=""
                    className="w-4.5 cursor-pointer"
                  />
                  <Image
                    src={assets.regenerate_icon}
                    alt=""
                    className="w-4 cursor-pointer"
                  />
                  <Image
                    src={assets.like_icon}
                    alt=""
                    className="w-4 cursor-pointer"
                  />
                  <Image
                    src={assets.dislike_icon}
                    alt=""
                    className="w-4 cursor-pointer"
                  />
                </>
              )}
            </div>
          </div>

          {role === "user" ? (
            <span className="text-white text-lg text-right break-words">
              {content}
            </span>
          ) : (
            <>
              <Image
                src={assets.logo_icon1}
                alt="logo_icon1"
                className="h-9 w-9 p-1 border border-white/15 rounded-full flex-shrink-0 mt-1"
              />
              <div className="space-y-4 w-full overflow-auto text-base text-left">
                <Markdown components={markdownComponents}>{content}</Markdown>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;

