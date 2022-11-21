import React from 'react';

import classNames from 'classnames';
import { SIZES } from 'ui';

export interface ITagProps {
  size?: 'sm' | 'md' | 'lg';
  color?:
    | 'primary'
    | 'secondary'
    | 'red'
    | 'gray'
    | 'yellow'
    | 'primary-light'
    | 'secondary-light'
    | 'red-light'
    | 'gray-light'
    | 'yellow-light'
    | 'primary-dark'
    | 'secondary-dark'
    | 'red-dark'
    | 'gray-dark'
    | 'yellow-dark';
  leftIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  rightIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  isSelected?: boolean;
}

export default function Tag({
  children,
  color,
  size,
  leftIcon,
  rightIcon,
  isSelected,
  className = '',
  ...props
}: ITagProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  const baseClassNames = classNames({
    tag: true,
    [`tag-${color}`]: color,
    [`tag-${size}`]: size,
    [className]: className,
  });
  return (
    <div className={baseClassNames} {...props}>
      {leftIcon && renderIcon({ icon: leftIcon, size, color })}
      <span>{children}</span>
      {rightIcon && renderIcon({ icon: rightIcon, size, color, isRightIcon: true })}
    </div>
  );
}

interface IRenderIconProps {
  icon?: React.FC<React.SVGProps<SVGSVGElement>> | any;
  color?: string;
  size?: string;
  variant?: string;
  isLoading?: boolean;
  isRightIcon?: boolean;
  hasError?: boolean;
  setInputType?: (type: string | any) => void;
  inputType?: string;
  type?: string;
}

const renderIcon = ({ icon: Icon = null, size = '', isRightIcon = false }: IRenderIconProps) => {
  if (Icon === null) return null;

  const getSpacesByDirection = () => {
    if (isRightIcon && size === SIZES.lg) return ` ml-[9.33px]`;
    if (isRightIcon && size !== SIZES.lg) return ` ml-[9.33px]`;
    if (!isRightIcon && size == SIZES.lg) return ` mr-[9.33px]`;
    if (!isRightIcon && size !== SIZES.lg) return ` mr-[9.33px]`;
    return '';
  };

  const iconClasses = `fill ${getSpacesByDirection()}`;

  if (React.isValidElement(Icon)) {
    return Icon;
  }

  return (
    <span className={`fill-current stroke-current ${iconClasses}`}>
      <Icon />
    </span>
  );
};

Tag.defaultProps = {
  color: 'primary',
  size: 'sm',
  className: '',
  isSelected: false,
};
