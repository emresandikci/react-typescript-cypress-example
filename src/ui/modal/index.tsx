import React from 'react';
import reactDom from 'react-dom';

import classNames from 'classnames';
import { Button } from 'ui';
import { ReactComponent as IconClose } from 'assets/icons/close.svg';
import { AnimatePresence, motion } from 'framer-motion';
interface IModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

type Ref = HTMLDivElement | null;

type ChildProps = Omit<IModalProps, 'isOpen'>;

const Modal = ({
  className = '',
  children,
  isOpen = false,

  onClose,
  ...props
}: IModalProps & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  const baseClassNames = classNames('modal', {
    'modal-open': isOpen,
    [className]: className,
  });

  const childrenWithProps = React.Children.map(children, (child) => {
    if (child) {
      return React.cloneElement(child as React.ReactElement<ChildProps>, {
        onClose,
      });
    }
    return null;
  });

  const modalAnimations = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  return reactDom.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={modalAnimations}
          initial={modalAnimations.hidden}
          animate={modalAnimations.visible}
          exit={modalAnimations.exit}
        >
          <div
            className={baseClassNames}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
            {...props}
          >
            <div className="modal-container">{childrenWithProps}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document?.body
  );
};

const Top = React.forwardRef<Ref, ChildProps & React.HTMLAttributes<HTMLElement>>(
  ({ className = '', children = null, onClose }, ref) => {
    const topClassNames = classNames({
      'modal-top': true,
      [className]: className,
    });
    const topModalAnimations = {
      hidden: {
        y: -1000,
        opacity: 0,
      },
      visible: {
        y: 0,
        opacity: 1,
      },
      exit: {
        y: '-100vh',
        opacity: 0,
      },
    };
    return (
      <motion.div
        variants={topModalAnimations}
        initial={'hidden'}
        animate={'visible'}
        exit={'exit'}
        transition={{
          type: 'spring',
          bounce: 0,
        }}
        className={topClassNames}
        ref={ref}
      >
        <ContentContainer onClose={onClose}>{children}</ContentContainer>
      </motion.div>
    );
  }
);

const Bottom = React.forwardRef<Ref, ChildProps & React.HTMLAttributes<HTMLElement>>(
  ({ className = '', children = null, onClose }, ref) => {
    const bottomClassNames = classNames({
      'modal-bottom': true,
      [className]: className,
    });
    const bottomModalAnimations = {
      hidden: {
        y: '200vw',
        opacity: 0,
      },
      visible: {
        y: 0,
        opacity: 1,
      },
      exit: {
        y: '200vw',
        opacity: 0,
      },
    };
    return (
      <motion.div
        ref={ref}
        className={bottomClassNames}
        variants={bottomModalAnimations}
        initial={'hidden'}
        animate={'visible'}
        exit={'exit'}
        transition={{
          type: 'spring',
          bounce: 0,
        }}
      >
        <ContentContainer onClose={onClose}>{children}</ContentContainer>
      </motion.div>
    );
  }
);

const Left = React.forwardRef<Ref, ChildProps & React.HTMLAttributes<HTMLElement>>(
  ({ className = '', children = null, onClose }, ref) => {
    const leftClassNames = classNames({
      'modal-left': true,
      [className]: className,
    });
    const leftModalAnimations = {
      hidden: {
        x: '-100vw',
      },
      visible: {
        x: 0,
      },
      exit: {
        x: '-100vw',
      },
    };
    return (
      <motion.div
        className={leftClassNames}
        ref={ref}
        variants={leftModalAnimations}
        initial={'hidden'}
        animate={'visible'}
        exit={'exit'}
        transition={{
          type: 'spring',
          bounce: 0,
        }}
      >
        <ContentContainer onClose={onClose}>{children}</ContentContainer>
      </motion.div>
    );
  }
);

const Right = React.forwardRef<Ref, ChildProps & React.HTMLAttributes<HTMLElement>>(
  ({ className = '', children = null, onClose }, ref) => {
    const rightClassNames = classNames({
      'modal-right': true,
      [className]: className,
    });
    const rightModalAnimations = {
      hidden: {
        x: 900,
      },
      visible: {
        x: 0,
      },
      exit: {
        x: 900,
      },
    };
    return (
      <motion.div
        variants={rightModalAnimations}
        initial={'hidden'}
        animate={'visible'}
        exit={'exit'}
        className={rightClassNames}
        transition={{
          type: 'spring',
          bounce: 0,
        }}
        ref={ref}
      >
        <ContentContainer onClose={onClose}>{children}</ContentContainer>
      </motion.div>
    );
  }
);

const ContentContainer = ({
  children,
  onClose,
}: ChildProps & React.HTMLAttributes<HTMLElement>) => (
  <div className="relative">
    <div className="absolute right-0 top-0 z-10">
      <Button color="gray" variant="circle" onClick={onClose} icon={IconClose} />
    </div>
    <div className="pt-6">{children}</div>
  </div>
);

Bottom.displayName = 'Bottom';
Left.displayName = 'Left';
Right.displayName = 'Right';
Top.displayName = 'Top';

Modal.Bottom = Bottom;
Modal.Left = Left;
Modal.Right = Right;
Modal.Top = Top;

export default Modal;
