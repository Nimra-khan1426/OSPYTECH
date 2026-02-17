/*"use client";

import { getAnalytics, isSupported } from "firebase/analytics";
import app from "./firebase";

export const initAnalytics = async () => {
  if (typeof window !== "undefined") {
    const supported = await isSupported();
    if (supported) {
      return getAnalytics(app);
    }
  }
  return null;
};*/