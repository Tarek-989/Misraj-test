/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "react-query";
import client from "../apolloClient";
import { DELETE_POST } from "../queries";
import { Posts, TProps } from "../types";

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

                const newPosts = queryClient.setQueryData(['posts', page], (old: any) => {
                    return {
                        ...old,
                        data: old.data.filter((post: Posts) => post.id !== deletedPostId)
                    };
                });

                return { newPosts };
            },
        }
    );
};