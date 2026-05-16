import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: Request) {
  const { items, total } = await request.json();

  await sql`
    INSERT INTO orders (items, total)
    VALUES (${JSON.stringify(items)}, ${total})
  `;

  return NextResponse.json({ success: true });
}
