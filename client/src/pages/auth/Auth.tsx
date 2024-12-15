import { Outlet } from "react-router-dom";
import fleetLogo from "@/assets/fleet-logo.jpg";

export default function Auth() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <div className="container relative flex h-full  flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <img
              src={fleetLogo}
              alt="fleet-logo"
              className="h-10 w-auto rounded-full mr-2 rounded-full"
            />
            Fleet Management System
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                Manage your vehicles with ease. Our platform is designed to
                simplify the process of managing your vehicles, making it easier
                for you to keep track of your vehicles and ensure that they are
                in good condition.
              </p>
              <footer className="text-sm">2024</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] ">
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  );
}
