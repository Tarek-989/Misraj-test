/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from 'react-query';
import client from '../apolloClient';
import { UPDATE_POST } from '../queries';
import { TProps } from '../types';

export const useUpdatePost = ({ page }: TProps) => {
    const queryClient = useQueryClient();

    return useMutation(
        (updatedPostData: any) => client.mutate({
            mutation: UPDATE_POST,
            variables: updatedPostData,
        }),
        {
            onMutate: async (updatedPost) => {
                await queryClient.cancelQueries(['posts', page]);

                const previousPosts = queryClient.getQueryData(['posts', page]);

                queryClient.setQueryData(['posts', page], (oldQueryData: any) => {
                    return {
                        ...oldQueryData,
                        data: oldQueryData.data.map((post: any) =>
                            post.id === updatedPost.id ? { ...post, ...updatedPost } : post
                        ),
                    };
                });

                return { previousPosts };
            },
            onError: (_err, _newPost, context) => {
                queryClient.setQueryData(['posts', page], context?.previousPosts);
            },
            onSettled: () => {
                queryClient.invalidateQueries(['posts', page]);
            },
        }
    );
};
