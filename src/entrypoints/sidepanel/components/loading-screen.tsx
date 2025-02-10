import { LoaderCircleIcon } from "lucide-react";

export const LoadingScreen = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <LoaderCircleIcon className="text-muted-foreground size-8 animate-spin" />
    </div>
  );
};
