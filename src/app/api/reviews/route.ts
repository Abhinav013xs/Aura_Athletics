import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Review from "@/models/Review";

const SEED_REVIEWS = [
  {
    name: "Ranveer Singh",
    rating: 5,
    comment: "The absolute pinnacle of luxury fitness. The customized AI plans, premium trainers, and recovery zone steam rooms are world-class. Worth every single rupee.",
    program: "Elite Personal Training",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
  },
  {
    name: "Aishwarya Sen",
    rating: 5,
    comment: "Aura Athletics is not just a gym; it's a wellness sanctuary. The training staff is highly qualified, and the customized diet recommendation engine completely transformed my routines.",
    program: "Weight Loss & Pilates",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
  },
  {
    name: "Kabir Malhotra",
    rating: 5,
    comment: "The custom lighting, cinematic design, and smart lockers feel like a luxury sports car showroom. Incredible vibes for serious lifting.",
    program: "Strength & Powerlifting",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
  }
];

export async function GET() {
  try {
    await dbConnect();
    let reviews = await Review.find({ isAdminApproved: true });

    if (reviews.length === 0) {
      reviews = await Review.insertMany(SEED_REVIEWS);
    }

    return NextResponse.json(reviews);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to load reviews" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, rating, comment, program } = body;

    if (!name || !rating || !comment) {
      return NextResponse.json({ error: "Name, rating, and comment are required" }, { status: 400 });
    }

    const review = await Review.create({
      name,
      rating: Number(rating),
      comment,
      program: program || "General Fitness",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop", // Default avatar
      isAdminApproved: true,
    });

    return NextResponse.json({ message: "Review added successfully", review }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to post review" }, { status: 500 });
  }
}
