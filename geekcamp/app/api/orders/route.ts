import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  const rows = await sql`SELECT COALESCE(SUM(total), 0) AS total FROM orders`;
  return NextResponse.json({ total: Number(rows[0].total) });
}

export async function DELETE() {
  await sql`DELETE FROM orders`;
  return NextResponse.json({ success: true });
}

export async function POST(request: Request) {
  const { items, total } = await request.json();

  await sql`
    INSERT INTO orders (items, total)
    VALUES (${JSON.stringify(items)}, ${total})
  `;

  return NextResponse.json({ success: true });
}
