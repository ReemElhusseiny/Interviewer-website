
"use client";
import react, {useEffect, useRef, useCallback} from 'react'
import ActionCard from "../../../components/ActionCard";
import { QUICK_ACTIONS } from "../../../constants";
import { useUserRole } from "../../../components/hooks/useUserRole";
import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import MeetingModal from "../../../components/MeetingModal";
import LoaderUI from "@/components/LoaderUI";
import { Loader2Icon } from "lucide-react";
import MeetingCard from "../../../components/MeetingCard";
import { motion, useAnimation } from 'framer-motion';
import Image from "next/image";


interface Word {
  text: string;
  controls: ReturnType<typeof useAnimation>;
  ref: React.RefObject<HTMLParagraphElement>;
}


export default function Home() {
  const router = useRouter();
  const { isInterviewer, isCandidate, isLoading } = useUserRole();
  const interviews = useQuery(api.interviews.getMyInterviews);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();
  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;
      case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;
      default:
        router.push(`/${title.toLowerCase()}`);
    }
  };
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
   if (isLoading) return <LoaderUI />;
  return (
    <div className="w-full">
      {/* text-[#4f46e5] */}
    <div className="p-20 w-full flex flex-col lg:flex-row justify-center items-center gap-[15px] lg:gap-[50px]">
<div className="flex flex-col justify-center"><p className="pb-1 text-6xl font-extrabold">The Future of</p>
<p className="pb-3 text-6xl font-extrabold text-theme">Remote Interviews</p>
<p className="pb-3 text-[#999fa9] max-w-[500px]">{isInterviewer ? "Connect, collaborate, and hire the best talent with our seamless video interviewing platform. Crystal clear audio, HD video, and integrated tools." : "Join interviews from anywhere with confidence. Enjoy crystal-clear audio, HD video, and easy-to-use tools designed to help you perform your best."}</p>
</div>
<Image
  src="/logoBg.png"
  alt="Logo"
  width={600}          
  height={400}        
  className="w-full min-w-[280px] md:max-w-[500px] lg:max-w-[600px] rounded-xl shadow-2xl animate-UpDown object-contain"
/>
    </div>
    <div className="mt-20 flex flex-col justify-center items-center">
    </div>
    {/* <ServicesGrid /> */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
     {isInterviewer ? (
      <>
       <div className="mb-16 text-center">
             <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Our Services</h2>
             <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
               Everything you need for seamless remote interviews and collaboration.
             </p>
           </div>
        <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 h-[400px]" // Fixed height for 3D effect space
          >
            {QUICK_ACTIONS.map((action, index) => (
              <motion.div key={index} variants={item} className="h-full">
                <ActionCard
                // key={action.title}
                action={action}
                onClick={() => handleQuickAction(action.title)}
              />
              </motion.div>
            ))}
          </motion.div>
    

          <MeetingModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={modalType === "join" ? "Join Meeting" : "Start Meeting"}
            isJoinMeeting={modalType === "join"}
          />
        </>
      ) : (
        <>
             <div className="mb-16 text-center">
             <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">Your Interviews</h2>
             <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
               View and join your scheduled interviews.
             </p>
           </div>

          <div className="mt-8">
            {interviews === undefined ? (
              <div className="flex justify-center py-12">
                <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : interviews.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {interviews.map((interview) => (
                  <MeetingCard key={interview._id} interview={interview} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                You have no scheduled interviews at the moment
              </div>
            )}
          </div>
        </>
      )}
      </section>
    </div>
  )
  ;
}
