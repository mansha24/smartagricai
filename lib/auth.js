import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "smartagri-secret";
const expiresIn = process.env.JWT_EXPIRES_IN || "4h";

export function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export function generateJwt(payload) {
  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyJwt(token) {
  return jwt.verify(token, secret);
}

export function getBearerToken(headers) {
  const authorization = headers.get("authorization");
  if (!authorization) return null;
  const [type, token] = authorization.split(" ");
  if (type !== "Bearer" || !token) return null;
  return token;
}
