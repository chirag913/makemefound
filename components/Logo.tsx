import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Image src="/logo-mark.png" alt="" width={28} height={23} className="h-[22px] w-auto" priority />
      <span className="text-[1.0625rem] font-semibold tracking-[-0.03em] text-fg">MakeMeFound</span>
    </span>
  );
}
