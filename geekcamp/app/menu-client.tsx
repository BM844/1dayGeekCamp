"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { type MenuItem, type Category } from "@/lib/db";

export default function MenuClient({
  categories,
  menus,
}: {
  categories: Category[];
  menus: Record<string, MenuItem[]>;
}) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id ?? "");
  const [orderList, setOrderList] = useState<MenuItem[]>([]);
  const [showOrder, setShowOrder] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutTotal, setCheckoutTotal] = useState<number | null>(null);
  const [peopleInput, setPeopleInput] = useState("1");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [ordering, setOrdering] = useState(false);
  const [callingStaff, setCallingStaff] = useState(false);
  const menuList = menus[selectedCategory] ?? [];

  const addToOrder = (item: MenuItem) => {
    if (!item.isAvailable) {
      setErrorMessage(`「${item.name}」は現在品切れです`);
      setTimeout(() => setErrorMessage(null), 3000);
      return;
    }
    setOrderList((prev) => [...prev, item]);
  };

  const total = orderList.reduce((sum, item) => sum + item.price, 0);

  const grouped = orderList.reduce<{ item: MenuItem; count: number }[]>((acc, item) => {
    const existing = acc.find((g) => g.item.name === item.name);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ item, count: 1 });
    }
    return acc;
  }, []);

  // 注文を確定してDBに送信
  const confirmOrder = async () => {
    if (orderList.length === 0) return;
    setOrdering(true);
    await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: grouped, total }),
    });
    setOrdering(false);
    setOrderList([]);
    setShowOrder(false);
    setSuccessMessage("ご注文ありがとうございました！");
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  // お会計ボタン：DBから今までの全注文合計を取得
  const openCheckout = async () => {
    const res = await fetch("/api/orders");
    const data = await res.json();
    setCheckoutTotal(data.total);
    setShowCheckout(true);
  };

  // 会計確定
  const confirmCheckout = () => {
    setShowCheckout(false);
    setCallingStaff(true);
  };

  const people = Math.max(1, Number(peopleInput) || 1);
  const perPerson = checkoutTotal !== null ? Math.ceil(checkoutTotal / people) : 0;

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <header className="bg-white px-4 py-3 shadow-sm">
        <h1 className="text-xl font-bold">OSAKI亭</h1>
      </header>

      {/* エラートースト */}
      {errorMessage && (
        <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-red-500 px-4 py-2 text-sm text-white shadow-lg">
          {errorMessage}
        </div>
      )}

      {/* 注文完了トースト */}
      {successMessage && (
        <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-green-500 px-4 py-2 text-sm text-white shadow-lg">
          {successMessage}
        </div>
      )}

      {/* 店員を呼んでいる画面 */}
      {callingStaff && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white gap-6 p-8">
          <p className="text-5xl">🔔</p>
          <p className="text-2xl font-bold">スタッフがお伺いいたします。</p>
          <p className="text-zinc-500 text-center">しばらくお待ちください</p>
          <Button variant="outline" onClick={() => setCallingStaff(false)}>
            閉じる
          </Button>
        </div>
      )}

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

      <main className="mx-auto w-full max-w-md flex-1 p-4 pb-28">
        <div className="flex flex-col gap-3">
          {menuList.map((item) => (
            <Card key={item.id} className={!item.isAvailable ? "opacity-50" : ""}>
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
                <Button
                  size="sm"
                  variant={item.isAvailable ? "default" : "outline"}
                  onClick={() => addToOrder(item)}
                >
                  {item.isAvailable ? "追加" : "売切"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* フローティングボタン */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 items-end">
        <button
          onClick={openCheckout}
          className="flex items-center gap-2 rounded-full bg-zinc-700 px-5 py-3 text-sm font-medium text-white shadow-lg"
        >
          お会計
        </button>
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
            {grouped.length === 0 ? (
              <p className="text-center text-zinc-400 mt-10">まだ何も追加されていません</p>
            ) : (
              <div className="flex flex-col gap-3">
                {grouped.map(({ item, count }) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-3">
                    <span className="font-medium">
                      {item.name}
                      <span className="ml-1 text-sm text-zinc-400">×{count}</span>
                    </span>
                    <span className="text-zinc-500">¥{(item.price * count).toLocaleString()}</span>
                  </div>
                ))}
                <Button
                  className="mt-4 w-full"
                  size="lg"
                  onClick={confirmOrder}
                  disabled={ordering}
                >
                  {ordering ? "送信中..." : "注文を確定する"}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* お会計モーダル */}
      {showCheckout && checkoutTotal !== null && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white">
          <header className="flex items-center justify-between border-b px-4 py-3">
            <h2 className="text-lg font-bold">お会計</h2>
            <button onClick={() => setShowCheckout(false)} className="text-zinc-500">
              ✕ 閉じる
            </button>
          </header>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between rounded-xl bg-zinc-50 p-4 text-2xl font-bold">
                <span>合計</span>
                <span>¥{checkoutTotal.toLocaleString()}</span>
              </div>
              <div className="rounded-xl bg-zinc-50 p-4">
                <p className="mb-2 text-sm font-medium text-zinc-600">割り勘</p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min={1}
                    value={peopleInput}
                    onChange={(e) => setPeopleInput(e.target.value)}
                    onBlur={() => setPeopleInput(String(people))}
                    className="w-16 rounded-lg border px-2 py-1 text-center text-sm"
                  />
                  <span className="text-sm text-zinc-500">人で割ると</span>
                  <span className="font-bold">¥{perPerson.toLocaleString()}</span>
                  <span className="text-sm text-zinc-500">/人</span>
                </div>
              </div>
              <Button className="w-full" size="lg" onClick={confirmCheckout}>
                会計を確定する
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
