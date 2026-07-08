import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

const SEED_PRODUCTS = [
  {
    title: "Aura Premium Gold Whey Isolate",
    price: 4999,
    category: "supplement",
    benefits: "Ultra-fast absorption, 28g isolate protein per scoop, gold-dust infusion.",
    image: "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=600&auto=format&fit=crop",
    stock: 80,
    rating: 4.9,
    description: "A luxury grade protein isolate meticulously formulated for elite athletes. Contains high-concentration amino acids and micro-filtered whey peptides to maximize lean muscle synthesis and recovery.",
  },
  {
    title: "Aura Creatine Monohydrate (Micronized)",
    price: 1899,
    category: "supplement",
    benefits: "Enhances raw power output, cell hydration, and muscular hypertrophy.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop",
    stock: 120,
    rating: 4.8,
    description: "Pure micronized creatine monohydrate. Rapidly restores muscular ATP stores, maximizing explosive strength, power reps, and intramuscular cellular hydration for a fuller aesthetic.",
  },
  {
    title: "Carbon-Fiber Gym Duffle Bag",
    price: 3499,
    category: "merchandise",
    benefits: "Water-resistant, smart locker sizing, active-carbon ventilation compartment.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop",
    stock: 40,
    rating: 4.7,
    description: "Engineered with water-resistant carbon weave fabric. Includes smart partitions for laptops, lifting straps, dry clothes, and an active carbon ventilated shoe pocket to maintain absolute freshness.",
  },
  {
    title: "Aura Luxury Compression Tee - Stealth Black",
    price: 1499,
    category: "merchandise",
    benefits: "High-flex elastane blend, temperature adaptive, muscle highlight cut.",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=600&auto=format&fit=crop",
    stock: 150,
    rating: 4.9,
    description: "An ultra-premium compression t-shirt cut designed to highlight the chest, shoulders, and V-taper. Our thermal-mesh regulates body heat while delivering supreme flex for powerlifts.",
  },
  {
    title: "Matte Black Titanium Shaker Bottle",
    price: 1299,
    category: "accessory",
    benefits: "Double-walled vacuum insulation, leak-proof magnetic lock, odor resistant.",
    image: "https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?q=80&w=600&auto=format&fit=crop",
    stock: 90,
    rating: 4.8,
    description: "An odor-free double-walled insulated bottle that keeps your supplements ice-cold for 24 hours. Features a heavy-duty metallic finish and magnetic snap-closing cap.",
  }
];

export async function GET(request: Request) {
  try {
    await dbConnect();
    let products = await Product.find({});

    if (products.length === 0) {
      // Auto seed product catalog
      products = await Product.insertMany(SEED_PRODUCTS);
    }

    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to load products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const product = await Product.create(body);
    return NextResponse.json({ message: "Product created successfully", product }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to create product" }, { status: 500 });
  }
}
