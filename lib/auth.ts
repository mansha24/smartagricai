import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Role } from "./types";

const secret = process.env.JWT_SECRET || "smartagri-secret";
const expiresIn = process.env.JWT_EXPIRES_IN || "4h";

export type JwtPayload = {
  sub: string;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
};

export function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export function comparePassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function generateJwt(payload: { sub: string; email: string; role: Role }) {
  return jwt.sign(payload, secret as jwt.Secret, { expiresIn } as jwt.SignOptions);
}

export function verifyJwt(token: string) {
  return jwt.verify(token, secret as jwt.Secret) as JwtPayload;
}

export function getBearerToken(headers: Headers) {
  const authorization = headers.get("authorization");
  if (!authorization) return null;
  const [type, token] = authorization.split(" ");
  if (type !== "Bearer" || !token) return null;
  return token;
}
