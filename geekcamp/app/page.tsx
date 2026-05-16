"use client";

import { useState } from "react";
import Image from "next/image";
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
            <Card key={item.name} className={!item.isAvailable ? "opacity-50" : ""}>
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.name}
                  width={400}
                  height={200}
                  className="w-full object-cover"
                />
              )}
              <CardContent className="flex items-center justify-between py-3">
                <div className="flex-1 pr-3">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-zinc-400">{item.description}</p>
                  <p className="mt-1 text-sm text-zinc-500">¥{item.price.toLocaleString()}</p>
                </div>
                <Button size="sm" disabled={!item.isAvailable}>
                  {item.isAvailable ? "追加" : "売切"}
                </Button>
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
