import heroImage from "@/assets/hero-model.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "sneakers" | "canvas" | "slides" | "limited";
  sizes: string[];
  colors: string[];
  isLimitedDrop: boolean;
  dropEndsAt?: string;
  isSoldOut: boolean;
  description: string;
};

export const defaultProducts: Product[] = [
  { id: "1", name: "AF1 Triple Dark", price: 45000, image: heroImage, category: "sneakers", sizes: ["39","40","41","42","43","44"], colors: ["All Black"], isLimitedDrop: true, dropEndsAt: new Date(Date.now() + 2*24*60*60*1000).toISOString(), isSoldOut: false, description: "All-black Air Force 1 low. Clean, minimal, no noise." },
  { id: "2", name: "Low Rider Canvas", price: 18000, image: heroImage, category: "canvas", sizes: ["39","40","41","42","43","44"], colors: ["Black","White","Cream"], isLimitedDrop: false, isSoldOut: false, description: "Everyday canvas low-top. Lightweight, breathable, goes with everything." },
  { id: "3", name: "Summer Slide OG", price: 12000, image: heroImage, category: "slides", sizes: ["39","40","41","42","43","44"], colors: ["Black","White"], isLimitedDrop: false, isSoldOut: false, description: "Thick-sole slides for the boys. Soft footbed, bold strap." },
  { id: "4", name: "Thrift Runner Vol.1", price: 22000, image: heroImage, category: "sneakers", sizes: ["40","41","42","43","44"], colors: ["Grey","White"], isLimitedDrop: false, isSoldOut: false, description: "Vintage runner pull from the thrift vault. Move fast." },
  { id: "5", name: "High Canvas Motion", price: 20000, image: heroImage, category: "canvas", sizes: ["39","40","41","42","43"], colors: ["Black","Navy"], isLimitedDrop: false, isSoldOut: false, description: "High-top canvas with a clean silhouette. Streets-ready." },
  { id: "6", name: "Nike Thrift Find", price: 35000, image: heroImage, category: "sneakers", sizes: ["41","42","43"], colors: ["White/Black"], isLimitedDrop: true, dropEndsAt: new Date(Date.now() + 1*24*60*60*1000).toISOString(), isSoldOut: false, description: "Authenticated Nike thrift pick. Barely worn, excellent condition." },
  { id: "7", name: "Pool Slides Thick", price: 9500, image: heroImage, category: "slides", sizes: ["39","40","41","42","43","44"], colors: ["Black","White"], isLimitedDrop: false, isSoldOut: false, description: "Bold chunky slides. Built for after-match and lazy Sunday." },
  { id: "8", name: "Adidas Thrift Collab", price: 38000, image: heroImage, category: "sneakers", sizes: ["40","41","42"], colors: ["Triple White"], isLimitedDrop: true, dropEndsAt: new Date(Date.now() + 3*24*60*60*1000).toISOString(), isSoldOut: false, description: "Clean Adidas pull from the vault. Fresh, no creases." },
  { id: "9", name: "Street Canvas Low", price: 15000, image: heroImage, category: "canvas", sizes: ["39","40","41","42","43","44"], colors: ["Olive","Black"], isLimitedDrop: false, isSoldOut: false, description: "Olive canvas low with rubber sole. Lagos-ready." },
  { id: "10", name: "Motion Slide Lite", price: 8000, image: heroImage, category: "slides", sizes: ["39","40","41","42","43","44"], colors: ["Black"], isLimitedDrop: false, isSoldOut: false, description: "Lightweight foam slide. The everyday grab-and-go." },
  { id: "11", name: "Vintage Runner Find", price: 28000, image: heroImage, category: "sneakers", sizes: ["40","42","43"], colors: ["Beige/Brown"], isLimitedDrop: false, isSoldOut: false, description: "Y2K-era runner pulled from the thrift game." },
  { id: "12", name: "Canvas Hi Motion", price: 21000, image: heroImage, category: "canvas", sizes: ["39","40","41","42","43"], colors: ["White","Black"], isLimitedDrop: false, isSoldOut: false, description: "Premium canvas high-top. Clean stitching, padded collar." },
  { id: "13", name: "Boys Slide Premium", price: 14000, image: heroImage, category: "slides", sizes: ["39","40","41","42","43","44"], colors: ["Black/White"], isLimitedDrop: false, isSoldOut: false, description: "Two-tone premium slides. Contoured sole, non-slip base." },
  { id: "14", name: "Limited Drop 001", price: 55000, image: heroImage, category: "limited", sizes: ["40","41","42","43"], colors: ["All Black"], isLimitedDrop: true, dropEndsAt: new Date(Date.now() + 4*24*60*60*1000).toISOString(), isSoldOut: false, description: "First ever Motion Boys limited drop. When it's gone, it's gone." },
  { id: "15", name: "Thrift Grail Vol.2", price: 42000, image: heroImage, category: "limited", sizes: ["41","42"], colors: ["Bred Colourway"], isLimitedDrop: true, dropEndsAt: new Date(Date.now() + 5*24*60*60*1000).toISOString(), isSoldOut: false, description: "Rare thrift grail. Black and red colourway, clean condition." },
];

let _products: Product[] = [...defaultProducts];
let _listeners: (() => void)[] = [];

export const productStore = {
  getProducts: () => _products,
  subscribe: (fn: () => void) => {
    _listeners.push(fn);
    return () => { _listeners = _listeners.filter((l) => l !== fn); };
  },
};

import { useSyncExternalStore } from "react";
export function useProducts() {
  return useSyncExternalStore(productStore.subscribe, productStore.getProducts);
}
