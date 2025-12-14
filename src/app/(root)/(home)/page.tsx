
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
  //  const WordCarousel: React.FC = () => {
  //   const word1Controls = useAnimation();
  //   const word2Controls = useAnimation();
  //   const word3Controls = useAnimation();
  //   const word4Controls = useAnimation();
  //   const word5Controls = useAnimation();

  //   const word1Ref = useRef<HTMLParagraphElement>(null);
  //   const word2Ref = useRef<HTMLParagraphElement>(null);
  //   const word3Ref = useRef<HTMLParagraphElement>(null);
  //   const word4Ref = useRef<HTMLParagraphElement>(null);
  //   const word5Ref = useRef<HTMLParagraphElement>(null);

  //   const words: Word[] = [
  //     {
  //       text: "Manage interviews easily",
  //       ref: word1Ref,
  //       controls: word1Controls,
  //     },
  //     { text: "Follow your schedule effortlessly", ref: word2Ref, controls: word2Controls },
  //     { text: "Record meetings for later review", ref: word3Ref, controls: word3Controls },
  //     { text: "Organize candidates in one place", ref: word4Ref, controls: word4Controls },
  //     { text: "Access all interviews anytime", ref: word5Ref, controls: word5Controls },
  //   ];

  //   const sleep = (ms: number) =>
  //     new Promise((resolve) => setTimeout(resolve, ms));

  //   const runSequence = useCallback(async () => {
  //     while (true) {
  //       for (const word of words) {
  //         // Fade in
  //         await word.controls.start({
  //           opacity: 1,
  //           transform: 'translate(-50%, -50%) scale(2)',
  //           transition: { duration: 1 },
  //         });
  //         await sleep(3000); // Visible duration
  //         await word.controls.start({
  //           opacity: 0,
  //           transform: 'translate(-50%, -50%) scale(2)',
  //           transition: { duration: 1 },
  //         });
  //         await sleep(500);
  //       }
  //     }
  //   }, [words]);

  //   useEffect(() => {
  //     runSequence();
  //   }, [runSequence]);

  //   const commonClasses =
  //     "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-800 text-3xl font-extrabold";

  //   return (
  //     <div className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-800 text-3xl font-extrabold">
  //       {words.map((word, idx) => (
  //         <motion.p
  //           key={idx}
  //           ref={word.ref}
  //           initial={{ opacity: 0 }}
  //           animate={word.controls}
  //           className={commonClasses}
  //         >
  //           {word.text}
  //         </motion.p>
  //       ))}
  //     </div>
  //   );
  // };
   if (isLoading) return <p>Loading....</p>;
  //  bg-gradient-to-b from-[#eeedff] to-white
  return (
    <div className="w-full overflow-hidden bg-theme">
    <div className="p-20 w-full flex flex-col lg:flex-row justify-center items-center gap-[15px] lg:gap-[50px]">
<div className="flex flex-col justify-center"><p className="pb-1 text-6xl font-extrabold">The Future of</p>
<p className="pb-3 text-6xl font-extrabold text-[#4f46e5]">Remote Interviews</p>
<p className="pb-3 text-[#999fa9] max-w-[500px]">Connect, collaborate, and hire the best talent with our seamless video interviewing platform. Crystal clear audio, HD video, and integrated tools.</p>
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
      <p className="text-3xl font-bold">Our Services</p>
      <p className="p-3 text-[#999fa9] text-center">Everything you need for seamless remote interviews and collaboration.</p>
    </div>
     {isInterviewer ? (
        <div className="w-full flex justify-center">
          <div className="mt-10 pb-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-20">
            {QUICK_ACTIONS.map((action) => (
              <ActionCard
                key={action.title}
                action={action}
                onClick={() => handleQuickAction(action.title)}
              />
            ))}
          </div>

          <MeetingModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={modalType === "join" ? "Join Meeting" : "Start Meeting"}
            isJoinMeeting={modalType === "join"}
          />
        </div>
      ) : (
        <>
          <div>
            <h1 className="text-3xl font-bold">Your Interviews</h1>
            <p className="text-muted-foreground mt-1">View and join your scheduled interviews</p>
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
    </div>
  )
  ;
}
