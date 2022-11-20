import { useState, useEffect } from 'react';

interface IUseModalProps {
  isOpen?: boolean;
  shouldBeBlockScroll?: boolean;
}

const HIDDEN = 'overflow:hidden';
const VISIBLE = 'overflow:auto';

export default function useModal({
  shouldBeBlockScroll = true,
  isOpen = false,
}: IUseModalProps): [boolean, () => void, (isOpen: boolean) => void] {
  const [isActive, setIsActive] = useState(isOpen);

  useEffect(() => {
    if (shouldBeBlockScroll) {
      document.body.setAttribute('style', isActive ? HIDDEN : VISIBLE);
    }
  }, [isActive, shouldBeBlockScroll]);

  const toggleModal = (): void => setIsActive((prevState) => !prevState);

  return [isActive, toggleModal, setIsActive];
}
