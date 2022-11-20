import { useRef, useState } from 'react';
import { useGetPosts, useDebounce } from 'hooks';
import { usePostFilterSelector } from 'store/selectors/posts';
import { Input } from 'ui';
import { PostCard, Title } from 'components';
import { PostsContainer } from 'containers';

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
    <PostsContainer>
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
        <PostCard key={post.id} {...post} />
      ))}
    </PostsContainer>
  );
}
