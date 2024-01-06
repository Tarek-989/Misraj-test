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
            })
        },
        {
            onMutate: async (newPost) => {
                await queryClient.cancelQueries(['posts', page]);

                const newposts = queryClient.setQueryData(['posts', page], (oldQueryData: any) => {

                    return {
                        ...oldQueryData,
                        data: [
                            {
                                ...oldQueryData.data[0],
                                id: Math.random().toString()[0],
                                title: newPost.input.title,
                            },
                            ...oldQueryData.data,
                        ],
                    };
                });

                return { newposts };
            },
        }
    );
};
