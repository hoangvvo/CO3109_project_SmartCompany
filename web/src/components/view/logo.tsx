import { cn } from "@/lib/utils";
import { Codepen } from "lucide-react";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <Codepen className="h-6 w-6 stroke-2" />
      <span className="font-bold font-mono">Smart_Company</span>
    </div>
  );
}
