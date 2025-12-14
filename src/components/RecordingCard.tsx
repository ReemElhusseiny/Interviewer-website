import { CallRecording } from "@stream-io/video-react-sdk";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { calculateRecordingDuration } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { CalendarIcon, ClockIcon, CopyIcon, PlayIcon } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from 'framer-motion';
import { Play, Clock, Calendar, MoreVertical } from 'lucide-react';

function RecordingCard({ recording }: { recording: CallRecording }) {
  console.log("recording",  recording)
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(recording.url);
      toast.success("Recording link copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy link to clipboard");
    }
  };

  const formattedStartDay = recording.start_time
    ? format(new Date(recording.start_time), "MMM d, yyyy")
    : "Unknown";
  const formattedStartTime = recording.start_time
    ? format(new Date(recording.start_time), "hh:mm a")
    : "Unknown";

  const duration =
    recording.start_time && recording.end_time
      ? calculateRecordingDuration(recording.start_time, recording.end_time)
      : "Unknown duration";

  return (
     <motion.div
      onClick={() => window.open(recording.url, "_blank")}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative bg-gray-900 rounded-2xl overflow-hidden shadow-lg cursor-pointer aspect-video"
    >
      {/* Thumbnail Image */}
      <div className="absolute inset-0">
        <img 
          src='./logoBg.png'
          alt="logo" 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-110 transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.2 }}
          onClick={() => window.open(recording.url, "_blank")}
          className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xl group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-colors duration-300"
        >
          <Play size={28} fill="currentColor" className="ml-1" />
        </motion.div>
      </div>

      {/* Duration Badge */}
      <div className="absolute top-4 right-4 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm text-xs font-medium text-white border border-white/10">
        {duration}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex justify-between items-end">
          <div>
            {/* <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">Title</h3>
            <p className="text-gray-300 text-sm mb-3">Reem</p> */}
            
            <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
              <div className="flex items-center gap-1.5">
                <Calendar size={12} />
                <span>{formattedStartTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={12} />
                <span>{formattedStartTime}</span>
              </div>
            </div>
          </div>
          
          <button onClick={handleCopyLink} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
            {/* <MoreVertical size={18} /> */}
             <CopyIcon className="size-4" />
            {/* <Button variant="secondary" onClick={handleCopyLink}>
          <CopyIcon className="size-4" />
        </Button> */}
          </button>
        </div>
        
        {/* Progress Bar (Mock) */}
        <div className="w-full h-1 bg-gray-700 rounded-full mt-4 overflow-hidden">
          <div className="w-1/3 h-full bg-indigo-500 rounded-full" />
        </div>
      </div>
    </motion.div>
    // <Card className="group hover:shadow-md transition-all">
    //   {/* CARD HEADER */}
    //   <CardHeader className="space-y-1">
    //     <div className="space-y-2">
    //       <div className="flex flex-col gap-1.5">
    //         <div className="flex items-center text-sm text-muted-foreground gap-2">
    //           <CalendarIcon className="h-3.5 w-3.5" />
    //           <span>{formattedStartTime}</span>
    //         </div>
    //         <div className="flex items-center text-sm text-muted-foreground gap-2">
    //           <ClockIcon className="h-3.5 w-3.5" />
    //           <span>{duration}</span>
    //         </div>
    //       </div>
    //     </div>
    //   </CardHeader>

    //   {/* CARD CONTENT */}

    //   <CardContent>
    //     <div
    //       className="w-full aspect-video bg-muted/50 rounded-lg flex items-center justify-center cursor-pointer group"
    //       onClick={() => window.open(recording.url, "_blank")}
    //     >
    //       <div className="size-12 rounded-full bg-background/90 flex items-center justify-center group-hover:bg-primary transition-colors">
    //         <PlayIcon className="size-6 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
    //       </div>
    //     </div>
    //   </CardContent>
    //   <CardFooter className="gap-2">
    //     <Button className="flex-1" onClick={() => window.open(recording.url, "_blank")}>
    //       <PlayIcon className="size-4 mr-2" />
    //       Play Recording
    //     </Button>
    //     <Button variant="secondary" onClick={handleCopyLink}>
    //       <CopyIcon className="size-4" />
    //     </Button>
    //   </CardFooter>
    // </Card>
  );
}
export default RecordingCard;