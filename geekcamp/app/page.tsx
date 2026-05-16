"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { id: "sushi", name: "すし", emoji: "🍣", image: "/images/sushi.png" },
  { id: "pizza", name: "ピザ", emoji: "🍕", image: "/images/pizza.png" },
  { id: "drinks", name: "飲みもの", emoji: "🥤", image: "/images/beverages.png" },
  { id: "dessert", name: "デザート", emoji: "🍰", image: "/images/dessert.png" },
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (selectedCategory) {
    const categoryName = categories.find((c) => c.id === selectedCategory)?.name;
    const menuList = menus[selectedCategory];

    return (
      <div className="flex min-h-screen flex-col bg-zinc-50">
        <header className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
          <button
            onClick={() => setSelectedCategory(null)}
            className="text-zinc-500 hover:text-zinc-700"
          >
            ← 戻る
          </button>
          <h1 className="text-lg font-bold">OSAKI亭 — {categoryName}</h1>
        </header>

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

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <header className="bg-white px-4 py-3 shadow-sm">
        <h1 className="text-xl font-bold">OSAKI亭</h1>
      </header>

      <main className="mx-auto w-full max-w-md flex-1 p-4">
        <p className="mb-4 text-sm text-zinc-500">カテゴリを選んでください</p>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <Card
              key={cat.id}
              className="cursor-pointer transition-all hover:ring-2 hover:ring-primary"
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.image ? (
                <Image
                  src={cat.image}
                  alt={cat.name}
                  width={400}
                  height={200}
                  className="w-full object-cover"
                />
              ) : (
                <CardContent className="flex flex-col items-center justify-center gap-2 py-8">
                  <span className="text-4xl">{cat.emoji}</span>
                </CardContent>
              )}
              <CardContent className="py-2 text-center font-medium">
                {cat.name}
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
