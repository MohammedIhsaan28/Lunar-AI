export const maxDuration = 60;
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Chat from "@/models/Chat";
import connectDB from "@/config/db";

export async function POST(req) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          message: "Gemini API key is missing. Please add your API key.",
        },
        { status: 401 }
      );
    }

    const { userId } = getAuth(req);
    const { chatId, prompt } = await req.json();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User not authenticated",
        },
        { status: 401 }
      );
    }

    await connectDB();
    const data = await Chat.findOne({ userId, _id: chatId });

    if (!data) {
      return NextResponse.json(
        {
          success: false,
          message: "Chat not found",
        },
        { status: 404 }
      );
    }

    const userPrompt = {
      role: "user",
      content: prompt,
      timestamp: Date.now(),
    };

    data.messages.push(userPrompt);

    // Call Gemini API
    const geminiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        }),
      }
    );

    if (!geminiRes.ok) {
      const err = await geminiRes.json();
      throw new Error(err.error?.message || "Gemini API error");
    }

    const geminiData = await geminiRes.json();
    const message = {
      role: "assistant",
      content: geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "",
      timestamp: Date.now(),
    };

    data.messages.push(message);
    await data.save();

    return NextResponse.json({ success: true, data: message });

  } catch (error) {
    const errMessage = error?.message?.toLowerCase();

    if (errMessage?.includes("api key")) {
      return NextResponse.json({
        success: false,
        message: "Invalid or expired Gemini API key. Please check your Google Cloud subscription.",
      }, { status: 401 });
    }

    if (errMessage?.includes("insufficient") || errMessage?.includes("quota")) {
      return NextResponse.json({
        success: false,
        message: "Insufficient balance or quota in your Gemini API account.",
      }, { status: 402 });
    }

    return NextResponse.json({
      success: false,
      message: error.message || "Something went wrong.",
    }, { status: 500 });
  }
}