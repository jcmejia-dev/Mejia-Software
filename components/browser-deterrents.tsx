"use client";

import { useEffect, useRef, useState } from "react";

const TOAST_DURATION_MS = 2600;

/**
 * Lightweight deterrents for casual browser inspection.
 * These are intentionally not treated as a security boundary: anything sent
 * to a browser can still be inspected by a determined visitor.
 */
export function BrowserDeterrents() {
  const [toastVisible, setToastVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const showProhibitedToast = () => {
      setToastVisible(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setToastVisible(false), TOAST_DURATION_MS);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const blocked =
        event.key === "F12" ||
        (event.ctrlKey && event.shiftKey && ["i", "j", "c"].includes(key)) ||
        (event.metaKey && event.altKey && ["i", "j", "c"].includes(key)) ||
        ((event.ctrlKey || event.metaKey) && key === "u");

      if (blocked) {
        event.preventDefault();
        event.stopPropagation();
        showProhibitedToast();
      }
    };

    const onContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      showProhibitedToast();
    };

    window.addEventListener("keydown", onKeyDown, { capture: true });
    window.addEventListener("contextmenu", onContextMenu, { capture: true });

    return () => {
      window.removeEventListener("keydown", onKeyDown, { capture: true });
      window.removeEventListener("contextmenu", onContextMenu, { capture: true });
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: "fixed",
        right: "20px",
        bottom: "20px",
        zIndex: 99999,
        maxWidth: "360px",
        padding: "14px 16px",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "12px",
        background: "#171a18",
        color: "#f7f8f7",
        boxShadow: "0 16px 45px rgba(0,0,0,0.24)",
        fontSize: "14px",
        lineHeight: 1.45,
        pointerEvents: "none",
        opacity: toastVisible ? 1 : 0,
        transform: toastVisible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 180ms ease, transform 180ms ease",
      }}
    >
      <strong style={{ display: "block", marginBottom: "2px" }}>Action prohibited</strong>
      <span style={{ color: "#c9cecb" }}>
        This action is disabled to help protect Mejia Software and its contents.
      </span>
    </div>
  );
}
