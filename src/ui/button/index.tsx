import React from 'react';
import { Loading, SIZES } from 'ui';
import cn from 'classnames';

interface IButtonProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'red' | 'gray' | 'yellow' | 'light';
  variant?: 'default' | 'ghost' | 'tab' | 'circle';
  leftIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  rightIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  isLoading?: boolean;
}

enum loadingSizeMapper {
  sm = 'xs',
  md = 'xs',
  lg = 'sm',
}

interface IRenderIconProps {
  icon?: React.FC<React.SVGProps<SVGSVGElement>> | any;
  color?: string;
  size?: string;
  variant?: string;
  isLoading?: boolean;
  isRightIcon?: boolean;
}

enum VARIANTS {
  circle = 'circle',
  ghost = 'ghost',
  tab = 'tab',
  default = 'default',
}

const Button = ({
  children,
  color = 'primary',
  size = SIZES.md,
  icon,
  variant = 'default',
  disabled,
  className = '',
  leftIcon,
  rightIcon,
  isLoading = false,

  ...props
}: IButtonProps &
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
  const classes = cn({
    btn: true,
    [`btn-${color}`]: color,
    [`btn-${size}`]: size,
    [`btn-${variant}`]: variant,
    'btn-disabled': disabled,
    'is-loading': isLoading,
    [className]: className,
  });

  if (variant !== VARIANTS.circle) {
    return (
      <button className={classes} disabled={disabled} {...props}>
        {
          <Loading
            isLoading={isLoading}
            size={loadingSizeMapper[size]}
            className="mr-2"
            isButton={true}
          />
        }
        {!isLoading && renderIcon({ icon: leftIcon, color, size })}
        {children}
        {renderIcon({ icon: rightIcon, color, size, isRightIcon: true })}
      </button>
    );
  }

  return (
    <button className={classes} disabled={disabled} {...props}>
      {icon && renderIcon({ icon, color, size, variant })}
      {!icon && children}
    </button>
  );
};

const renderIcon = ({
  icon: Icon = null,
  color = '',
  size = '',
  variant,
  isLoading,
  isRightIcon = false,
}: IRenderIconProps) => {
  if (Icon === null) return null;

  const getSpacesByDirection = () => {
    if (variant === VARIANTS.circle) return '';
    if (isRightIcon && size === SIZES.lg) return ` ml-3`;
    if (isRightIcon && size !== SIZES.lg) return ` ml-2`;
    if (!isRightIcon && size == SIZES.lg) return ` mr-3`;
    if (!isRightIcon && size !== SIZES.lg) return ` mr-2`;
    return '';
  };

  const iconClasses = cn({
    [`stroke-${color}-900] stroke-0 ${getSpacesByDirection()}`]: color,
    'animate-spin': isLoading,
  });

  if (variant !== VARIANTS.circle)
    return (
      <span className={iconClasses}>
        <Icon />
      </span>
    );

  if (React.isValidElement(Icon)) {
    return Icon;
  }

  return (
    <span className={iconClasses}>
      <Icon />
    </span>
  );
};

export default Button;
