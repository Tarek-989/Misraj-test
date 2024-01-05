import { gql } from '@apollo/client';

export const GET_POSTS = gql`
query($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
        user {
          id
          name
          albums {
            data {
              photos {
                data {
                  title
                  url
                }
              }
            }
          }
        }
      }
      meta {
        totalCount
      }
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      body
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      title
      body
    }
  }
`;