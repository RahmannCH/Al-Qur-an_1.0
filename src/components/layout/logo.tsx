"use client";

import React from "react";
import { motion } from "framer-motion";

interface ZadifyLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
}

export function ZadifyLogo({
  className = "",
  iconOnly = false,
  size = "md",
  animated = true,
}: ZadifyLogoProps) {
  // Dimensions map
  const sizeMap = {
    sm: { icon: 24, font: "text-lg", textGap: "gap-2" },
    md: { icon: 32, font: "text-xl", textGap: "gap-2.5" },
    lg: { icon: 40, font: "text-2xl", textGap: "gap-3" },
    xl: { icon: 52, font: "text-4xl", textGap: "gap-4" },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`inline-flex items-center select-none ${currentSize.textGap} ${className}`}>
      {/* Aerodynamic Zadify SVG Mark */}
      <motion.div
        whileHover={animated ? { scale: 1.06, rotate: 2 } : undefined}
        whileTap={animated ? { scale: 0.95 } : undefined}
        className="relative flex items-center justify-center shrink-0"
      >
        {/* Glow backdrop */}
        <div className="absolute inset-0 rounded-xl bg-emerald-500/25 blur-md transform scale-110" />

        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 drop-shadow-[0_4px_12px_rgba(16,185,129,0.35)]"
        >
          <defs>
            {/* Zadify Primary Emerald Gradient */}
            <linearGradient id="zadify-emerald-main" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6EE7B7" />
              <stop offset="45%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>

            {/* Aerodynamic Accent Node Gradient */}
            <linearGradient id="zadify-arrow-glow" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#A7F3D0" />
            </linearGradient>

            {/* Subtle Metallic Shadow */}
            <linearGradient id="zadify-shadow-overlay" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Background Tech Hexagon / Rounded Badge Frame */}
          <rect
            x="2"
            y="2"
            width="36"
            height="36"
            rx="10"
            fill="#0D131C"
            stroke="url(#zadify-emerald-main)"
            strokeWidth="1.5"
            strokeOpacity="0.5"
          />

          {/* Aerodynamic "Z" + Upward Ascension Arrow Geometry */}
          <g>
            {/* Top Bar of Z (Sleek Angled Wing) */}
            <path
              d="M 9 11 C 9 9.895 9.895 9 11 9 L 29 9 C 29.8 9 30.3 9.8 29.9 10.5 L 25.5 16 H 18.5 L 24.2 9.8 C 24.5 9.4 24.2 9 23.7 9 L 11 9 Z"
              fill="url(#zadify-emerald-main)"
            />

            {/* Diagonal Shaft of Z & Upward Leveling Arrow Emblem */}
            <path
              d="M 28 11.5 L 14.5 28.5 C 14.1 29 14.5 29.8 15.2 29.8 L 30 29.8 C 30.6 29.8 31 29.4 31 28.8 V 26 C 31 25.4 30.6 25 30 25 H 22 L 29.2 15.8 C 29.9 14.9 29.5 13.5 28.4 13.1 L 28 11.5 Z"
              fill="url(#zadify-emerald-main)"
            />

            {/* Integrated Ascension Arrow (Level Up Node) */}
            <path
              d="M 17.5 13.5 L 22.5 19.5 H 19.5 V 25.5 H 15.5 V 19.5 H 12.5 L 17.5 13.5 Z"
              fill="url(#zadify-arrow-glow)"
              className="drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]"
            />

            {/* Bottom Bar Base Accent */}
            <path
              d="M 9 29 C 9 27.895 9.895 27 11 27 L 17 27 L 12.5 31 C 11.7 31.7 10.5 31.4 10.1 30.5 L 9 29 Z"
              fill="url(#zadify-emerald-main)"
              opacity="0.9"
            />

            {/* Digital Node Pulse Points */}
            <circle cx="29" cy="10" r="1.5" fill="#A7F3D0" />
            <circle cx="17.5" cy="13.5" r="1" fill="#FFFFFF" />
          </g>
        </svg>
      </motion.div>

      {/* Inline Geometric Sans-Serif Wordmark */}
      {!iconOnly && (
        <div className="flex items-center font-display font-extrabold tracking-tight">
          <span className={`bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent ${currentSize.font}`}>
            Zadify
          </span>
        </div>
      )}
    </div>
  );
}
