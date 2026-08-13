"use client";

import { useEffect } from "react";
import { useReminderCheck } from "@/store/reminder-store";

export function ReminderChecker() {
  const { checkReminders } = useReminderCheck();

  useEffect(() => {
    // Check reminders every minute (60000ms)
    const interval = setInterval(() => {
      checkReminders();
    }, 60000);

    // Initial check
    checkReminders();

    return () => clearInterval(interval);
  }, [checkReminders]);

  return null;
}
