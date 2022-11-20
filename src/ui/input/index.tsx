import React, { useState } from 'react';
import classNames from 'classnames';

export interface IInputProps {
  variant?: 'search' | 'default';
  label?: string;
  caption?: string;
  hasError?: boolean;
  errorMessage?: string;
  leftIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  rightIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  maxLength?: number | string | any;
  value?: string;
  innerRef?: React.Ref<HTMLInputElement>;
}

export default function Input({
  type,
  label,
  className = '',
  disabled,
  caption,
  hasError,
  value,
  maxLength,
  errorMessage,
  rightIcon,
  leftIcon,
  variant,
  innerRef,
  ...props
}: IInputProps &
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  const [inputType, setInputType] = useState(type);
  const baseClasses = classNames({ 'cursor-not-allowed': disabled, 'label-error': hasError });
  const errorClass = classNames({ 'input-error': hasError });
  const hasIconClass = classNames({ 'has-right-icon': rightIcon, 'has-left-icon': leftIcon });
  const classes = classNames({
    input: true,
    [`input-${variant}`]: variant,
    [className]: className,
  });
  return (
    <div className="form-element">
      <label className={baseClasses}>
        {label && <div className={`input-label`}>{label}</div>}
        <div className="relative">
          {type !== 'password' && renderIcon({ icon: leftIcon, hasError, setInputType })}
          <input
            type={inputType}
            className={`${classes} ${errorClass} ${hasIconClass}`}
            disabled={disabled}
            value={value}
            maxLength={maxLength}
            ref={innerRef}
            {...props}
          />
        </div>
        {(hasError || caption || maxLength > 0) && (
          <div className="input-caption">
            <span className={`text-xs font-medium ${errorClass}`}>
              {hasError ? errorMessage : caption}
            </span>
            {maxLength > 0 && (
              <span>
                {value?.length || 0}/{maxLength}
              </span>
            )}
          </div>
        )}
      </label>
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

const renderIcon = ({
  icon: Icon = null,
  color = 'gray',
  hasError,
  isLoading,
  type,
  isRightIcon = false,
}: IRenderIconProps) => {
  if (Icon === null) return null;

  const getSpacesByDirection = () => {
    if (isRightIcon) return `pr-3 right-0`;
    return `pl-3 left-0`;
  };

  let iconClasses = classNames({
    [`icon ${getSpacesByDirection()}`]: true,
    'animate-spin': isLoading,
    password: type === 'password',
  });

  if (hasError) {
    iconClasses = classNames({
      [`icon ${getSpacesByDirection()}`]: color,
      'has-error': hasError,
      'animate-spin': isLoading,
      password: type === 'password',
    });
  }

  return (
    <span className={`absolute z-10 stroke-0 pt-4 ${iconClasses}`}>
      <Icon width={20} height={20} />
    </span>
  );
};

Input.defaultProps = {
  label: '',
  caption: '',
  className: '',
  hasError: false,
  disabled: false,
};
