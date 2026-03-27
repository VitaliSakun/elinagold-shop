"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Nur auf Geräten mit Maus (kein Touch, kein Tablet)
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isDesktop) return;
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const onMove = (e) => {
      ring.style.left = e.clientX + "px";
      ring.style.top = e.clientY + "px";
      ring.style.opacity = "1";
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
      dot.style.opacity = "1";
    };

    const onLeave = () => {
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };

    const grow = () => {
      ring.style.width = "44px";
      ring.style.height = "44px";
      ring.style.marginLeft = "-22px";
      ring.style.marginTop = "-22px";
      ring.style.borderColor = "rgba(100,20,40,0.5)";
      ring.style.background = "rgba(100,20,40,0.06)";
      dot.style.transform = "scale(0)";
    };
    const shrink = () => {
      ring.style.width = "28px";
      ring.style.height = "28px";
      ring.style.marginLeft = "-14px";
      ring.style.marginTop = "-14px";
      ring.style.borderColor = "#641428";
      ring.style.background = "transparent";
      dot.style.transform = "scale(1)";
    };

    const selector = "a, button, [role='button'], input, select, textarea";
    const bind = () => {
      document.querySelectorAll(selector).forEach((node) => {
        node.addEventListener("mouseenter", grow);
        node.addEventListener("mouseleave", shrink);
      });
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    bind();

    const obs = new MutationObserver(bind);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      obs.disconnect();
    };
  }, [show]);

  if (!show) return null;

  const shared = {
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: 9999,
    borderRadius: "50%",
    opacity: 0,
  };

  return (
    <>
      <div ref={ringRef} style={{ ...shared, width: 28, height: 28, marginLeft: -14, marginTop: -14, border: "1.5px solid #641428", transition: "width 0.25s, height 0.25s, margin 0.25s, border-color 0.2s, background 0.2s, opacity 0.15s" }} />
      <div ref={dotRef} style={{ ...shared, width: 5, height: 5, marginLeft: -2.5, marginTop: -2.5, background: "#641428", transition: "transform 0.25s, opacity 0.15s" }} />
    </>
  );
}
