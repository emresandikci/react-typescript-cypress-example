import { Comments, Posts } from 'pages';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { getUsers } from 'store/actions/users';
import { IUser } from 'utils/types/user';
import './index.css';

export default function Home() {
  const dispatch = useDispatch<AppDispatch<IUser>>();
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  return (
    <div className="home-container">
      <Posts />
      <Comments />
    </div>
  );
}
