import { Button, Card, Tag } from 'ui';
import { IComment } from 'utils/types/comment';
import './index.css';

//icons
import { MdOutlineReply as IconReply, MdTag as IconTag } from 'react-icons/md';
import { useCommentContext } from 'containers/commentsContainer';

export default function CommentCard(comment: IComment) {
  const { toggleAddTagPopup, setSelectedComment } = useCommentContext();

  const handleAddTag = () => {
    setSelectedComment(comment);
    toggleAddTagPopup();
  };

  const { id, body, tags } = comment;

  return (
    <Card key={id} className="comment-card-container">
      <p>{body}</p>
      <div className="comment-footer">
        <div className="comment-tags">
          {tags?.map((tag, index) => (
            <Tag key={tag + index} color="red-light">
              {tag}
            </Tag>
          ))}
        </div>
        <div className="comment-actions">
          <Button leftIcon={IconReply} size="sm" color="secondary">
            Reply
          </Button>
          <Button leftIcon={IconTag} size="sm" color="yellow" onClick={handleAddTag}>
            Add Tag
          </Button>
        </div>
      </div>
    </Card>
  );
}
