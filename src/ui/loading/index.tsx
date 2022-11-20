import React from 'react';
import classNames from 'classnames';

interface ILoadingProps {
  isLoading: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'green' | 'gray' | 'red' | 'yellow' | 'rose' | 'purple' | 'orange' | 'blue';
  isButton?: boolean;
}
const Loading = ({
  isLoading = true,
  size = 'xs',
  color = 'gray',
  className = '',
  isButton = false,
}: ILoadingProps & React.HTMLAttributes<HTMLDivElement>) => {
  const baseClassNames = classNames(
    'loading spinner-border animate-spin inline-block rounded-full border-t-transparent',
    {
      [`spinner-size-${size}`]: size,
      [`border-${color}-500`]: color && !isButton,
      [`border-current`]: isButton,
      [className]: className,
    }
  );
  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <div className={baseClassNames} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  return <></>;
};

export default Loading;
