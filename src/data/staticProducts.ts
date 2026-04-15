import tshirtBlack from "@/assets/products/tshirt-black.png";
import tshirtWhite from "@/assets/products/tshirt-white.png";

export type Category = "men" | "women" | "accessories";
export type Season = "summer" | "winter";

export interface StaticProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  category: Category;
  season: Season;
  tags: string[];
  inStock: boolean;
  isNew: boolean;
}

export const staticProducts: StaticProduct[] = [
  {
    id: "static-11",
    handle: "lostar-eclipse-tee",
    title: "LOSTAR Eclipse Tee",
    description: "Dark oversized tee featuring the iconic LOSTAR eclipse graphic. Premium heavyweight cotton with a relaxed drop-shoulder fit.",
    price: 850,
    currency: "EGP",
    image: tshirtBlack,
    category: "men",
    season: "summer",
    tags: ["tshirt", "graphic", "streetwear"],
    inStock: true,
    isNew: true,
  },
  {
    id: "static-12",
    handle: "lostar-legacy-tee",
    title: "LOSTAR Legacy Tee",
    description: "White oversized tee with the signature LOSTAR boy graphic and script logo. Premium cotton with a vintage-inspired wash.",
    price: 850,
    currency: "EGP",
    image: tshirtWhite,
    category: "men",
    season: "summer",
    tags: ["tshirt", "graphic", "streetwear"],
    inStock: true,
    isNew: true,
  },
];

export function getProductsByCategory(category: Category): StaticProduct[] {
  return staticProducts.filter((p) => p.category === category);
}

export function getNewProducts(): StaticProduct[] {
  return staticProducts.filter((p) => p.isNew);
}

export function getProductsBySeason(season: Season): StaticProduct[] {
  return staticProducts.filter((p) => p.season === season);
}

export function getProductByHandle(handle: string): StaticProduct | undefined {
  return staticProducts.find((p) => p.handle === handle);
}
