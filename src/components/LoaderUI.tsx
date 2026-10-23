import { LoaderIcon } from "lucide-react";

function LoaderUI() {
  return (
    <div className="h-screen flex items-center justify-center">
      <LoaderIcon className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );
}
export default LoaderUI;
