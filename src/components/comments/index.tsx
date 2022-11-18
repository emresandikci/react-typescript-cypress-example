import { useGetCommentsByPost, useRouter } from 'hooks';

export default function Comments() {
  const { query } = useRouter();

  const { isLoading, error, data: comments } = useGetCommentsByPost(query.id);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>something went wrong</div>;
  }

  if (comments?.length === 0) {
    return (
      <div className="flex-1">
        <p>no comment yet</p>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <p className="text-xl font-semibold">Comments</p>
      <div className="flex flex-col gap-y-4">
        {comments?.map((comment) => (
          <p key={comment.id}>{comment.body}</p>
        ))}
      </div>
    </div>
  );
}
