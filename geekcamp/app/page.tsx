"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { id: "sushi", name: "すし" },
  { id: "pizza", name: "ピザ" },
  { id: "drinks", name: "飲みもの" },
  { id: "dessert", name: "デザート" },
];

const menus: Record<string, { name: string; price: number }[]> = {
  sushi: [
    { name: "まぐろ", price: 180 },
    { name: "サーモン", price: 160 },
    { name: "えび", price: 150 },
    { name: "いくら", price: 220 },
  ],
  pizza: [
    { name: "マルゲリータ", price: 980 },
    { name: "ペペロニ", price: 1080 },
    { name: "クワトロフォルマッジ", price: 1180 },
    { name: "ビスマルク", price: 12000 },
    { name: "生ハムのルッコラ", price: 5000 },
  ],
  drinks: [
    { name: "コーラ", price: 280 },
    { name: "オレンジジュース", price: 300 },
    { name: "緑茶", price: 250 },
    { name: "ビール", price: 480 },
  ],
  dessert: [
    { name: "アイスクリーム", price: 350 },
    { name: "プリン", price: 280 },
    { name: "チーズケーキ", price: 420 },
  ],
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("sushi");
  const menuList = menus[selectedCategory];

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <header className="bg-white px-4 py-3 shadow-sm">
        <h1 className="text-xl font-bold">OSAKI亭</h1>
      </header>

      <nav className="flex border-b bg-white">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              selectedCategory === cat.id
                ? "border-b-2 border-primary text-primary"
                : "text-zinc-500"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </nav>

      <main className="mx-auto w-full max-w-md flex-1 p-4">
        <div className="flex flex-col gap-3">
          {menuList.map((item) => (
            <Card key={item.name}>
              <CardContent className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-zinc-500">¥{item.price.toLocaleString()}</p>
                </div>
                <Button size="sm">追加</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <div className="fixed bottom-4 right-4">
        <Button variant="secondary" size="lg">
          注文リスト
        </Button>
      </div>
    </div>
  );
}
