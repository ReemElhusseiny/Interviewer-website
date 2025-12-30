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
  const { joinMeeting } = useMeetingActions();
  const [isHovered, setIsHovered] = useState(false);
  // const status = getMeetingStatus(interview);
  const formattedDateTime = format(new Date(interview.startTime), "d MMM h:mm a");
  const formattedDateMonth = format(new Date(interview.startTime), "MMM");
  const formattedDateDay = format(new Date(interview.startTime), "d");
  const formattedDayName = format(new Date(interview.startTime), "EEE");
const getStatusConfig = (status: InterviewStatus) => {
    switch (status) {
      case 'live':
        return {
          color: 'red',
          label: 'LIVE',
          bg: 'bg-red-500',
          text: 'text-red-500',
          hoverBorder: 'hover:border-red-500',
          titleBtn: 'Join Meeting'
        };
      case 'upcoming':
        return {
          color: 'blue',
          label: 'UPCOMING',
          bg: 'bg-blue-500',
          text: 'text-blue-500',
          hoverBorder: 'hover:border-blue-500',
          titleBtn:  'Waiting to Start'
        };
      case 'completed':
        return {
          color: 'gray',
          label: 'DONE',
          bg: 'bg-gray-500',
          text: 'text-gray-500',
          hoverBorder: 'hover:border-gray-700',
          titleBtn:  'View Recording'
        };
    }
  };

  const config = getStatusConfig(getMeetingStatus(interview));
  return (
     <motion.div
      // initial={{ opacity: 0, y: 10 }}
      // whileInView={{ opacity: 1, y: 0 }}
      // viewport={{ once: true }}
      whileHover={{ y: -4, rotate: -2 }}
      className="group relative flex bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Left Stub (Date) */}
      {/* <div className={`w-24 flex flex-col items-center justify-center p-4 ${config.bg} text-white relative`}>
        <span className="text-xs font-bold opacity-80 uppercase tracking-wider mb-1">{formattedDateMonth}</span>
        <span className="text-2xl font-black">{formattedDateDay}</span>
        
        <div className="absolute right-0 top-0 bottom-0 w-[4px] flex flex-col justify-between">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-gray-50 dark:bg-gray-900 mb-1" />
          ))}
        </div>
      </div> */}

      {/* Right Content */}
      {/* <div className="flex-1 p-5 pl-8 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <div className={`text-[10px] font-black tracking-widest uppercase ${config.text} border border-current px-2 py-0.5 rounded`}>
              {config.label}
            </div>
            <div className="flex items-center text-gray-400 text-xs font-mono">
              <Clock size={12} className="mr-1" />
              {formattedDateTime}
            </div>
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {interview.title}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-xs line-clamp-2">
            {interview.description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-end border-t border-dashed border-gray-200 dark:border-gray-700 pt-3">
          <div className="flex -space-x-2">
            {[1, 2].map((i) => (
              <div key={i} className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800" />
            ))}
          </div>
   
           <div className="flex justify-end">
    <div className={`cursor-pointer flex items-center gap-1 text-xs ${config.text} border-b-2 border-transparent ${config.hoverBorder}`}>
      <p className="m-0 p-0">{config.titleBtn}</p>
      <MoveRight className="w-3 h-3" />
    </div>
  </div>

        </div>
      </div> */}
      {/* <div className='h-[500px] border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-4 w-full'>
         <Badge
           className={ `
            absolute right-5 
            ${
    status === "live"
      ? "bg-[#fedbdb] text-[#b91f5c]"
      : status === "upcoming"
      ? "bg-[#dbeafe] text-[#429ef1]"
      : "bg-[#dedfe4c5] text-[#515661]"}`
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
<div className="mt-[50px] flex items-center gap-3">
  <p className="text-[#757e9c] text-2xl font-semibold mt-2">{formattedDayName}</p>
  <p className="text-[#48a6e6] text-4xl font-bold">{formattedDateDay}</p>
</div>

        </div> */}
          <Card
      className={`w-full bg-[var(--background-Thirdly)] group cursor-pointer overflow-hidden hover:shadow-lg transition-shadow duration-300 hover:bg-[#f5effe] dark:hover:bg-transparent`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
      </CardContent>
    </Card>
    </motion.div>
//     <Card className={`border-l-4 ${
//   status === 'live'
//     ? 'bg-[#fbead6]'
//     : status === 'upcoming'
//     ? 'border-[#dbeafe]'
//     : 'bg-[#fbead6]'
//   // status === 'live'
//   //   ? 'border-[#fedbdb]'
//   //   : status === 'upcoming'
//   //   ? 'border-[#dbeafe]'
//   //   : 'border-[#cdced1ff]'
// }`}>
//       {/* border-2 border-red-500 */}
//       <CardHeader className="space-y-4">
//         {/* <p style={{color: '#dedfe4c5'}}>hiii</p> */}
//         <div className="flex items-center justify-between">
//            <Badge
//            className={ `
//             ${
//     status === "live"
//       ? "bg-[#fedbdb] text-[#b91f5c]"
//       : status === "upcoming"
//       ? "bg-[#dbeafe] text-[#429ef1]"
//       : "bg-[#dedfe4c5] text-[#515661]"} `
//   }
// >
//   {status === "live" ? (
//     <>
//       <CirclePlay className="inline w-4 h-4 mr-1" />
//       Live Now
//     </>
//   ) : status === "upcoming" ? (
//     <>
//       <CalendarIcon className="inline w-4 h-4 mr-1" />
//       Upcoming
//     </>
//   ) : (
//     <>
//       <CircleCheckBig className="inline w-4 h-4 mr-1" />
//       Completed
//     </>
//   )}
// </Badge>
//           <div className="flex items-center gap-2 text-sm text-muted-foreground">
//             <CalendarIcon className="h-4 w-4" />
//             {formattedDate}
//           </div>

//         </div>
// <div>
//         <CardTitle className="font-bold pb-1">{interview.title}</CardTitle>

//         {interview.description && (
//           <CardDescription className="p-0 line-clamp-1">{interview.description}</CardDescription>
//         )}
//         </div>
//       </CardHeader>

//       <CardContent>
//         {status === "live" && (
//           <Button className="w-full" onClick={() => joinMeeting(interview.streamCallId)}>
//             Join Meeting
//           </Button>
//         )}

//         {status === "upcoming" && (
//           <Button variant="outline" className="w-full" disabled>
//             Waiting to Start
//           </Button>
//         )}
//         {status === "completed" && (
//            <div className="flex justify-end">
//     <div className="flex items-center gap-1 text-xs text-[#515661] border-b-2 border-transparent hover:border-[#515661]">
//       <p className="m-0 p-0">View Recording</p>
//       <MoveRight className="w-3 h-3" />
//     </div>
//   </div>
//         )}
//       </CardContent>
//     </Card>
  );
}
export default MeetingCard;