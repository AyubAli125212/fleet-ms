import { Button } from "./ui/button";
import connectionLost from "@/assets/63.svg";

export default function ConnectionLost() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-50 px-4">
      <img
        src={connectionLost}
        alt="connection lost"
        className="w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64 text-red-500"
      />
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold py-6">
        Connection Lost
      </h1>
      <p className="text-muted-foreground text-center text-sm md:text-base lg:text-lg max-w-lg">
        You are not connected to the internet. Please connect to the internet
        and try again.
      </p>
      <Button
        className="mt-6 text-sm md:text-base px-6 py-3 md:px-8 md:py-4"
        variant="ghost"
        onClick={() => window.location.reload()}
      >
        Try Again
      </Button>
    </div>
  );
}
