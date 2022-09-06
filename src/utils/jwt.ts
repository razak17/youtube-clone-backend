import jwt from "jsonwebtoken";

export function signJwt(
  object: Object,
  keyName: string,
  options?: jwt.SignOptions | undefined
) {
  const signingKey = Buffer.from(keyName, "base64").toString("ascii");

  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJwt(token: string, keyName: string) {
  const publicKey = Buffer.from(keyName, "base64").toString("ascii");

  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
