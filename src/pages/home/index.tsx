import { Comments, Posts } from 'pages';
import './index.css';

export default function Home() {
  return (
    <div className="home-container">
      <Posts />
      <Comments />
    </div>
  );
}
