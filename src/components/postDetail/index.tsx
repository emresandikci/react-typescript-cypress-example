import { Title } from 'components';
import { useGetPosts, useRouter } from 'hooks';
import { Card } from 'ui';
import './index.css';

export default function PostDetail() {
  const { query } = useRouter();
  const { data } = useGetPosts({ autoFetch: false });
  const post = data?.posts?.find(({ id }) => id == query.id);

  return (
    <div className="post-detail-container">
      <Title>Post Detail</Title>
      <Card>
        <p className="title">{post?.title}</p>
        <p>{post?.body}</p>
      </Card>
    </div>
  );
}
