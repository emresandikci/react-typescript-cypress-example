import React from 'react';
import classNames from 'classnames';

interface ICardProps {
  header?: any | string;
  body?: any | string;
  footer?: any | string;
}

function Card({
  children,
  header,
  body,
  footer,
  className = '',
  ...props
}: ICardProps & React.HTMLAttributes<HTMLDivElement>) {
  const classes = classNames({ card: true, [className]: className });
  return (
    <div className={classes} {...props}>
      {header && renderByComponentType(header, Header)}
      {body && renderByComponentType(body, Body)}
      {!body && children}
      {footer && renderByComponentType(footer, Footer)}
    </div>
  );
}

interface IRenderByComponentType {
  element: React.ReactNode;
  Wrapper: React.ComponentType<any>;
}

const renderByComponentType: React.FC<IRenderByComponentType> = (element, Wrapper) => {
  return <Wrapper>{element}</Wrapper>;
};

interface IChildComponentProps {
  children: React.ReactNode;
}

const Header = function Header({ children, ...props }: IChildComponentProps) {
  const classes = classNames({ 'card-header': true });
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

const Body = function Body({ children, ...props }: IChildComponentProps) {
  const classes = classNames({ 'card-body': true });
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

const Footer = function Footer({ children, ...props }: IChildComponentProps) {
  const classes = classNames({ 'card-footer': true });
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

Card.defaultProps = {
  className: '',
};

Card.Header = Header;
Card.Body = Body;

export default Card;
