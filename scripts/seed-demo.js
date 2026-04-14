const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });

const uri = process.env.MONGODB_URI;
const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "4h";

if (!uri) {
  throw new Error("MONGODB_URI is required in .env.local");
}
if (!jwtSecret) {
  throw new Error("JWT_SECRET is required in .env.local");
}

const demoUsers = [
  { name: "Admin User", email: "admin@smartagri.local", password: "Admin123!", role: "admin" },
  { name: "Farm Operator", email: "farmer@smartagri.local", password: "Farmer123!", role: "farmer" },
  { name: "Field Specialist", email: "userfarmer@smartagri.local", password: "UserFarmer123!", role: "userfarmer" },
];

async function main() {
  const client = new MongoClient(uri, { appName: "SmartAgriAI Seed" });
  await client.connect();

  const db = client.db();
  const users = db.collection("users");

  console.log("Seeding demo users...");

  for (const demo of demoUsers) {
    const existing = await users.findOne({ email: demo.email });
    const passwordHash = await bcrypt.hash(demo.password, 10);
    let userId;

    if (existing) {
      userId = existing._id;
      await users.updateOne(
        { email: demo.email },
        {
          $set: {
            name: demo.name,
            role: demo.role,
            passwordHash,
            updatedAt: new Date().toISOString(),
          },
        }
      );
      console.log(`Updated demo user ${demo.email}`);
    } else {
      const result = await users.insertOne({
        name: demo.name,
        email: demo.email,
        passwordHash,
        role: demo.role,
        createdAt: new Date().toISOString(),
      });
      userId = result.insertedId;
      console.log(`Created demo user ${demo.email}`);
    }

    const token = jwt.sign(
      { sub: userId.toString(), email: demo.email, role: demo.role },
      jwtSecret,
      { expiresIn: jwtExpiresIn }
    );

    console.log(`  email: ${demo.email}`);
    console.log(`  password: ${demo.password}`);
    console.log(`  role: ${demo.role}`);
    console.log(`  token: ${token}`);
    console.log("---");
  }

  await client.close();
  console.log("Demo seed complete.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
