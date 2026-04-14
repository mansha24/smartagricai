import { NextRequest, NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { hashPassword } from "@/lib/auth";
import { Role } from "@/lib/types";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "").trim();
  const role = (String(body.role || "farmer") as Role) || "farmer";

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Name, email, and password are required." }, { status: 400 });
  }

  const client = await connectMongo();
  const users = client.db().collection("users");

  const existing = await users.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "A user with this email already exists." }, { status: 409 });
  }

  if (role === "admin") {
    const existingAdmin = await users.findOne({ role: "admin" });
    if (existingAdmin) {
      return NextResponse.json({ error: "Admin registration is restricted after initial setup." }, { status: 403 });
    }
  }

  const passwordHash = await hashPassword(password);
  const result = await users.insertOne({
    name,
    email,
    passwordHash,
    role,
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({
    message: "User registered successfully.",
    user: {
      id: result.insertedId.toString(),
      name,
      email,
      role,
    },
  });
}
