export const maxDuration = 60;
import { getAuth } from "@clerk/nextjs/server";
import OpenAI from "openai";
import { NextResponse } from "next/server";
import Chat from "@/models/Chat";
import connectDB from "@/config/db";


// Initialize Openai client with deepseek api key and base url
const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: process.env.DEEPSEEK_API_KEY,
});


export async function POST(req){
    try{
        const { userId } = getAuth(req);

        // Extract chatid and prompt from the request body
        const { chatId, prompt } = await req.json();

        if (!userId){

            return NextResponse.json({
                success: false,
                message: "User not authenticated",
            });
        }

        // Find the chat document in the database based on userId and chatId
        await connectDB();
        const data = await Chat.findOne({userId, _id: chatId})

        // Create a user message object
        const userPrompt={
            role: "user",
            content: prompt,
            timestamp: Date.now()
        };

        data.messages.push(userPrompt);

        // Call the Deepseek api to get a chat completion
        const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "deepseek-chat",
        store: true,
  });

        const message = completion.choices[0].message;
        message.timestamp = Date.now();
        data.messages.push(message);
        data.save();

        return NextResponse.json({success: true, data: message})

    } catch(error){
        return NextResponse.json({success: false, error: error.message });

    }
}