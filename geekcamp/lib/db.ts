import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  image?: string;
  category: string;
  isAvailable: boolean;
  allergens: string[];
};

export type Category = {
  id: string;
  name: string;
};

export const categories: Category[] = [
  { id: "sushi", name: "すし" },
  { id: "pizza", name: "ピザ" },
  { id: "drinks", name: "飲みもの" },
  { id: "dessert", name: "デザート" },
];

export async function getMenusByCategory(): Promise<Record<string, MenuItem[]>> {
  const rows = await sql`
    SELECT id, name, price, description, image, category, is_available, allergens
    FROM menu_items
    ORDER BY id
  `;

  const result: Record<string, MenuItem[]> = {};
  for (const row of rows) {
    const cat = row.category as string;
    if (!result[cat]) result[cat] = [];
    result[cat].push({
      id: row.id as number,
      name: row.name as string,
      price: row.price as number,
      description: row.description as string,
      image: row.image as string | undefined,
      category: cat,
      isAvailable: row.is_available as boolean,
      allergens: row.allergens as string[],
    });
  }
  return result;
}
