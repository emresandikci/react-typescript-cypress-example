import { CreateCommentModal } from 'components';
import { useModal } from 'hooks';
import { useContext, createContext } from 'react';
import { BaseComponentProps } from 'utils/types';
import './index.css';

type CommentContextState = {
  toggleCreateCommentModal: () => void;
  isCreateCommentModalActive: boolean;
};

const initialContextState: CommentContextState = {
  toggleCreateCommentModal: () => {},
  isCreateCommentModalActive: false,
};

export const CommentContext = createContext<CommentContextState>(initialContextState);

interface ICommentsContainer extends BaseComponentProps {
  innerRef?: React.Ref<HTMLDivElement>;
}

export default function CommentsContainer({ children, innerRef, ...props }: ICommentsContainer) {
  const [isCreateCommentModalActive, toggleCreateCommentModal] = useModal({});

  return (
    <CommentContext.Provider
      value={{
        toggleCreateCommentModal,
        isCreateCommentModalActive,
      }}
    >
      <div ref={innerRef} className="comments-container" {...props}>
        {children}
      </div>
      {isCreateCommentModalActive && <CreateCommentModal onClose={toggleCreateCommentModal} />}
    </CommentContext.Provider>
  );
}

export const useCommentContext = () => useContext(CommentContext);
