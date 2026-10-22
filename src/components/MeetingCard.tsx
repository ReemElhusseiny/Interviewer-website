import {useState} from "react";
import useMeetingActions from "../components/hooks/useMeetingActions.ts";
import { Doc } from "../../convex/_generated/dataModel";
import { getMeetingStatus } from "@/lib/utils";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { CalendarIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { CirclePlay, CircleCheckBig, MoveRight } from "lucide-react";
import { motion } from 'framer-motion';
import { Calendar, Clock, Video, MoreHorizontal } from 'lucide-react';
import { useUserRole } from "./hooks/useUserRole";
import { useRouter } from 'next/navigation';

export type InterviewStatus = 'live' | 'upcoming' | 'completed';

interface ScheduleCardProps {
  title: string;
  description: string;
  date: string;
  time: string;
  status: InterviewStatus;
}

type Interview = Doc<"interviews">;

function MeetingCard({ interview }: { interview: Interview }) {
  const { isInterviewer, isLoading } = useUserRole();
   const router = useRouter();
  const { joinMeeting } = useMeetingActions();
  const status = getMeetingStatus(interview);
  const formattedDateTime = format(new Date(interview.startTime), "d MMM h:mm a");
  const formattedDateMonth = format(new Date(interview.startTime), "MMM");
  const formattedDateDay = format(new Date(interview.startTime), "d");
  const formattedDayName = format(new Date(interview.startTime), "EEE");
  return (
     <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4, rotate: -2 }}
      className="group relative flex bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
          <Card
      className={`w-full bg-[var(--background-Thirdly)] group cursor-pointer overflow-hidden hover:shadow-lg transition-shadow duration-300  dark:hover:bg-transparent`}
    >
      {/* Category Badge and Important Indicator */}
      <div className="absolute top-3 right-3 z-10 flex gap-2">
             <Badge
           className={ `
            gap-1 
            ${
    status === "live"
      ? "bg-[#fedbdb] text-[#b91f5c]"
      : status === "upcoming"
      ? "bg-[#dbeafe] text-[#429ef1]"
      : "bg-[#dedfe4c5] text-[#515661]"} `
  }
>
  {status === "live" ? (
    <>
      <CirclePlay className="inline w-4 h-4 mr-1" />
      Live Now
    </>
  ) : status === "upcoming" ? (
    <>
      <CalendarIcon className="inline w-4 h-4 mr-1" />
      Upcoming
    </>
  ) : (
    <>
      <CircleCheckBig className="inline w-4 h-4 mr-1" />
      Completed
    </>
  )}
</Badge>
      </div>

      {/* Header with Date */}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex-1">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-2xs font-semibold text-muted-foreground uppercase tracking-wider">
                {formattedDayName}
              </span>
              <span className="text-theme text-3xl font-bold text-primary">
                {formattedDateDay}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {formattedDateTime}

              </p>
          </div>
        </div>

        <CardTitle className="text-xl hover:text-theme">
          {interview.title}
        </CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent className="pb-4">
        <CardDescription className="text-lg leading-relaxed">
        {interview.description}
        </CardDescription>
<div className="w-full border-b-2 border-dashed border-gray-200 dark:border-gray-700 mt-4 mb-4"></div>
        {status === "live" && (
          <Button className="w-full" onClick={() => joinMeeting(interview.streamCallId)}>
            Join Meeting
          </Button>
        )}

        {status === "upcoming" && (
          <Button variant="outline" className="w-full" disabled>
            Waiting to Start
          </Button>
        )}
        {isInterviewer && 
        status === "completed" && (
           <div className="flex justify-end">
    <div className="flex items-center gap-1 text-xs text-[#515661] border-b-2 border-transparent hover:border-[#515661]">
      <p onClick={() => router.push('/recordings')} className="m-0 p-0">View Recording</p>
      <MoveRight className="w-3 h-3" />
    </div>
  </div>
        )}
      </CardContent>
    </Card>
    </motion.div>
  );
}
export default MeetingCard;