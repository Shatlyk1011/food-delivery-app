import { useMutation } from "@tanstack/react-query";

import axios from "../shared/lib/axios";

import { FEEDBACK_OR_COOP_MUTATION } from "./query/feedbackOrCoop";

import useToast from "../hooks/useToast";

export const useCreateFeedbackOrCoop = () => {
  const toast = useToast();
  const { mutateAsync, isPending } = useMutation<FeedbackOrCoopResponse, any, any>({
    mutationFn: async (form: FeedbackOrCoop) => {
      const { data } = await axios({
        data: {
          query: FEEDBACK_OR_COOP_MUTATION,
          variables: { data: form },
        },
      });
      return await data.data.createFeedbackAndCooperation;
    },
    onSuccess: (data) => {
      // FIX test required
      toast(`Actions.${data.type}`, "success", { duration: 2000 });
    },
  });
  return { createFeedbackOrCoop: mutateAsync, isPending };
};
