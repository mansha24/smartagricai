const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is required in .env.local");

  const email = "admin@smartagri.local";
  const password = "Admin@2026!";
  const name = "Admin User";
  const role = "admin";

  const client = new MongoClient(uri, { appName: "SmartAgriAI Admin Setup" });
  await client.connect();

  const users = client.db().collection("users");
  const passwordHash = await bcrypt.hash(password, 10);

  await users.updateOne(
    { email },
    {
      $set: {
        name,
        role,
        passwordHash,
        updatedAt: new Date().toISOString(),
      },
      $setOnInsert: {
        createdAt: new Date().toISOString(),
      },
    },
    { upsert: true }
  );

  console.log("Admin user is ready:");
  console.log(`email: ${email}`);
  console.log(`password: ${password}`);
  console.log(`role: ${role}`);

  await client.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
