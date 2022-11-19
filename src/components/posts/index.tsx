import { useGetPosts } from 'hooks';
import { useDebounce } from 'hooks/';
import { useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import { IPost } from 'utils/types/post';

export default function Posts() {
  const { data: posts, isLoading, error, reFetch } = useGetPosts();
  const searchInputRef = useRef(null);
  const [searchParam, setSearchParam] = useState('');

  const debouncedSearchParam = useDebounce<string, HTMLInputElement>(
    searchParam,
    300,
    searchInputRef
  );

  const onFilterPosts = (post: IPost) => {
    return (
      post.body.toLocaleLowerCase().includes(debouncedSearchParam) ||
      post.userId.toString().toLocaleLowerCase() == debouncedSearchParam ||
      post.title.toLocaleLowerCase().includes(debouncedSearchParam)
    );
  };

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>something went wrong</div>;
  }

  return (
    <div className="flex flex-col gap-y-4 flex-2 w-96 border-r h-screen overflow-y-auto p-4">
      <p className="font-semibold text-xl">Posts</p>
      <input
        type="text"
        ref={searchInputRef}
        value={searchParam}
        placeholder="Enter a keyword, ex: userId, title, user name, body"
        className="p-2 text-sm rounded-md"
        onChange={(e) => setSearchParam(e.target.value)}
      />
      <div className="flex flex-col gap-y-4">
        {posts?.filter(onFilterPosts).map((post) => (
          <Link to={`/${post.id}`} className="cursor-pointer hover:underline">
            <div className="flex flex-col gap-y-4 p-4 bg-white rounded-lg">
              <p key={post.id} className="font-semibold text-lg first-letter:uppercase">
                {post.title}
              </p>
              <p>{post.body.substring(0, 120)}...</p>
              <button className="p-2 bg-green-600 rounded-md">see more</button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
