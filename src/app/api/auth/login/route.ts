import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "aura-luxury-secret-key-100-crore";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    if ((global as any).IS_MOCKED_DB) {
      const usersList = (global as any).mockStore.users;
      const user = usersList.find((u: any) => u.email === email.toLowerCase());
      if (!user) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
      }

      const token = jwt.sign(
        { userId: user._id, role: user.role, email: user.email },
        JWT_SECRET,
        { expiresIn: "7d" }
      );

      const userReturn = { ...user };
      delete userReturn.password;

      return NextResponse.json({
        message: "Login successful (Mock Mode)",
        token,
        user: userReturn,
      }, { status: 200 });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userObj = user.toObject();
    delete userObj.password;

    return NextResponse.json({
      message: "Login successful",
      token,
      user: userObj,
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Server Error" }, { status: 500 });
  }
}
