import { Comments, Posts } from 'components';

export default function Home() {
  return (
    <div className="flex gap-x-4">
      <Posts />
      <Comments />
    </div>
  );
}
