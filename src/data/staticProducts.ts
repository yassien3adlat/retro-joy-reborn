import vneckSweater from "@/assets/products/vneck-sweater.png";
import adidasSamba from "@/assets/products/adidas-samba.png";
import zipKnitJacket from "@/assets/products/zip-knit-jacket.png";
import poloCableKnitQuarterZip from "@/assets/products/polo-cable-knit-quarter-zip.png";
import flagSweater from "@/assets/products/flag-sweater.png";
import poloQuarterZipWhite from "@/assets/products/polo-quarter-zip-white.png";
import poloShirtNavy from "@/assets/products/polo-shirt-navy.png";
import linenPantsMen from "@/assets/products/linen-pants-men.png";
import linenPantsWomen from "@/assets/products/linen-pants-women.png";

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
    id: "static-2",
    handle: "oversized-vneck-sweater",
    title: "Oversized V-Neck Sweater",
    description: "Luxuriously soft oversized V-neck sweater with balloon sleeves. Perfect for layering or wearing on its own for an effortlessly chic look.",
    price: 1890,
    currency: "EGP",
    image: vneckSweater,
    category: "women",
    season: "winter",
    tags: ["knitwear", "sweater", "oversized"],
    inStock: true,
    isNew: true,
  },
  {
    id: "static-3",
    handle: "adidas-samba-navy",
    title: "Adidas Samba OG — Navy",
    description: "The iconic Adidas Samba in deep navy suede with signature three stripes and gold foil branding. A heritage sneaker redefined for modern style.",
    price: 3200,
    currency: "EGP",
    image: adidasSamba,
    category: "men",
    season: "summer",
    tags: ["sneakers", "shoes", "classic"],
    inStock: true,
    isNew: false,
  },
  {
    id: "static-4",
    handle: "zip-up-knit-jacket",
    title: "Zip-Up Knit Jacket",
    description: "Relaxed-fit ribbed knit jacket with a half-zip collar. Crafted from a soft wool blend for warmth and sophistication.",
    price: 2100,
    currency: "EGP",
    image: zipKnitJacket,
    category: "women",
    season: "winter",
    tags: ["knitwear", "jacket", "outerwear"],
    inStock: true,
    isNew: false,
  },
  {
    id: "static-5",
    handle: "polo-cable-knit-quarter-zip",
    title: "Polo Cable Knit Quarter-Zip",
    description: "Premium cable-knit quarter-zip sweater in cream. A refined layering piece with the iconic polo horse embroidery.",
    price: 2650,
    currency: "EGP",
    image: poloCableKnitQuarterZip,
    category: "men",
    season: "winter",
    tags: ["knitwear", "sweater", "classic"],
    inStock: true,
    isNew: true,
  },
  {
    id: "static-6",
    handle: "flag-crewneck-sweater",
    title: "Flag Crewneck Sweater",
    description: "Iconic American flag intarsia-knit crewneck sweater in cream cotton. A heritage piece that celebrates timeless Americana.",
    price: 2900,
    currency: "EGP",
    image: flagSweater,
    category: "men",
    season: "winter",
    tags: ["knitwear", "sweater", "iconic"],
    inStock: true,
    isNew: true,
  },
  {
    id: "static-7",
    handle: "polo-quarter-zip-jersey",
    title: "Polo Quarter-Zip Jersey",
    description: "Clean white quarter-zip jersey pullover with tonal polo embroidery. Lightweight and versatile for effortless layering.",
    price: 1950,
    currency: "EGP",
    image: poloQuarterZipWhite,
    category: "men",
    season: "winter",
    tags: ["jersey", "pullover", "minimal"],
    inStock: true,
    isNew: false,
  },
  {
    id: "static-8",
    handle: "polo-classic-fit-mesh-navy",
    title: "Polo Classic Fit Mesh Polo — Navy",
    description: "The iconic Polo Ralph Lauren classic fit mesh polo shirt in refined navy. Soft cotton mesh with signature red pony embroidery for timeless everyday elegance.",
    price: 1750,
    currency: "EGP",
    image: poloShirtNavy,
    category: "men",
    season: "summer",
    tags: ["polo", "shirt", "classic"],
    inStock: true,
    isNew: true,
  },
  {
    id: "static-9",
    handle: "linen-drawstring-pants-men",
    title: "Linen Drawstring Pants — White",
    description: "Relaxed-fit white linen drawstring pants. Lightweight and breathable for effortless summer style.",
    price: 1650,
    currency: "EGP",
    image: linenPantsMen,
    category: "men",
    season: "summer",
    tags: ["pants", "linen", "summer"],
    inStock: true,
    isNew: true,
  },
  {
    id: "static-10",
    handle: "linen-wide-leg-pants-women",
    title: "Linen Wide-Leg Pants — Cream",
    description: "Flowing wide-leg linen pants in natural cream with an elastic drawstring waist. The perfect warm-weather essential.",
    price: 1750,
    currency: "EGP",
    image: linenPantsWomen,
    category: "women",
    season: "summer",
    tags: ["pants", "linen", "summer"],
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
