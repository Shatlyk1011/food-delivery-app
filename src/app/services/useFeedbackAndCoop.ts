import { useMutation } from "@tanstack/react-query";

import axios from "../shared/lib/axios";

import { FEEDBACK_OR_COOP_MUTATION } from "./query/feedbackOrCoop";

import useToast from "../hooks/useToast";

export const useCreateFeedbackOrCoop = () => {
  const toast = useToast();
  const { mutateAsync } = useMutation<any, any, any>({
    mutationFn: async (form: FeedbackOrCoop) => {
      const { data } = await axios({
        data: {
          query: FEEDBACK_OR_COOP_MUTATION,
          variables: { data: form },
        },
      });
      console.log("data.data", data.data);
      return await data.data;
    },
    onSuccess: () => {
      toast("Actions.successAddress", "success");
    },
  });
  return { createFeedbackOrCoop: mutateAsync };
};
