import { chatHistory } from "@/lib/storage";
import { Message } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

let isFirstLoad = true;

export function useGetChatHistory(onSuccess?: (data: Message[]) => void) {
  const query = useQuery({
    queryKey: ["chatHistory"],
    queryFn: chatHistory.getValue,
  });

  useEffect(() => {
    if (isFirstLoad && query.isSuccess && onSuccess) {
      onSuccess(query.data);
      isFirstLoad = false;
    }
  }, [onSuccess, query.data, query.isSuccess]);

  return query;
}
