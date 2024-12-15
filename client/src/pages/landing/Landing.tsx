import GridPattern from "@/components/ui/grid-pattern";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import fleet from "@/assets/fleet-logo.jpg";

export default function LandingHome() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-screen  ">
      <div className="relative flex flex-col items-center justify-center gap-4 w-full h-full overflow-hidden px-4 sm:px-8 md:px-20 py-10">
        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          strokeDasharray={"4 2"}
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
          )}
        />

        <div className="z-10 max-w-4xl text-center flex flex-col gap-2 md:gap-6 lg:gap-8 ">
          {/* Animated Circle Element */}
          <div className="z-10 flex items-center justify-center">
            <img
              src={fleet}
              alt="Fleet Management System Logo"
              className={cn(
                "group rounded-full border border-black/10 bg-neutral-200 w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 dark:border-white/10 dark:bg-neutral-800"
              )}
            />
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            <span className="text-[#0f62dd]">Enhance</span> The Way You
            <span className="hidden md:inline">
              {" "}
              <br />
            </span>
            <span>
              Manage Your <span className="text-[#0f62dd]">Vehicles</span>
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground">
            Welcome to Fleet Management System, a web application that helps
            you manage your vehicles. Our platform is designed to simplify the
            process of managing your vehicles, making it easier for you to keep
            track of your vehicles and ensure that they are in good condition.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => navigate("/auth/signup")}
            className="text-sm sm:text-base"
          >
            Sign Up
          </Button>
          <Button
            onClick={() => navigate("/auth/login")}
            variant="outline"
            className="text-sm sm:text-base"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
