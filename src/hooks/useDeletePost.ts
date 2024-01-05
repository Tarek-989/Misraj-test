/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "react-query";
import client from "../apolloClient";
import { DELETE_POST } from "../queries";
import { TProps } from "../types";

export const useDeletePost = ({ page }: TProps) => {
    const queryClient = useQueryClient();

    return useMutation(
        'deletePost',
        (postId?: string) => client.mutate({
            mutation: DELETE_POST,
            variables: { id: postId },
        }),
        {
            onMutate: async (deletedPostId) => {
                await queryClient.cancelQueries(['posts', page]);

                const previousPosts = queryClient.getQueryData(['posts', page]);

                queryClient.setQueryData(['posts', page], (old: any) => {
                    return {
                        ...old,
                        posts: {
                            ...old.data,
                            data: old.data.filter((post: any) => post.id !== deletedPostId)
                        }
                    };
                });

                return { previousPosts };
            },
            onError: (_err, _variables, context) => {
                queryClient.setQueryData(['posts', page], context?.previousPosts);
            },
            onSettled: () => {
                queryClient.invalidateQueries(['posts', page]);
            },
        }
    );
};