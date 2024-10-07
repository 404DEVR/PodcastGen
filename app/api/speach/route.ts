import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = await new URL(req.url);
  const text = searchParams.get("text");
  if (!text) {
    return new NextResponse(JSON.stringify({ error: "Text is required" }), {
      status: 400,
    });
  }

  try {
    const response = await axios.get(
      "https://text-to-speach-english.p.rapidapi.com/makevoice",
      {
        params: { text },
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
          "x-rapidapi-host": "text-to-speach-english.p.rapidapi.com",
        },
      }
    );

    const audioBuffer = Buffer.from(response.data);

    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": 'attachment; filename="speech.mp3"',
      },
    });
  } catch (error) {
    console.error("Error generating speech:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error generating speech" }),
      {
        status: 500,
      }
    );
  }
}
