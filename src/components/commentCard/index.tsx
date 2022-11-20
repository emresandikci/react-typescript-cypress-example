import { Button, Card, Tag } from 'ui';
import { IComment } from 'utils/types/comment';
import './index.css';

//icons
import { MdOutlineReply as IconReply } from 'react-icons/md';

export default function CommentCard({
  id,
  body,
  tags = ['tags', 'tag', 'tgsss', 'tags', 'tag', 'tgsss'],
}: IComment) {
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
          <Button size="sm" color="yellow">
            Add Tag
          </Button>
        </div>
      </div>
    </Card>
  );
}
