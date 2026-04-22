import { NextRequest, NextResponse } from "next/server";
import { connectMongo } from "@/lib/mongodb";
import { getBearerToken, verifyJwt } from "@/lib/auth";

export async function GET(req) {
  const token = getBearerToken(req.headers);
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = verifyJwt(token);
    if (payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const client = await connectMongo();
    const users = client.db().collection("users");
    const allUsers = await users
      .find({}, { projection: { passwordHash: 0 } })
      .toArray();

    return NextResponse.json({
      users: allUsers.map((user) => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      })),
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token." }, { status: 401 });
  }
}
