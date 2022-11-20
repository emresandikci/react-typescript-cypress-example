import React from 'react';
import classNames from 'classnames';

interface ITextareaProps {
  className?: string;
  label?: string;
  caption?: string;
  hasError?: boolean;
  errorMessage?: string;
  leftIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  rightIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  maxLength?: number | string | any;
  value?: number | string | any;
  type?: string | any;
}

interface IconProps {
  icon?: React.FC<React.SVGProps<SVGSVGElement>> | any;
  color?: string;
  hasError?: boolean;
  isLoading?: boolean;
  isRightIcon?: boolean;
}

const Textarea = ({
  label = '',
  className,
  disabled,
  caption,
  value,
  maxLength,
  hasError,
  errorMessage,
  rightIcon,
  leftIcon,
  ...props
}: ITextareaProps &
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >) => {
  const baseClasses = classNames({ 'cursor-not-allowed': disabled, 'label-error': hasError });
  const errorClass = classNames({ 'textarea-error': hasError });
  const hasIconClass = classNames({ 'has-right-icon': rightIcon, 'has-left-icon': leftIcon });

  return (
    <div className="form-element">
      <label className={baseClasses}>
        {label && <div className="textarea-label">{label}</div>}
        <div className="relative">
          {renderIcon({ icon: leftIcon, hasError })}
          <textarea
            className={`textarea ${errorClass} ${hasIconClass} ${className}`}
            disabled={disabled}
            value={value}
            maxLength={maxLength}
            {...props}
          />
        </div>
        <div className="textarea-caption">
          <span className={`text-xs font-medium ${errorClass}`}>
            {hasError ? errorMessage : caption}
          </span>
          {maxLength > 0 && (
            <span>
              {value?.length || 0}/{maxLength}
            </span>
          )}
        </div>
      </label>
    </div>
  );
};

const renderIcon = ({
  icon: Icon = null,
  color = 'gray',
  hasError,
  isLoading,
  isRightIcon,
}: IconProps) => {
  if (Icon === null) return <></>;

  const getSpacesByDirection = () => {
    if (isRightIcon) return `pr-3 right-0`;
    if (!isRightIcon) return `pl-3 left-0`;
    return '';
  };

  let iconClasses = classNames({
    [`icon ${getSpacesByDirection()}`]: color,
    'animate-spin': isLoading,
    'absolute z-10 pt-4': true,
  });

  if (hasError) {
    iconClasses = classNames({
      [`icon ${getSpacesByDirection()}`]: color,
      'has-error': hasError,
      'animate-spin': isLoading,
    });
  }
  return (
    <span className={iconClasses}>
      <Icon width={20} height={20} />
    </span>
  );
};

Textarea.defaultProps = {
  label: '',
  caption: '',
  className: '',
  hasError: false,
  disabled: false,
};

export default Textarea;
