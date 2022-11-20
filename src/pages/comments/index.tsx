import { useGetCommentsByPost, useRouter } from 'hooks';
import { useRef } from 'react';
import { Loading } from 'ui';
import EmptyState from 'components/emptyState';
import { CommentsContainer } from 'containers';
import { CommentList, PostDetail } from 'components';

export default function Comments() {
  const { query } = useRouter();
  const { isLoading, error, data } = useGetCommentsByPost(query.id);

  const scrollRef = useRef<HTMLDivElement>(null);

  if (isLoading) {
    return <Loading isLoading />;
  }

  if (error) {
    return <EmptyState message="Something Went Wrong!" />;
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
