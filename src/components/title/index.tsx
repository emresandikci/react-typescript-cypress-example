import { BaseComponentProps } from 'utils/types';

export default function Title({ children }: BaseComponentProps) {
  return <p className="border-b border-gray-300 pb-4 text-xl font-semibold">{children}</p>;
}
