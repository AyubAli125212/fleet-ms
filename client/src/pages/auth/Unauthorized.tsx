import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

export default function Unauthorized() {
  return (
    <div className='flex flex-col items-center justify-center h-screen w-screen'>
      <ShieldAlert className='w-12 h-12 text-red-500' />
        <h1 className='text-5xl font-extrabold py-8 '>Unauthorized</h1>
        <p className='text-muted-foreground text-md'>You are not authorized to access this page.</p>
        <Button className="mt-4 text-xs" variant={"ghost"} onClick={() => window.location.href = "/"}>Go Home</Button>
    </div>
  )
}