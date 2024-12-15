export function Footer() {
  const date = new Date().getFullYear();
  return (
    <div className="z-20 w-full bg-background/95 border-t-[0.5px] backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-4 md:mx-8 flex h-14 items-center justify-between">
        <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
          ©{ date } All rights reserved.
        </p>
        <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">Built by <a href="https://github.com/AyubAli125212" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4">Ayub Ali</a></p>
      </div>
    </div>
  );
}