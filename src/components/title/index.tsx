import classNames from 'classnames';
import { BaseComponentProps } from 'utils/types';
import './index.css';

export default function Title({ children, className }: BaseComponentProps) {
  const titleClassNames = classNames('title-container', className);
  return <div className={titleClassNames}>{children}</div>;
}
