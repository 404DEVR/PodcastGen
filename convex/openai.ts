import { action } from "./_generated/server";
import { v } from "convex/values";

import OpenAI from "openai";
import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateAudioAction = action({
  args: { input: v.string(), voice: v.string() },
  handler: async (_, { voice, input }) => {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: voice as SpeechCreateParams["voice"],
      input,
    });

    const buffer = await mp3.arrayBuffer();
    console.log(buffer);

    return buffer;
    
  },
});

export const fetchSpeechDataAction = action({
  args: { text: v.string() },
  handler: async (_, { text }) => {
    try {
      const options = {
        method: "GET",
        url: `http://localhost:3000/api/speach`,
        params: { text: text },
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.request(options);

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = response.data;
      console.log("Fetched speech data:", data);

      return data;
    } catch (error: any) {
      console.error("Error fetching speech data:", error);
      throw new Error("Failed to fetch speech data");
    }
  },
});