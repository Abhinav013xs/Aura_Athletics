import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { userId, type, data } = body; // type: "water" | "sleep" | "measurements" | "attendance"

    if (!userId || !type || !data) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let updatedPoints = user.loyaltyPoints || 0;
    let earnedBadges = [...(user.badges || [])];

    const today = new Date().toISOString().split("T")[0];

    if (type === "water") {
      const amount = Number(data.amountMl);
      
      // Update water log
      const logIndex = user.waterLogs.findIndex((log: any) => log.date === today);
      if (logIndex > -1) {
        user.waterLogs[logIndex].amountMl += amount;
      } else {
        user.waterLogs.push({ date: today, amountMl: amount });
      }

      // Achievement: Drink 3 Liters (3000ml) in a day
      const totalToday = logIndex > -1 ? user.waterLogs[logIndex].amountMl : amount;
      if (totalToday >= 3000 && !earnedBadges.includes("Water Champion")) {
        earnedBadges.push("Water Champion");
        updatedPoints += 50; // 50 loyalty points bonus
      }
    } else if (type === "sleep") {
      const hours = Number(data.hours);
      
      const logIndex = user.sleepLogs.findIndex((log: any) => log.date === today);
      if (logIndex > -1) {
        user.sleepLogs[logIndex].hours = hours;
      } else {
        user.sleepLogs.push({ date: today, hours });
      }

      // Achievement: Log sleep
      if (!earnedBadges.includes("Rest Master")) {
        earnedBadges.push("Rest Master");
        updatedPoints += 20;
      }
    } else if (type === "measurements") {
      user.measurements.push({
        date: today,
        weightKg: Number(data.weightKg),
        bodyFatPct: data.bodyFatPct ? Number(data.bodyFatPct) : undefined,
        chestCm: data.chestCm ? Number(data.chestCm) : undefined,
        waistCm: data.waistCm ? Number(data.waistCm) : undefined,
        armsCm: data.armsCm ? Number(data.armsCm) : undefined,
      });

      // Achievement: Track body composition
      if (!earnedBadges.includes("Stat Tracker")) {
        earnedBadges.push("Stat Tracker");
        updatedPoints += 30;
      }
    } else if (type === "attendance") {
      const dateStr = String(data.date);
      if (!user.attendance.includes(dateStr)) {
        user.attendance.push(dateStr);
        updatedPoints += 15; // 15 points per session attendance

        // Milestone: 5 visits
        if (user.attendance.length >= 5 && !earnedBadges.includes("Consistent Beast")) {
          earnedBadges.push("Consistent Beast");
          updatedPoints += 100;
        }
      }
    }

    user.loyaltyPoints = updatedPoints;
    user.badges = earnedBadges;
    await user.save();

    return NextResponse.json({
      message: `${type.toUpperCase()} log updated successfully`,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        loyaltyPoints: user.loyaltyPoints,
        badges: user.badges,
        attendance: user.attendance,
        waterLogs: user.waterLogs,
        sleepLogs: user.sleepLogs,
        measurements: user.measurements,
      }
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update logs" }, { status: 500 });
  }
}
