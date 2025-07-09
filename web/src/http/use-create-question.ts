import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateQuestionResponse } from "./types/create-question-response";
import type { CreateQuestionRequest } from "./types/create-question-request";
import type { GetRoomQuestionsResponse } from "./types/get-room-questions-response";

export function useCreateQuestion(roomId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateQuestionRequest) => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create question");
      }

      const responseData: CreateQuestionResponse = await response.json();
      return responseData;
    },
    onMutate({ question }) {
      const questions = queryClient.getQueryData<GetRoomQuestionsResponse[]>([
        "get-questions",
        roomId,
      ]);

      const questionsArray = questions || [];

      queryClient.setQueryData<GetRoomQuestionsResponse[]>(
        ["get-questions", roomId],
        [
          {
            id: crypto.randomUUID(),
            question,
            answer: null,
            createdAt: new Date().toISOString(),
          },
          ...questionsArray,
        ]
      );
    },
  });
}
