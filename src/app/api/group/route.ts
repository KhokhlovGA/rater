import { NextRequest } from "next/server";
import { db } from "~/server/db";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;  
  const page = Number(searchParams.get("page")) || 1;
  const size = Number(searchParams.get("size")) || 3;
  const groups = await db.group.findMany({
    skip: (page - 1) * size,
    take: size,
  });
  return new Response(JSON.stringify(groups), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}