import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectMongo } from "@/lib/mongodb";
import { verifyJwt } from "@/lib/auth";

export async function GET(req) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyJwt(token);
    const client = await connectMongo();
    const users = client.db().collection("users");
    const user = await users.findOne({ _id: new ObjectId(payload.sub) });

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token." }, { status: 401 });
  }
}
