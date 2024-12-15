import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen'>
        <Search className='w-12 h-12 text-red-500' />
        <h1 className='text-5xl font-extrabold py-8 '>4O4 Page Not Found</h1>
        <p className='text-muted-foreground text-md'>The page you are looking for does not exist.</p>
        <Button className="mt-4 text-xs" variant={"ghost"} onClick={() => window.location.href = "/"}>Go Home</Button>
    </div>
  )
}
