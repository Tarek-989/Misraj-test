/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from 'react-query';
import client from '../apolloClient';
import { CREATE_POST } from '../queries';
import { TProps } from '../types';

export const useCreatePost = ({ page }: TProps) => {
    const queryClient = useQueryClient();

    return useMutation(
        (newPostData: any) => {
            return client.mutate({
            mutation: CREATE_POST,
            variables: newPostData,
        })},
        {
            onMutate: async (newPost) => {
                await queryClient.cancelQueries(['posts', page]);

                const previousPosts = queryClient.getQueryData(['posts', page]);

                queryClient.setQueryData(['posts', page], (oldQueryData: any) => {

                    return {
                        ...oldQueryData,
                        data: [
                            ...oldQueryData.data,
                            { ...newPost, id: Math.random().toString() },
                        ],
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
