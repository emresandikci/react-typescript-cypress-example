import { useGetCommentsByPost, useGetPosts, useRouter } from 'hooks';
import { FormEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { addComment } from 'store/actions/comments';
import { IComment } from 'utils/types/comment';

export default function Comments() {
  const { query } = useRouter();
  const { isLoading, error, data } = useGetCommentsByPost(query.id);
  const { data: posts } = useGetPosts({ autoFetch: false });
  const [newComment, setNewComment] = useState<string>('');
  const selectedPost = posts?.find((post) => post.id == query.id);

  const dispatch = useDispatch<AppDispatch<IComment>>();
  const scrollRef = useRef<HTMLDivElement>(null);

  const onChangeNewComment = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setNewComment(value);
  };

  const onSubmitComment = (e: FormEvent) => {
    e.preventDefault();
    dispatch(addComment({ postId: query?.id, body: newComment, tags: [] })).then(() => {
      setNewComment('');
    });
  };

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>something went wrong</div>;
  }

  if (!data?.comments?.length) {
    console.log('no');
    return (
      <div className="flex flex-col gap-y-4 justify-center items-center w-full">
        <div className="flex flex-col p-4 justify-center gap-y-4 bg-white w-1/2 rounded-lg h-28">
          <div className="h-3 bg-gray-200 w-1/4"></div>
          <div className="h-3 bg-gray-200 w-2/3"></div>
          <div className="h-3 bg-gray-200 w-1/1"></div>
        </div>
        <p className="text-3xl">No Comment Yet</p>
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="flex flex-col gap-y-6 flex-1 p-6 h-screen overflow-y-auto">
      <div>
        <p className="text-3xl mb-4 text-center font-semibold first-letter:uppercase">
          {selectedPost?.title}
        </p>
        <p>{selectedPost?.body}</p>
      </div>
      {data?.comments?.length && (
        <div>
          <p className="text-xl font-medium border-b border-gray-300">Comments</p>
          <form onSubmit={onSubmitComment} className="flex flex-col gap-y-2">
            <textarea className="p-4" value={newComment} onChange={onChangeNewComment}></textarea>
            <button
              className="p-2 bg-green-500 rounded-md disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-100"
              type="submit"
              disabled={newComment.length <= 3}
            >
              Submit comment
            </button>
          </form>
        </div>
      )}
      <div className="flex flex-col gap-y-4">
        {data?.comments?.map((comment, index) => (
          <div
            className="flex flex-col gap-y-2 bg-white shadow-md p-4 rounded-lg"
            key={comment.id + index}
          >
            <p>{comment.body}</p>
            <div className="flex gap-x-2">
              {comment.tags?.map((tag, index) => (
                <span
                  className="font-semibold bg-orange-300 text-white p-2 px-4 rounded-3xl text-sm"
                  key={tag + index}
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-x-4">
              <button className="p-2 bg-green-500 rounded-md">reply comment</button>
              <button className="p-2 bg-red-300 rounded-md">add tag</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
