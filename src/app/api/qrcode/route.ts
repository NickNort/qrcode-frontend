import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Read API_URL from environment variable, default to http://localhost:8080
    const apiUrl = process.env.API_URL || "http://localhost:8080";
    
    // Parse the incoming request body
    const body = await request.json();
    
    // Transform form data to API schema
    const apiPayload: {
      content: string;
      finder_center?: string;
      finder_frame?: string;
      module_shape?: string;
      background_color?: string;
      foreground_color?: string;
    } = {
      content: body.qrData,
    };
    
    // Add optional fields if they exist
    if (body.finderCenter) {
      apiPayload.finder_center = body.finderCenter;
    }
    if (body.finderFrame) {
      apiPayload.finder_frame = body.finderFrame;
    }
    if (body.moduleShape) {
      apiPayload.module_shape = body.moduleShape;
    }
    if (body.backgroundColor || body.bg) {
      apiPayload.background_color = body.backgroundColor || body.bg;
    }
    if (body.foregroundColor || body.fg) {
      apiPayload.foreground_color = body.foregroundColor || body.fg;
    }
    
    // Make POST request to external API
    const response = await fetch(`${apiUrl}/qr`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiPayload),
    });
    
    // Handle non-OK responses
    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: errorText || "API request failed" },
        { status: response.status }
      );
    }
    
    // Get the SVG response
    const svg = await response.text();
    
    // Return SVG with appropriate content-type
    return new NextResponse(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml",
      },
    });
  } catch (error) {
    // Handle errors
    console.error("Error calling external API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

