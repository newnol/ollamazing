import { LoaderCircleIcon } from "lucide-react";

export const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <LoaderCircleIcon className="size-6 animate-spin" />
    </div>
  );
};
