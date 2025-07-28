// app/api/chat/send/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

// ✅ Use environment variable for security
const GEMINI_API_KEY = process.env.DEEPSEEK_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    const { prompt } = await req.json();

    if (!userId) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
    }

    if (!GEMINI_API_KEY) {
      return NextResponse.json({ success: false, message: "Gemini API key missing" }, { status: 500 });
    }

    const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent??key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!geminiRes.ok) {
      const err = await geminiRes.json();
      return NextResponse.json({ success: false, message: err.error?.message || "Gemini API error" }, { status: 500 });
    }

    const geminiData = await geminiRes.json();
    const message = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return NextResponse.json({ success: true, message });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Unexpected error" }, { status: 500 });
  }
}
