import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { prompt } = await request.json();

  const options = {
    method: "POST",
    url: "https://text-to-image13.p.rapidapi.com/",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY, 
      "x-rapidapi-host": "text-to-image13.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      prompt: prompt || "cyberpunk cat",
    },
  };

  try {
    const response = await axios.request(options);
    return NextResponse.json(response.data); 
  } catch (error) {
    console.error(error);
    return NextResponse.error(); 
  }
}
