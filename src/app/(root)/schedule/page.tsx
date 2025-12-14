"use client";

import LoaderUI from "@/components/LoaderUI";
import { useUserRole } from "../../../components/hooks/useUserRole";
import { useRouter } from "next/navigation";
import InterviewScheduleUI from "./InterviewScheduleUI";

function SchedulePage() {
  const router = useRouter();

  const { isInterviewer, isLoading } = useUserRole();

  if (isLoading) return <p>Loading....</p>;
  if (!isInterviewer) return router.push("/");

  return <div className="h-full w-full"> <InterviewScheduleUI /> </div>;
}
export default SchedulePage;