import { assets } from "@/assets/assets";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";

const Promptbox = ({ setIsLoading, isLoading }) => {
  const [prompt, setPrompt] = useState("");
  const { user, chats, setChats, selectedChat, setSelectedChat } =
    useAppContext();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendPrompt(e);
    }
  };

  const sendPrompt = async (e) => {
    const promptCopy = prompt;

    try {
      e.preventDefault();
      if (!user) return toast.error("Login to send messages");
      if (isLoading)
        return toast.error("Please wait while we are processing your message");

      setIsLoading(true);
      setPrompt("");

      const userPrompt = {
        role: "user",
        content: prompt,
        timestamp: Date.now(),
      };

      //Saving user prompt in chats array
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat._id === selectedChat._id
            ? {
                ...chat,
                messages: [...chat.messages, userPrompt],
              }
            : chat
        )
      );

      // Saving User prompt in selected chat
      setSelectedChat((prev) => ({
        ...prev,
        messages: [...prev.messages, userPrompt],
      }));

      const { data } = await axios.post("/api/chat/ai", {
        chatId: selectedChat._id,
        prompt,
      });

      if (data.success) {
        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat._id === selectedChat._id
              ? { ...chat, messages: [...chat.messages, data.data] }
              : chat
          )
        );

        const message = data.data.content;
        const messageTokens = message.split(" ");
        let assistantMessage = {
          role: "assistant",
          content: "",
          timestamp: Date.now(),
        };
        setSelectedChat((prev) => ({
          ...prev,
          messages: [...prev.messages, assistantMessage],
        }));

        for (let i = 0; i < messageTokens.length; i++) {
          setTimeout(() => {
            assistantMessage.content = messageTokens.slice(0, i + 1).join(" ");
            setSelectedChat((prev) => {
              const updatedMessages = [
                ...prev.messages.slice(0, -1),
                assistantMessage,
              ];
              return { ...prev, messages: updatedMessages };
            });
          }, i * 100);
        }
      } else {
        toast.error("Error", data.message);
        setPrompt(promptCopy);
      }
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message || // Custom message from backend
        error.message || // Fallback from Axios
        "Something went wrong while sending the prompt.";

      toast.error(errorMsg);
      setPrompt(promptCopy);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={sendPrompt}
      action=""
      className={`w-full ${
        selectedChat?.messages.length > 0 ? "max-w-3xl " : "max-w-2xl"
      } bg-white/80 p-4 rounded-3xl mt-4 transition-all`}
    >
      <textarea
        onKeyDown={handleKeyDown}
        rows={2}
        placeholder="Message Lunar"
        required
        className=" text-black outline-none w-full resize-none overflow-hidden break-words bg-transparent"
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
      />

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <p className="flex items-center gap-2 text-xs border text-gray-600 border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition">
            <Image src={assets.deepthink_icon} alt="" className="h-5 " />
            DeepThink (R1)
          </p>
          <p className="flex items-center gap-2 text-xs border text-gray-600 border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition">
            <Image src={assets.search_icon} alt="" className="h-5" />
            Search
          </p>
        </div>
        <div className="flex items-center gap-2 ">
          <Image src={assets.pin_icon} alt="" className="w-4 cursor-pointer" />
          <button
            className={`${
              prompt ? "bg-primary" : "bg-[#088ff0]"
            } rounded-full p-2 cursor-pointer`}
          >
            <Image
              src={prompt ? assets.arrow_icon : assets.arrow_icon_dull}
              alt=""
              className="w-3.5 aspect-square"
            />
          </button>
        </div>
      </div>
    </form>
  );
};

export default Promptbox;
