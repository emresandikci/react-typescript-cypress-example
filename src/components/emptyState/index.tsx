import { IconType } from 'react-icons/lib';
import { MdOutlineErrorOutline as IconError } from 'react-icons/md';
import './index.css';

type EmptyState = {
  message: string;
  icon?: IconType;
};
export default function EmptyState({ message, icon: Icon }: EmptyState) {
  return (
    <div className="empy-state-container">
      <>
        {Icon || <IconError size={120} />}
        <p className="text-3xl">{message}</p>
      </>
    </div>
  );
}
