import { Link } from 'react-router-dom';
import { Button, Card } from 'ui';
import { IPost } from 'utils/types/post';
import './index.css';

export default function PostCard({ id, title, body }: IPost) {
  return (
    <Card key={id}>
      <div className="post-card-content">
        <p key={id} className="title">
          {title}
        </p>
        <p>{body.substring(0, 50)}...</p>

        <Link to={`/${id}`} className="cursor-pointer">
          <Button className="w-full">view</Button>
        </Link>
      </div>
    </Card>
  );
}
