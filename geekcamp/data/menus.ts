export type MenuItem = {
  name: string;
  price: number;
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

export const menus: Record<string, MenuItem[]> = {
  sushi: [
    { name: "まぐろ", price: 180 },
    { name: "サーモン", price: 160 },
    { name: "えび", price: 150 },
    { name: "いくら", price: 220 },
    { name: "カリフォルニアロール", price: 1000 },
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
