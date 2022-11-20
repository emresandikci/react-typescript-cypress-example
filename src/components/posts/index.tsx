import Title from 'components/title';
import { useGetPosts } from 'hooks';
import { useDebounce } from 'hooks/';
import React from 'react';
import { useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import { usePostFilterSelector } from 'store/selectors/posts';
import { Button, Card, Input } from 'ui';
import { BaseComponentProps } from 'utils/types';

export default function Posts() {
  const { data, isLoading, error } = useGetPosts();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchParam, setSearchParam] = useState('');

  const debouncedSearchParam = useDebounce<string, HTMLInputElement>(
    searchParam,
    300,
    searchInputRef
  );

  const filteredPosts = usePostFilterSelector(debouncedSearchParam);

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>something went wrong</div>;
  }

  return (
    <PostContainer>
      <Title>Posts ({data?.posts?.length})</Title>
      {debouncedSearchParam && (
        <p className="font-semibold">Total Search Result:{filteredPosts?.length}</p>
      )}

      <Input
        innerRef={searchInputRef}
        value={searchParam}
        placeholder="Type somethings to search post..."
        onChange={(e) => setSearchParam(e.target.value)}
      />

      {filteredPosts?.map((post) => (
        <Card key={post.id}>
          <div className="flex flex-col gap-y-4">
            <p key={post.id} className="text-lg font-semibold first-letter:uppercase">
              {post.title}
            </p>
            <p>{post.body.substring(0, 120)}...</p>

            <Link to={`/${post.id}`} className="cursor-pointer">
              <Button className="w-full">view</Button>
            </Link>
          </div>
        </Card>
      ))}
    </PostContainer>
  );
}

const PostContainer: React.FC<BaseComponentProps> = ({ children }) => {
  return (
    <div className="flex-2 flex h-screen w-96 flex-col gap-y-4 overflow-y-auto border-r p-4">
      {children}
    </div>
  );
};
