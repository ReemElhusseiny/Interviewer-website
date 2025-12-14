import { QuickActionType } from "../constants";
import { Card } from "./ui/card";

// some weird tw bug, but this is how it works
// from-orange-500/10 via-orange-500/5 to-transparent
// from-blue-500/10 via-blue-500/5 to-transparent
// from-purple-500/10 via-purple-500/5 to-transparent
// from-primary/10 via-primary/5 to-transparent

function ActionCard({ action, onClick }: { action: QuickActionType; onClick: () => void }) {
  return (
    <Card
      className="flex flex-col justify-center items-center w-[150px] h-[200px] group relative overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg cursor-pointer 
    cursor-pointer
    transition-transform duration-300
    transform hover:-translate-y-5"
      onClick={onClick}
    >
      {/* ACTION GRADIENT */}
      <div
        className={`absolute inset-0 bg-[var(--background-card)] opacity-100 group-hover:opacity-60 transition-opacity`}
      />

      {/* ACTION CONTENT WRAPPER */}
      <div className="relative size-full flex flex-col justify-center items-center">
        <div className="flex flex-col gap-3 justify-center items-center">

          <div className="flex justify-center items-center bg-white w-[50px] h-[50px] rounded-2xl"> <action.icon className={`h-6 w-6 text-black`} /></div>

         
          <div className="flex flex-col justify-center items-center space-y-1">
            <h3 className="font-semibold text-xl group-hover:text-[#4f46e5] transition-colors">
              {action.title}
            </h3>
            <p className="text-sm text-nowrap text-muted-foreground">{action.description}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ActionCard;