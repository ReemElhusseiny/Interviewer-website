"use client";
import { DeviceSettings, useCall, VideoPreview, useCallStateHooks, } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { CameraIcon, MicIcon, SettingsIcon, VideoOff, ArrowLeft, Sparkles, Camera, CameraOff, Mic, MicOff } from "lucide-react";
// import { Switch } from "./ui/switch";
// import { Button } from "./ui/button";
import Link from "next/link";
import { motion } from 'framer-motion';

function MeetingSetup({ onSetupComplete }: { onSetupComplete: () => void }) {
  const [isCameraDisabled, setIsCameraDisabled] = useState(true);
  const [isMicDisabled, setIsMicDisabled] = useState(false);

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
  // const cameraStatus = useCameraStatus(); // "enabled" | "disabled" | "blocked"
  // const hasPermission = useHasCameraPermission();
  //  const cameraOff =
  //   cameraStatus !==
  // "enabled" || hasPermission === false;

  useEffect(() => {
    if (isCameraDisabled) call.camera.disable();
    else call.camera.enable();
  }, [isCameraDisabled, call.camera]);

  useEffect(() => {
    if (isMicDisabled) call.microphone.disable();
    else call.microphone.enable();
  }, [isMicDisabled, call.microphone]);

  const handleJoin = async () => {
    await call.join();
    onSetupComplete();
  };

  return (
    <div className="h-full flex flex-col gap-[20px] items-center  p-6 ">
      <div className="w-full flex justify-between">
        <Link href="/">
     <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" >
           <ArrowLeft size={20} />
      <p> Back to Home</p>
     </div>
     </Link>
     <div className="w-[180px] h-[40px] text-[#4338ca] font-bold bg-[#e0e7ff] px-4 rounded-full flex items-center content-center justify-center">
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
         <div className="relative w-full max-w-4xl mx-auto aspect-video rounded-[30px] overflow-hidden bg-muted/50 border relative mt-4">
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
          <motion.button
            onClick={handleJoin}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all"
          >
            Start Meeting Now
          </motion.button>
        </div>
            </div>
    // <div className="min-h-screen flex items-center justify-center p-6 bg-background/95">
    //   <div className="w-full max-w-[1200px] mx-auto">
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //       {/* VIDEO PREVIEW CONTAINER */}
    //       <Card className="md:col-span-1 p-6 flex flex-col">
    //         <div>
    //           <h1 className="text-xl font-semibold mb-1">Camera Preview</h1>
    //           <p className="text-sm text-muted-foreground">Make sure you look good!</p>
    //         </div>

    //         {/* VIDEO PREVIEW */}
    //         <div className="mt-4 flex-1 min-h-[400px] rounded-xl overflow-hidden bg-muted/50 border relative">
    //           <div className="absolute inset-0">
    //             <VideoPreview className="h-full w-full" />
    //           </div>
    //         </div>
    //       </Card>

    //       {/* CARD CONTROLS */}

    //       <Card className="md:col-span-1 p-6">
    //         <div className="h-full flex flex-col">
    //           {/* MEETING DETAILS  */}
    //           <div>
    //             <h2 className="text-xl font-semibold mb-1">Meeting Details</h2>
    //             <p className="text-sm text-muted-foreground break-all">{call.id}</p>
    //           </div>

    //           <div className="flex-1 flex flex-col justify-between">
    //             <div className="spacey-6 mt-8">
    //               {/* CAM CONTROL */}
    //               <div className="flex items-center justify-between">
    //                 <div className="flex items-center gap-3">
    //                   <div className="h-10 w-10 rounded-full bg-[#4f46e5] flex items-center justify-center">
    //                     <CameraIcon className="h-5 w-5 text-white" />
    //                   </div>
    //                   <div>
    //                     <p className="font-medium">Camera</p>
    //                     <p className="text-sm text-muted-foreground">
    //                       {isCameraDisabled ? "Off" : "On"}
    //                     </p>
    //                   </div>
    //                 </div>
    //                 <Switch
    //                   checked={!isCameraDisabled}
    //                   onCheckedChange={(checked) => setIsCameraDisabled(!checked)}
    //                 />
    //               </div>

    //               {/* MIC CONTROL */}
    //               <div className="flex items-center justify-between">
    //                 <div className="flex items-center gap-3">
    //                   <div className="h-10 w-10 rounded-full bg-[#4f46e5] flex items-center justify-center">
    //                     <MicIcon className="h-5 w-5 text-white" />
    //                   </div>
    //                   <div>
    //                     <p className="font-medium">Microphone</p>
    //                     <p className="text-sm text-muted-foreground">
    //                       {isMicDisabled ? "Off" : "On"}
    //                     </p>
    //                   </div>
    //                 </div>
    //                 <Switch
    //                   checked={!isMicDisabled}
    //                   onCheckedChange={(checked) => setIsMicDisabled(!checked)}
    //                 />
    //               </div>

    //               {/* DEVICE SETTINGS */}
                  // <div className="flex items-center justify-between">
                  //   <div className="flex items-center gap-3">
                  //     <div className="h-10 w-10 rounded-full bg-[#4f46e5] flex items-center justify-center">
                  //       <SettingsIcon className="h-5 w-5 text-white" />
                  //     </div>
                  //     <div>
                  //       <p className="font-medium">Settings</p>
                  //       <p className="text-sm text-muted-foreground">Configure devices</p>
                  //     </div>
                  //   </div>
                  //   <DeviceSettings />
                  // </div>
                // </div>

    //             {/* JOIN BTN */}
    //             <div className="space-y-3 mt-8">
    //               <Button className="w-full" size="lg" onClick={handleJoin}>
    //                 Join Meeting
    //               </Button>
    //               <p className="text-xs text-center text-muted-foreground">
    //                 Do not worry, our team is super friendly! We want you to succeed. 🎉
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //       </Card>
    //     </div>
    //   </div>
    // </div>
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