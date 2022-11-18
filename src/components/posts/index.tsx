import { useGetPosts } from 'hooks';
import { Link } from 'react-router-dom';

export default function Posts() {
  const { data: posts, isLoading, error } = useGetPosts();

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>something went wrong</div>;
  }

  return (
    <div className="flex-2 w-80 border-r h-screen overflow-y-auto p-4">
      <h3>data:</h3>
      <div>
        {posts?.map((post) => (
          <p key={post.id}>
            <Link to={`/${post.id}`} className="cursor-pointer hover:underline">
              {post.userId}- {post.title}
            </Link>
          </p>
        ))}
      </div>
    </div>
  );
}
