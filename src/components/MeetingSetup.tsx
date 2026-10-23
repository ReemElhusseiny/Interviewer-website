"use client";
import { DeviceSettings, useCall, VideoPreview, useCallStateHooks, } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { CameraIcon, MicIcon, SettingsIcon, VideoOff, ArrowLeft, Sparkles, Camera, CameraOff, Mic, MicOff } from "lucide-react";
import Link from "next/link";
import { motion } from 'framer-motion';
import toast from "react-hot-toast";

function MeetingSetup({ onSetupComplete }: { onSetupComplete: () => void }) {
  const [isCameraDisabled, setIsCameraDisabled] = useState(true);
  const [isMicDisabled, setIsMicDisabled] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const call = useCall();
   console.log("Call object in MeetingSetup:", call);
  if (!call) return null;
   const {
    useCameraState,
    // useCameraStatus,
    // useHasCameraPermission,
  } = useCallStateHooks();

  const cameraState = useCameraState();
   console.log("CallCamera", cameraState);

  useEffect(() => {
    if (isCameraDisabled) call.camera.disable();
    else call.camera.enable();
  }, [isCameraDisabled, call.camera]);

  useEffect(() => {
    if (isMicDisabled) call.microphone.disable();
    else call.microphone.enable();
  }, [isMicDisabled, call.microphone]);
const handleJoin = async () => {
  if (!call) return;
  try {
    setIsJoining(true); // تشغيل الـ loading
    
    await call.join();
    
    toast.success("Joined meeting successfully!");
    onSetupComplete();
  } catch (err: any) {
    console.error("Failed to join meeting:", err);
    
    if (err?.message?.includes("SFU WS connection failed") || err?.message?.includes("WebSocket")) {
      toast.error("Connection failed! Please disable your Ad-Blocker or check your internet connection.");
    } else {
      toast.error(err?.message || "Failed to join the meeting. Please try again.");
    }
  } finally {
    setIsJoining(false);
  }
};

  return (
    <div className="h-full flex flex-col gap-[20px] items-center  p-6 ">
      <div className="w-full flex flex-col gap-3 sm:gap-0 sm:flex-row sm:justify-between">
        <Link href="/">
     <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" >
           <ArrowLeft size={20} />
      <p> Back to Home</p>
     </div>
     </Link>
     <div className="w-[180px] h-[40px] text-[#6bbcf0] font-bold bg-[#fff] px-4 rounded-full flex items-center content-center justify-center">
       <Sparkles className="w-5 h-5 mr-2" />
        <p className="text-l font-semibold">New meeting</p>
     </div>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center">
       <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">
            Ready to join ?
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Check your audio and video settings before entering the call.
          </p>
         <div className="relative w-full max-w-4xl h-[400px] mx-auto aspect-video rounded-[30px] overflow-hidden bg-muted/50 border relative mt-4">
                <VideoPreview className="w-full h-full" />
                   {(cameraState.hasBrowserPermission === false ||
    cameraState.isEnabled === false) && (
    <div className="absolute inset-0  flex flex-col items-center justify-center text-white gap-2">
      <VideoOff className="mb-[100px] opacity-10" size={100} />
      {/* <p className="text-sm opacity-70">
        Camera is off or not allowed
      </p> */}
    </div>
  )}
                 {!isMicDisabled && (
        <div className="absolute top-6 right-6 flex items-end gap-1 h-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              animate={{ height: [4, 16, 8, 24, 4] }}
              transition={{ repeat: Infinity, duration: 0.5 + i * 0.1, ease: "easeInOut" }}
              className="w-1 bg-green-500 rounded-full"
            />
          ))}
        </div>
      )}
                         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full shadow-xl transition-all duration-300 hover:bg-black/60 hover:scale-105">
        <ControlButton 
          isOn={!isMicDisabled} 
          onIcon={Mic} 
          offIcon={MicOff} 
          onClick={() => setIsMicDisabled(!isMicDisabled)} 
          color="green"
        />
        <ControlButton 
          isOn={!isCameraDisabled} 
          onIcon={Camera} 
          offIcon={CameraOff} 
          onClick={() => setIsCameraDisabled(!isCameraDisabled)} 
          color="blue"
        />
        <div className="w-px h-8 bg-white/20 mx-2" />
        <button 
          // onClick={onOpenSettings}
          className="p-3 rounded-full bg-white/5 hover:bg-white/20 text-white transition-colors"
        >
          <DeviceSettings />
        </button>
              
      </div>
              </div>
            </div>
      <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-md">
          {/* <motion.button
            onClick={handleJoin}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-4 bg-[#6bbcf0] hover:bg-[#6bbcf0]/80 text-white font-bold rounded-xl shadow-lg shadow-[#6bbcf0]/80 transition-all"
          >
            Start Meeting Now
          </motion.button> */}
          <motion.button
  onClick={handleJoin}
  disabled={isJoining} 
  whileHover={{ scale: isJoining ? 1 : 1.02 }}
  whileTap={{ scale: isJoining ? 1 : 0.98 }}
  className="flex-1 py-4 bg-[#6bbcf0] hover:bg-[#6bbcf0]/80 text-white font-bold rounded-xl shadow-lg shadow-[#6bbcf0]/80 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
>
  {isJoining ? (
    <>
      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
      Connecting...
    </>
  ) : (
    "Start Meeting Now"
  )}
</motion.button>
        </div>
            </div>
  );
}
export default MeetingSetup;

interface ControlButtonProps {
  isOn: boolean;
  onIcon: React.ElementType;
  offIcon: React.ElementType;
  onClick: () => void;
  color: string;
}

const ControlButton: React.FC<ControlButtonProps> = ({ isOn, onIcon: OnIcon, offIcon: OffIcon, onClick, color }) => {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-full transition-all duration-300 ${
        isOn 
          ? `bg-white/10 hover:bg-white/20 text-white` 
          : `bg-red-500/90 hover:bg-red-600 text-white shadow-lg shadow-red-500/20`
      }`}
    >
      {isOn ? <OnIcon size={20} /> : <OffIcon size={20} />}
    </button>
  );
};