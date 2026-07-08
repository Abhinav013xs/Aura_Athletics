import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Trainer from "@/models/Trainer";

const SEED_TRAINERS = [
  {
    name: "Vikram Rathore",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=300&auto=format&fit=crop",
    experience: "12+ Years",
    specializations: ["Bodybuilding", "Strength Training", "Athletic Conditioning"],
    certifications: ["NSCA Certified Strength Specialist", "IFBB Pro Coach"],
    achievements: ["Mr. India Classic Bodybuilding Champion 2022", "Coached 500+ Transformation Clients"],
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    slots: ["08:00 AM", "10:00 AM", "04:00 PM", "06:00 PM", "08:00 PM"],
  },
  {
    name: "Sarah Jenkins",
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=300&auto=format&fit=crop",
    experience: "8+ Years",
    specializations: ["Pilates", "Yoga", "Mobility & Recovery"],
    certifications: ["Stott Pilates Certified Trainer", "RYT 500 Hour Yoga Alliance"],
    achievements: ["Founder of Aura Pilates System", "International Yoga Summit Speaker"],
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    slots: ["09:00 AM", "11:00 AM", "01:00 PM", "05:00 PM", "07:00 PM"],
  },
  {
    name: "Marcus Vance",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=300&auto=format&fit=crop",
    experience: "10+ Years",
    specializations: ["Powerlifting", "Olympic Weightlifting", "Kettlebell training"],
    certifications: ["USAW Olympic Coach Level 2", "IKFF Kettlebell Master"],
    achievements: ["National Squat Record Holder (315kg)", "Awwwards Fitness Coach of the Year 2025"],
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    slots: ["07:00 AM", "09:00 AM", "11:00 AM", "03:00 PM", "05:00 PM", "07:00 PM"],
  }
];

export async function GET() {
  try {
    await dbConnect();
    let trainers = await Trainer.find({});

    if (trainers.length === 0) {
      trainers = await Trainer.insertMany(SEED_TRAINERS);
    }

    return NextResponse.json(trainers);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to load trainers" }, { status: 500 });
  }
}
