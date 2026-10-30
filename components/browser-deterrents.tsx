"use client";

import { useEffect } from "react";

/**
 * Lightweight deterrents for casual browser inspection.
 * These are intentionally not treated as a security boundary: anything sent
 * to a browser can still be inspected by a determined visitor.
 */
export function BrowserDeterrents() {
  useEffect(() => {
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
      }
    };

    const onContextMenu = (event: MouseEvent) => event.preventDefault();

    window.addEventListener("keydown", onKeyDown, { capture: true });
    window.addEventListener("contextmenu", onContextMenu, { capture: true });

    return () => {
      window.removeEventListener("keydown", onKeyDown, { capture: true });
      window.removeEventListener("contextmenu", onContextMenu, { capture: true });
    };
  }, []);

  return null;
}
