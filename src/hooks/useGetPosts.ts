import { useQuery } from "react-query";
import client from "../apolloClient";
import { GET_POSTS } from "../queries";
import { TProps } from '../types';

export const useGetPosts = ({ page }: TProps) => {
    return useQuery(['posts', page], async () => {
        const { data } = await client.query({
            query: GET_POSTS,
            variables: {
                options: {
                    paginate: {
                        page: page,
                        limit: 5
                    }
                }
            },
            fetchPolicy: 'cache-first',
        });
        return data.posts;
    }, {
        keepPreviousData: true,
    });
};