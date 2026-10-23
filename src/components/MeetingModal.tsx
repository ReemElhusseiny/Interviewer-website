import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useMeetingActions from "./hooks/useMeetingActions.ts";
import toast from "react-hot-toast";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  isJoinMeeting: boolean;
}

function MeetingModal({ isOpen, onClose, title, isJoinMeeting }: MeetingModalProps) {
  const [meetingUrl, setMeetingUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { createInstantMeeting, joinMeeting } = useMeetingActions();

  const handleStart = async () => {
    console.log("Start");
    try {
      setIsLoading(true);

      if (isJoinMeeting) {
        const meetingId = meetingUrl.split("/").pop();
        if (meetingId) {
          await joinMeeting(meetingId);
        }
      } else {
        await createInstantMeeting();
      }

      setMeetingUrl("");
      onClose();
    } catch (err) {
      toast.error("Connection failed! Please disable your Ad-Blocker or check your internet connection, please try again");
      console.error("Error with meeting action:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {isJoinMeeting && (
            <Input
              placeholder="Paste meeting link here..."
              value={meetingUrl}
              onChange={(e) => setMeetingUrl(e.target.value)}
              disabled={isLoading}
            />
          )}

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            
            <Button 
              onClick={handleStart} 
              disabled={(isJoinMeeting && !meetingUrl.trim()) || isLoading}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  {isJoinMeeting ? "Joining..." : "Starting..."}
                </>
              ) : (
                isJoinMeeting ? "Join Meeting" : "Start Meeting"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MeetingModal;