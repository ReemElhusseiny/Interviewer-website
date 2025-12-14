"use client";

import LoaderUI from "@/components/LoaderUI";
import RecordingCard from "@/components/RecordingCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import useGetCalls from "../../../components/hooks/useGetCalls";
import { CallRecording } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

function RecordingsPage() {
  const { calls, isLoading } = useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  useEffect(() => {
    const fetchRecordings = async () => {
      if (!calls) return;

      try {
        // Get recordings for each call
        const callData = await Promise.all(calls.map((call) => call.queryRecordings()));
        const allRecordings = callData.flatMap((call) => call.recordings);

        setRecordings(allRecordings);
      } catch (error) {
        console.log("Error fetching recordings:", error);
      }
    };

    fetchRecordings();
  }, [calls]);

  if (isLoading) return <p>Loading....</p>;

  return (
    <div className="container max-w-7xl mx-auto p-6">
      {/* HEADER SECTION */}
      <h1 className="text-3xl font-bold text-[#4f46e5]">Recordings</h1>
      <p className="text-muted-foreground my-1">
        {recordings.length} {recordings.length === 1 ? "recording" : "recordings"} available
      </p>

      {/* RECORDINGS GRID */}

      <ScrollArea className="h-[calc(100vh-12rem)] mt-3">
        {recordings.length > 0 ? (
          <div className="grid sm-grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 pb-6">
            {recordings.map((r) => (
              <RecordingCard key={r.end_time} recording={r} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[400px] gap-4">
            <p className="text-xl font-medium text-muted-foreground">No recordings available</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
export default RecordingsPage;

// import React, { useRef, useState } from 'react';
// import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
// import { LucideIcon, ArrowRight } from 'lucide-react';

// interface ServiceCardProps {
//   title: string;
//   description: string;
//   icon: LucideIcon;
//   onClick: () => void;
//   color: string;
// }

// export const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon, onClick, color }) => {
//   const ref = useRef<HTMLDivElement>(null);

//   const x = useMotionValue(0);
//   const y = useMotionValue(0);

//   const mouseXSpring = useSpring(x);
//   const mouseYSpring = useSpring(y);

//   const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
//   const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!ref.current) return;

//     const rect = ref.current.getBoundingClientRect();

//     const width = rect.width;
//     const height = rect.height;

//     const mouseX = e.clientX - rect.left;
//     const mouseY = e.clientY - rect.top;

//     const xPct = mouseX / width - 0.5;
//     const yPct = mouseY / height - 0.5;

//     x.set(xPct);
//     y.set(yPct);
//   };

//   const handleMouseLeave = () => {
//     x.set(0);
//     y.set(0);
//   };

//   return (
//     <motion.div
//       ref={ref}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       style={{
//         rotateY,
//         rotateX,
//         transformStyle: "preserve-3d",
//       }}
//       onClick={onClick}
//       className="relative h-full w-full rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 p-1 cursor-pointer"
//     >
//       <div
//         style={{
//           transform: "translateZ(75px)",
//           transformStyle: "preserve-3d",
//         }}
//         className="absolute inset-4 grid place-content-center rounded-xl bg-white dark:bg-gray-900 shadow-lg"
//       >
//         <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        
//         <div className="p-6 flex flex-col h-full items-center text-center">
//           <div 
//             style={{ transform: "translateZ(50px)" }}
//             className={`w-16 h-16 rounded-full bg-${color}-100 dark:bg-${color}-900/30 flex items-center justify-center mb-4 text-${color}-600 dark:text-${color}-400 shadow-inner`}
//           >
//             <Icon size={32} />
//           </div>

//           <h3 
//             style={{ transform: "translateZ(40px)" }}
//             className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
//           >
//             {title}
//           </h3>

//           <p 
//             style={{ transform: "translateZ(30px)" }}
//             className="text-gray-500 dark:text-gray-400 text-sm mb-6"
//           >
//             {description}
//           </p>

//           <div 
//             style={{ transform: "translateZ(20px)" }}
//             className={`mt-auto flex items-center gap-2 text-sm font-bold text-${color}-600 dark:text-${color}-400 group-hover:gap-3 transition-all`}
//           >
//             <span>Explore</span>
//             <ArrowRight size={16} />
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };
