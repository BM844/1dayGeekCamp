export type MenuItem = {
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

export const menus: Record<string, MenuItem[]> = {
  sushi: [
    {
      name: "まぐろ",
      price: 180,
      description: "新鮮な本まぐろの握り",
      image: "/images/maguro.png",
      category: "sushi",
      isAvailable: true,
      allergens: ["魚"],
    },
    {
      name: "サーモン",
      price: 160,
      description: "とろけるノルウェーサーモンの握り",
      image: "/images/salmon.png",
      category: "sushi",
      isAvailable: true,
      allergens: ["魚"],
    },
    {
      name: "えび",
      price: 150,
      description: "ぷりぷりのボイルえびの握り",
      image: "/images/shrimp.png",
      category: "sushi",
      isAvailable: true,
      allergens: ["甲殻類"],
    },
    {
      name: "いくら",
      price: 220,
      description: "濃厚な味わいのいくら軍艦",
      category: "sushi",
      isAvailable: true,
      allergens: ["魚卵"],
    },
    {
      name: "カリフォルニアロール",
      price: 1000,
      description: "アボカドとカニカマの定番ロール",
      category: "sushi",
      isAvailable: true,
      allergens: ["甲殻類", "卵"],
    },
  ],
  pizza: [
    {
      name: "マルゲリータ",
      price: 980,
      description: "迷ったらこれ",
      image: "/images/margherita.png",
      category: "pizza",
      isAvailable: true,
      allergens: ["小麦", "乳"],
    },
    {
      name: "ペペロニ",
      price: 1080,
      description: "アメリカ！",
      category: "pizza",
      isAvailable: true,
      allergens: ["小麦", "乳", "豚肉"],
    },
    {
      name: "クワトロフォルマッジ",
      price: 1180,
      description: "4種のチーズを贅沢に使った濃厚ピザ",
      category: "pizza",
      isAvailable: true,
      allergens: ["小麦", "乳"],
    },
    {
      name: "ビスマルク",
      price: 12000,
      description: "これだけ窯で焼いてます",
      category: "pizza",
      isAvailable: true,
      allergens: ["小麦", "乳", "卵"],
    },
    {
      name: "生ハムのルッコラ",
      price: 5000,
      description: "生ハムとルッコラの上品な組み合わせ",
      category: "pizza",
      isAvailable: true,
      allergens: ["小麦", "乳", "豚肉"],
    },
  ],
  drinks: [
    {
      name: "コーラ",
      price: 280,
      description: "冷たく爽快な定番炭酸飲料",
      category: "drinks",
      isAvailable: true,
      allergens: [],
    },
    {
      name: "オレンジジュース",
      price: 300,
      description: "搾りたて風フレッシュオレンジ",
      category: "drinks",
      isAvailable: true,
      allergens: [],
    },
    {
      name: "緑茶",
      price: 250,
      description: "すっきりとした国産緑茶",
      category: "drinks",
      isAvailable: true,
      allergens: [],
    },
    {
      name: "ビール",
      price: 480,
      description: "キンキンに冷えた生ビール",
      category: "drinks",
      isAvailable: true,
      allergens: ["小麦"],
    },
  ],
  dessert: [
    {
      name: "アイスクリーム",
      price: 350,
      description: "なめらかなバニラアイスクリーム",
      category: "dessert",
      isAvailable: true,
      allergens: ["乳", "卵"],
    },
    {
      name: "プリン",
      price: 280,
      description: "とろとろ食感の昔ながらのプリン",
      category: "dessert",
      isAvailable: true,
      allergens: ["乳", "卵"],
    },
    {
      name: "チーズケーキ",
      price: 420,
      description: "濃厚ニューヨークスタイルのチーズケーキ",
      category: "dessert",
      isAvailable: true,
      allergens: ["乳", "卵", "小麦"],
    },
  ],
};
