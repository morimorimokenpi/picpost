import React from "react";
import { useQuery, gql } from "@apollo/client";

interface UserProps {
  loading: boolean;
  users: [User];
}

interface User {
  id: string;
  nickname: string;
  email: string;
  passwordDigest: string;
  posts: [Posts];
}

interface Posts {
  id: string;
  title: string;
  content: string;
  userId: number;
}

const GET_USERS = gql`
  {
    users {
      id
      nickname
      email
      passwordDigest
      posts {
        id
        title
        content
        userId
      }
    }
  }
`;

const Post: React.FC = () => {
  const { loading, error, data } = useQuery<UserProps>(GET_USERS);

  if (loading) return "ロード中...";
  if (error) return `Error ${error.message}`;
  return (
    <>
      {data?.users.map((user) => (
        <div key={user.id}>
          <h1>{user.nickname}</h1>
          {user.posts.map((post) => (
            <div key={post.id}>
              <h1>{post.title}</h1>
              <h2>{post.content}</h2>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Post;
