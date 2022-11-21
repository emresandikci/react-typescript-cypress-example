import { useGetCommentsByPost, useRouter } from 'hooks';
import { useRef } from 'react';
import EmptyState from 'components/emptyState';
import { CommentsContainer } from 'containers';
import { CommentList, PostDetail } from 'components';

export default function Comments() {
  const { query } = useRouter();
  const { error, data } = useGetCommentsByPost(query.id);

  const scrollRef = useRef<HTMLDivElement>(null);

  if (error) {
    return (
      <CommentsContainer>
        <EmptyState message="Something Went Wrong!" />
      </CommentsContainer>
    );
  }

  if (!data?.comments?.length) {
    return (
      <CommentsContainer>
        <EmptyState message="No Comment Yet" />
      </CommentsContainer>
    );
  }

  return (
    <CommentsContainer innerRef={scrollRef}>
      <PostDetail />
      <CommentList />
    </CommentsContainer>
  );
}
