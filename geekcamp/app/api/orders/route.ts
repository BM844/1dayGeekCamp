import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  const rows = await sql`SELECT items, total FROM orders ORDER BY created_at`;
  const total = rows.reduce((sum: number, r) => sum + Number(r.total), 0);
  return NextResponse.json({ orders: rows, total });
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
