import { Title } from 'components';
import { useCommentContext } from 'containers/commentsContainer';
import { useCommentsSelector } from 'store/selectors/comments';
import { Button } from 'ui';
import CommentCard from '../commentCard';
import './index.css';

//icons
import { MdOutlineComment as IconComment } from 'react-icons/md';

export default function CommentList() {
  const { comments, totalComments } = useCommentsSelector();
  const { toggleCreateCommentModal } = useCommentContext();

  return (
    <div className="comment-list-container">
      <Title className="title">
        Comments ({totalComments})
        <Button leftIcon={IconComment} onClick={toggleCreateCommentModal}>
          Add Comment
        </Button>
      </Title>
      <div className="comment-list">
        {comments?.map((comment, index) => (
          <CommentCard
            key={index + comment.id}
            comment={comment}
            totalReplies={comment.replies.length}
          />
        ))}
      </div>
    </div>
  );
}
