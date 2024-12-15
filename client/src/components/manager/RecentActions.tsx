 
import { Avatar, AvatarFallback } from "../ui/avatar";
import moment from "moment";

export default function RecentActions({ actionData }: { actionData: any[] }) {
  return (
    <div className="">
      {actionData.length > 0 ? (
        actionData.map((vehicle, index) => (
          <div
            key={index}
            className="flex items-center py-3 px-2 rounded-lg transition-colors"
          >
            <Avatar className="mr-3 h-8 w-8">
              <AvatarFallback>{vehicle.name[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex gap-2 items-center">
              <p className="text-sm font-medium text-center items-center">{vehicle.name}-{vehicle.licensePlate}</p>
            </div>
            
            <div className="ml-auto text-xs text-muted-foreground">
              {moment(vehicle.createdAt).fromNow()}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-sm text-muted-foreground py-4">
          No recent added vehicle
        </p>
      )}
    </div>
  );
}
