
import crypto from "crypto";
import envConfig from "../config/env.js";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;

const getEncryptionKey = () => {
  const key = envConfig.ENCRYPTION_KEY

  if (!key || !/^[0-9a-fA-F]{64}$/.test(key)) {
    throw new Error(
      "ENCRYPTION_KEY must be a 32-byte hexadecimal key (64 hex characters)"
    );
  }

  return Buffer.from(key, "hex");
};

// Encrypt password
export const encrypt = (text) => {
  if (typeof text !== "string" || !text.length) {
    throw new Error("Invalid text for encryption");
  }

  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    ALGORITHM,
    getEncryptionKey(),
    iv
  );

  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  return [
    iv.toString("hex"),
    authTag.toString("hex"),
    encrypted.toString("hex"),
  ].join(":");
};

// Decrypt password
export const decrypt = (encryptedData) => {
  if (typeof encryptedData !== "string") {
    throw new Error("Invalid encrypted data");
  }

  const [ivHex, authTagHex, encryptedHex] = encryptedData.split(":");

  if (
    !ivHex ||
    !authTagHex ||
    !encryptedHex ||
    ivHex.length !== IV_LENGTH * 2 ||
    authTagHex.length !== AUTH_TAG_LENGTH * 2 ||
    !/^[0-9a-f]+$/i.test(ivHex + authTagHex + encryptedHex)
  ) {
    throw new Error("Invalid encrypted data format");
  }

  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    getEncryptionKey(),
    Buffer.from(ivHex, "hex")
  );

  decipher.setAuthTag(Buffer.from(authTagHex, "hex"));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedHex, "hex")),
    decipher.final(),
  ]);
   
  return decrypted.toString("utf8");

};
 