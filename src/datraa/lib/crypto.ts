import CryptoJS from "crypto-js";

const SECRET_KEY = "datra-secure-key-change-this-in-prod";

export const encryptData = (data: any): string => {
  const jsonStr = JSON.stringify(data);
  return CryptoJS.AES.encrypt(jsonStr, SECRET_KEY).toString();
};

export const decryptData = (ciphertext: string): any => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(originalText);
};

export const maskAadhaar = (aadhaar: string): string => {
  if (!aadhaar) return "";
  const cleaned = aadhaar.replace(/\s/g, "");
  if (cleaned.length !== 12) return aadhaar;
  return `XXXX XXXX ${cleaned.slice(-4)}`;
};

export const generateHash = async (data: any, previousHash: string = ""): Promise<string> => {
  const response = await fetch("/api/blockchain/hash", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data, previousHash }),
  });
  const result = await response.json();
  return result.hash;
};
