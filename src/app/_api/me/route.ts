import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://develop.api.zighang.daehyeon.cloud";

export async function GET(request: NextRequest) {
  try {
    const authorization = request.headers.get("authorization");
    
    if (!authorization) {
      return NextResponse.json(
        { error: "Authorization header is required" },
        { status: 401 }
      );
    }

    const response = await fetch(`${API_BASE}/users/me`, {
      method: "GET",
      headers: {
        "accept": "application/json",
        "Authorization": authorization,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch user: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
