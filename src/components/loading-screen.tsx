import { cn } from "@/lib/utils";
import { LoaderCircleIcon } from "lucide-react";

export const LoadingScreen = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex size-full flex-col items-center justify-center", className)}>
      <LoaderCircleIcon className="text-muted-foreground size-8 animate-spin" />
    </div>
  );
};
