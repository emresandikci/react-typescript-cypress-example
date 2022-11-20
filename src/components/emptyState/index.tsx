import { IconType } from 'react-icons/lib';
import { MdOutlineErrorOutline as IconError } from 'react-icons/md';

type EmptyState = {
  message: string;
  icon?: IconType;
};
export default function EmptyState({ message, icon: Icon }: EmptyState) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-4 text-gray-300">
      <>
        {Icon || <IconError size={120} />}
        <p className="text-3xl">{message}</p>
      </>
    </div>
  );
}
