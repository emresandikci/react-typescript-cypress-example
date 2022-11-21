import reactDom from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BaseComponentProps } from 'utils/types';
import classNames from 'classnames';
import Card from 'ui/card';
import './index.css';
import Button from 'ui/button';
import { Title } from 'components';

//icons
import { ReactComponent as IconClose } from 'assets/icons/close.svg';

export interface IPopupProps extends BaseComponentProps {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
}

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

export default function Popup({
  isOpen,
  className,
  children,
  title = 'Popup Title',
  onClose,
  ...props
}: IPopupProps) {
  const baseClassNames = classNames('popup-container popup-overlay ');
  const popupContentClassNames = classNames('popup-content', className);
  return reactDom.createPortal(
    <div className={baseClassNames}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={modalAnimations}
            initial={modalAnimations.hidden}
            animate={modalAnimations.visible}
            exit={modalAnimations.exit}
          >
            <Card className={popupContentClassNames} {...props}>
              <div className="popup-header">
                {title && <Title className="!m-0 border-none !p-0">{title}</Title>}
                <Button
                  color="gray"
                  size="sm"
                  variant="circle"
                  onClick={onClose}
                  icon={IconClose}
                />
              </div>
              {children}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>,
    document?.body
  );
}
