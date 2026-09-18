"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { NotificationData } from "@/types";

export function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const idRef = useRef(0);

  const addNotification = useCallback(
    (
      type: NotificationData["type"],
      title: string,
      body?: string
    ): NotificationData => {
      const n: NotificationData = {
        id: `notif-${idRef.current++}`,
        type,
        title,
        body,
        timestamp: Date.now(),
        read: false,
      };
      setNotifications((prev) => [n, ...prev].slice(0, 50));
      setUnreadCount((c) => c + 1);
      return n;
    },
    []
  );

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    setUnreadCount((c) => Math.max(0, c - 1));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const sendBrowserNotification = useCallback(
    (title: string, body?: string) => {
      if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
        new Notification(title, { body });
      }
    },
    []
  );

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllRead,
    removeNotification,
    sendBrowserNotification,
  };
}

