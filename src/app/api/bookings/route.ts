import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Booking from "@/models/Booking";
import nodemailer from "nodemailer";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    let query = {};
    if (email) {
      query = { email: email.toLowerCase() };
    }

    const bookings = await Booking.find(query).populate("trainerId").sort({ createdAt: -1 });
    return NextResponse.json(bookings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to retrieve bookings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { userId, name, email, phone, program, trainerId, date, timeSlot, amount } = body;

    if (!name || !email || !phone || !program || !date || !timeSlot) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newBooking = await Booking.create({
      userId: userId || null,
      name,
      email: email.toLowerCase(),
      phone,
      program,
      trainerId: trainerId || null,
      date,
      timeSlot,
      amount: amount || 0,
      status: "confirmed", // Auto confirm in this luxury showcase
      paymentStatus: amount > 0 ? "paid" : "pending",
    });

    // Send confirmation email via mock or real transporter
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.ethereal.email",
        port: Number(process.env.SMTP_PORT) || 587,
        auth: {
          user: process.env.SMTP_USER || "mockuser",
          pass: process.env.SMTP_PASS || "mockpass",
        },
      });

      const mailOptions = {
        from: '"Aura Athletics" <noreply@auraathletics.com>',
        to: email,
        subject: `Your Luxury Fitness Slot is CONFIRMED - ${program}`,
        html: `
          <div style="background-color:#050505; color:#ffffff; padding:40px; font-family:'Helvetica Neue', Arial, sans-serif; border: 1px solid #D4AF37;">
            <h1 style="color:#D4AF37; font-size:32px; letter-spacing:2px; text-transform:uppercase; margin-bottom:20px;">Aura Athletics</h1>
            <p style="font-size:16px; line-height:1.6;">Dear ${name},</p>
            <p style="font-size:16px; line-height:1.6;">Your booking at Aura Athletics is officially confirmed. We have reserved a premium slot for you.</p>
            
            <div style="background-color:rgba(255,255,255,0.05); padding:20px; border-left:4px solid #D4AF37; margin:30px 0;">
              <p style="margin:5px 0;"><strong>Program:</strong> ${program}</p>
              <p style="margin:5px 0;"><strong>Date:</strong> ${date}</p>
              <p style="margin:5px 0;"><strong>Time Slot:</strong> ${timeSlot}</p>
              <p style="margin:5px 0;"><strong>Ambience Level:</strong> Ultra-Luxury Private Training</p>
            </div>

            <p style="font-size:14px; color:#888;">Please arrive 10 minutes before your slot. Valet parking and luxury lockers with steam accessories will be prepared for you.</p>
            <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin:35px 0;" />
            <p style="font-size:12px; color:#D4AF37; text-align:center;">AURA ATHLETICS • THE APEX OF MODERN FITNESS</p>
          </div>
        `,
      };

      // In real scenario we would send, but if mock credential fails we skip without crashing
      await transporter.sendMail(mailOptions).catch(() => console.log("SMTP configurations are default. Skipping SMTP mail delivery."));
    } catch (mailError) {
      console.log("Email service failed to deliver booking mail. Continuing booking success response.");
    }

    return NextResponse.json({ message: "Booking confirmed", booking: newBooking }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Booking failed" }, { status: 500 });
  }
}
