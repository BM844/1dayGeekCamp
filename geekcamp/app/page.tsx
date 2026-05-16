"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { categories, menus } from "@/data/menus";

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
