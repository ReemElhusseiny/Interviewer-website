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
                className="px-8 py-4 bg-[#48a6e6] hover:bg-[#6bbcf0] text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 flex items-center gap-3 mx-auto transition-all"
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
