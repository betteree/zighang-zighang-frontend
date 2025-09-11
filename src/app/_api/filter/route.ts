import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://develop.api.zighang.daehyeon.cloud";

export async function POST(request: NextRequest) {
  try {
    const authorization = request.headers.get("authorization");
    
    if (!authorization) {
      return NextResponse.json(
        { error: "Authorization header is required" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const requestData = formData.get("request") as string;
    const resumeFile = formData.get("resumeFile") as File | null;

    if (!requestData) {
      return NextResponse.json(
        { error: "Request part is missing" },
        { status: 400 }
      );
    }

    // 항상 FormData로 전송
    const newFormData = new FormData();
    const blob = new Blob([requestData], { type: 'application/json' });
    newFormData.append("request", blob, "request.json");
    
    // 파일이 있는 경우에만 resumeFile 추가
    if (resumeFile) {
      newFormData.append("resumeFile", resumeFile);
    }

    const response = await fetch(`${API_BASE}/users/filter`, {
      method: "POST",
      headers: {
        "Authorization": authorization,
      },
      body: newFormData,
      credentials: "omit", // 쿠키 전송 방지
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to update user filter: ${response.status}` },
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
