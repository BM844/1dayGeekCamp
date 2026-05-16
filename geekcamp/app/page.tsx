"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { categories, menus, type MenuItem } from "@/data/menus";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("sushi");
  const [orderList, setOrderList] = useState<MenuItem[]>([]);
  const [showOrder, setShowOrder] = useState(false);
  const menuList = menus[selectedCategory];

  const addToOrder = (item: MenuItem) => {
    setOrderList((prev) => [...prev, item]);
  };

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

      <main className="mx-auto w-full max-w-md flex-1 p-4 pb-20">
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
                <Button size="sm" disabled={!item.isAvailable} onClick={() => addToOrder(item)}>
                  {item.isAvailable ? "追加" : "売切"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* フローティング注文リストボタン */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => setShowOrder(true)}
          className="relative flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-lg"
        >
          注文リスト
          {orderList.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {orderList.length}
            </span>
          )}
        </button>
      </div>

      {/* 注文リストモーダル */}
      {showOrder && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white">
          <header className="flex items-center justify-between border-b px-4 py-3">
            <h2 className="text-lg font-bold">注文リスト</h2>
            <button onClick={() => setShowOrder(false)} className="text-zinc-500">
              ✕ 閉じる
            </button>
          </header>
          <div className="flex-1 overflow-y-auto p-4">
            {orderList.length === 0 ? (
              <p className="text-center text-zinc-400 mt-10">まだ何も追加されていません</p>
            ) : (
              <div className="flex flex-col gap-3">
                {orderList.map((item, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-3">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-zinc-500">¥{item.price.toLocaleString()}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2 text-lg font-bold">
                  <span>合計</span>
                  <span>¥{orderList.reduce((sum, item) => sum + item.price, 0).toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
