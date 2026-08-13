"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistry() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      if (process.env.NODE_ENV === "development") {
        // Unregister SW in development to prevent caching issues with Next.js HMR
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const registration of registrations) {
            registration.unregister();
          }
        });
      } else {
        // Register in production
        window.addEventListener("load", () => {
          navigator.serviceWorker.register("/sw.js").catch((err) => {
            console.log("ServiceWorker registration failed: ", err);
          });
        });
      }
    }
  }, []);

  return null;
}
