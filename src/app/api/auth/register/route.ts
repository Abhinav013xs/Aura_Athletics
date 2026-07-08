import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if ((global as any).IS_MOCKED_DB) {
      const usersList = (global as any).mockStore.users;
      const existingUser = usersList.find((u: any) => u.email === email.toLowerCase());
      if (existingUser) {
        return NextResponse.json({ error: "Email is already registered" }, { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUserObj = {
        _id: "mock-user-" + Date.now(),
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role: "member",
        loyaltyPoints: 50,
        badges: ["Aura Recruit"],
        waterLogs: [],
        sleepLogs: [],
        measurements: []
      };
      usersList.push(newUserObj);

      const userReturn = { ...newUserObj };
      delete (userReturn as any).password;

      return NextResponse.json({ message: "User registered successfully (Mock Mode)", user: userReturn }, { status: 201 });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ error: "Email is already registered" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "member",
      loyaltyPoints: 50, // Starting loyalty bonus
      badges: ["Aura Recruit"],
    });

    const userObj = newUser.toObject();
    delete userObj.password;

    return NextResponse.json({ message: "User registered successfully", user: userObj }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Server Error" }, { status: 500 });
  }
}
