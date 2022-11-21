import { Button, Card, Tag } from 'ui';
import { IComment } from 'utils/types/comment';
import { useCommentContext } from 'containers/commentsContainer';
import './index.css';

//icons
import { MdOutlineReply as IconReply, MdTag as IconTag } from 'react-icons/md';

interface ICommentCard {
  totalReplies?: number;
  comment: IComment;
  isRepliedComment?: boolean;
}
export default function CommentCard({ comment, totalReplies, isRepliedComment }: ICommentCard) {
  const { toggleAddTagPopup, setSelectedComment, toggleReplyCommentModal } = useCommentContext();

  const handleAddTag = () => {
    setSelectedComment(comment);
    toggleAddTagPopup();
  };
  const handleReplyComment = () => {
    setSelectedComment(comment);
    toggleReplyCommentModal();
  };
  const { id, body, tags, email } = comment;

  return (
    <Card key={id} className="comment-card-container">
      {email && <p className="user-email">{email}</p>}
      <p>{body}</p>
      <div className="comment-footer">
        <div className="comment-tags">
          {tags?.map((tag, index) => (
            <Tag key={tag + index} color="red-light">
              {tag}
            </Tag>
          ))}
        </div>
        {!isRepliedComment && (
          <div className="comment-actions">
            <Button leftIcon={IconReply} size="sm" color="secondary" onClick={handleReplyComment}>
              Reply ({totalReplies})
            </Button>

            <Button leftIcon={IconTag} size="sm" color="yellow" onClick={handleAddTag}>
              Add Tag ({tags?.length || 0})
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
