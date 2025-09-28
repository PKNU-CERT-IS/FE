"use client";

import { motion } from "framer-motion";
import LogoSVG from "/public/icons/logo.svg";
import Link from "next/link";
import { useEffect, useState } from "react";

function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

type EaseType = "easeIn" | "easeOut" | "easeInOut" | "circInOut" | "anticipate";

interface Ladybug {
  id: number;
  size: number;
  duration: number;
  path: { x: number; y: number; rotate: number }[];
  ease: EaseType;
}

const easings = [
  "easeIn",
  "easeOut",
  "easeInOut",
  "circInOut",
  "anticipate",
] as const;

export default function NotFound() {
  const [ladybugs, setLadybugs] = useState<Ladybug[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 20 }).map((_, i) => {
      const size = getRandom(40, 200); // 중간 크기 위주
      // 절반은 천천히, 절반은 빠르게
      const duration = i % 2 === 0 ? getRandom(15, 30) : getRandom(6, 12);
      const startX = getRandom(-700, 700);
      const startY = getRandom(-400, 400);

      const pathPoints = Array.from({ length: getRandom(3, 5) }).map(() => ({
        x: getRandom(-600, 600),
        y: getRandom(-400, 400),
        rotate: getRandom(-360, 360),
      }));

      return {
        id: i,
        size,
        duration,
        path: [{ x: startX, y: startY, rotate: 0 }, ...pathPoints],
        ease: easings[Math.floor(Math.random() * easings.length)],
      };
    });

    setLadybugs(generated);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center relative overflow-hidden">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="mt-2 text-2xl text-gray-600 dark:text-gray-300">
        너 이상한짓 했지? 넌 나가라
      </p>
      <Link
        href="/"
        className="mt-6 px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
      >
        홈으로 돌아가기
      </Link>

      {/* 무당벌레 */}
      {ladybugs.map(({ id, size, duration, path, ease }) => (
        <motion.div
          key={id}
          className="absolute"
          style={{ width: size, height: size }}
          initial={{ x: path[0].x, y: path[0].y, rotate: path[0].rotate }}
          animate={{
            x: path.map((p) => p.x),
            y: path.map((p) => p.y),
            rotate: path.map((p) => p.rotate),
          }}
          transition={{
            duration,
            ease,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          <LogoSVG className="w-full h-full" />
        </motion.div>
      ))}
    </div>
  );
}
