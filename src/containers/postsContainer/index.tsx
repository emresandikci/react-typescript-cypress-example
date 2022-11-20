import { BaseComponentProps } from 'utils/types';
import './index.css';

export default function PostsContainer({ children }: BaseComponentProps) {
  return <div className="posts-container">{children}</div>;
}
