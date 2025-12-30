"use client";

import LoaderUI from "@/components/LoaderUI";
import RecordingCard from "@/components/RecordingCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import useGetCalls from "../../../components/hooks/useGetCalls";
import { CallRecording } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Film, Video } from "lucide-react";
import useMeetingActions from "./../../../components/hooks/useMeetingActions.ts";

function RecordingsPage() {
  const { calls, isLoading } = useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const { createInstantMeeting, joinMeeting } = useMeetingActions();

  const handleStart = () => {
    console.log("Start")
      createInstantMeeting();
  };

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

  if (isLoading) return <LoaderUI />;

  return (
    <div className="container max-w-7xl mx-auto p-6">
      {/* HEADER SECTION */}
      <h1 className="text-3xl font-bold">Recordings</h1>
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
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative mb-8"
            >
              <div className="absolute inset-0 bg-indigo-500/20 dark:bg-indigo-500/10 blur-3xl rounded-full" />
              <div className="relative w-32 h-32 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/20 dark:border-gray-700 rounded-full flex items-center justify-center shadow-2xl">
                <Film size={48} className="text-gray-400 dark:text-gray-500" />
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                No recordings available
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8 text-lg">
                It looks like you haven't recorded any interviews yet. Start a new meeting to create your first recording.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStart}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 flex items-center gap-3 mx-auto transition-all"
              >
                <Video size={20} />
                Start New Meeting
              </motion.button>
            </motion.div>
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
