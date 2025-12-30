import React, { useRef } from "react";
import { QuickActionType } from "../constants";
import { Card } from "./ui/card";
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// some weird tw bug, but this is how it works
// from-orange-500/10 via-orange-500/5 to-transparent
// from-blue-500/10 via-blue-500/5 to-transparent
// from-purple-500/10 via-purple-500/5 to-transparent
// from-primary/10 via-primary/5 to-transparent

function ActionCard({ action, onClick }: { action: QuickActionType; onClick: () => void }) {
    const ref = useRef<HTMLDivElement>(null);
  const MotionCard = motion(Card);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct)
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  }
  return (
  <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      onClick={onClick}
      className="bg-[var(--background-color-card)] relative h-full w-full rounded-xl p-1 cursor-pointer"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-white shadow-lg"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="p-6 flex flex-col h-full items-center text-center">
          <div 
            style={{ transform: "translateZ(50px)" }}
            className={`w-16 h-16 rounded-full bg-black-500 flex items-center justify-center mb-4 text-gray-900 shadow-inner`}
          >
            <action.icon size={32} />
          </div>

          <h3 
            style={{ transform: "translateZ(40px)" }}
            className="text-2xl font-bold text-gray-900"
          >
            {action.title}
          </h3>

          <p 
            style={{ transform: "translateZ(30px)" }}
            className="text-gray-500 text-sm mb-6"
          >
            {action.description}
          </p>

          <div 
            style={{ transform: "translateZ(20px)" }}
            className={`mt-auto flex items-center gap-2 text-sm font-bold text-gray-900 group-hover:gap-3 transition-all`}
          >
            <span>Explore</span>
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ActionCard;
