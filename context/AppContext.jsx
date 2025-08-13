"use client";

import { useUser, useAuth } from "@clerk/nextjs";
import axios from "axios";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const { user, isLoaded } = useUser(); // ✅ added isLoaded
  const { getToken } = useAuth();
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  // ✅ to avoid infinite loop
  const hasCreatedChatRef = useRef(false);

  const createNewChat = async () => {
    try {
      if (!user) return null;

      const token = await getToken();
      if (!token) {
        toast.error("Authentication token not found.");
        return;
      }

      await axios.post(
        "/api/chat/create",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchUsersChats();
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const fetchUsersChats = async () => {
    try {
      const token = await getToken();
      if (!token) {
        toast.error("Authentication token not found.");
        return;
      }

      const { data } = await axios.get("/api/chat/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        if (data.data.length === 0 && !hasCreatedChatRef.current) {
          hasCreatedChatRef.current = true; // ✅ prevent multiple creations
          await createNewChat();
          return;
        }

        // Sort by last updated
        const sortedChats = [...data.data].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );

        setChats(sortedChats);
        setSelectedChat(sortedChats[0]);
      } else {
        toast.error(data.message || "Failed to fetch chats.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    // ✅ Only run when Clerk is loaded & user exists
    if (isLoaded && user) {
      fetchUsersChats();
    }
  }, [isLoaded, user]);

  const value = {
    user,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    fetchUsersChats,
    createNewChat,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
