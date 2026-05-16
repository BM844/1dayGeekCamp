import { getMenusByCategory, categories } from "@/lib/db";
import MenuClient from "./menu-client";

export default async function Home() {
  const menus = await getMenusByCategory();
  return <MenuClient categories={categories} menus={menus} />;
}
