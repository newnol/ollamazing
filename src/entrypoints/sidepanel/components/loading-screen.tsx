import { LoaderCircleIcon } from "lucide-react";

export const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <LoaderCircleIcon className="size-8 animate-spin text-muted-foreground" />
    </div>
  );
};
