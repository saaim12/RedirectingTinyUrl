import crypto from "crypto";

export const generateHash = (url) => {
  return crypto.createHash("sha256").update(url).digest("hex").slice(0, 6); // Generate a 6-character hash
};
