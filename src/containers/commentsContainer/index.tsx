import { useContext, createContext, useState } from 'react';
import { AddTagPopup, CreateCommentModal, ReplyCommentModal } from 'components';
import { useModal } from 'hooks';
import { BaseComponentProps } from 'utils/types';
import { IComment } from 'utils/types/comment';
import './index.css';

type CommentContextState = {
  toggleCreateCommentModal: () => void;
  isCreateCommentModalActive: boolean;
  toggleAddTagPopup: () => void;
  isAddTagPopupActive: boolean;
  isReplyCommentModalActive: boolean;
  toggleReplyCommentModal: () => void;
  selectedComment: IComment | null;
  setSelectedComment: (comment: IComment | null) => void;
};

const initialContextState: CommentContextState = {
  toggleCreateCommentModal: () => {},
  isCreateCommentModalActive: false,
  toggleAddTagPopup: () => {},
  isAddTagPopupActive: false,
  selectedComment: null,
  setSelectedComment: () => {},
  isReplyCommentModalActive: false,
  toggleReplyCommentModal: () => {},
};

export const CommentContext = createContext<CommentContextState>(initialContextState);

interface ICommentsContainer extends BaseComponentProps {
  innerRef?: React.Ref<HTMLDivElement>;
}

export default function CommentsContainer({ children, innerRef, ...props }: ICommentsContainer) {
  const [isCreateCommentModalActive, toggleCreateCommentModal] = useModal({});
  const [isAddTagPopupActive, toggleAddTagPopup] = useModal({});
  const [selectedComment, setSelectedComment] = useState<IComment | null>(null);
  const [isReplyCommentModalActive, toggleReplyCommentModal] = useModal({});

  return (
    <CommentContext.Provider
      value={{
        toggleCreateCommentModal,
        isCreateCommentModalActive,
        toggleAddTagPopup,
        isAddTagPopupActive,
        selectedComment,
        setSelectedComment,
        isReplyCommentModalActive,
        toggleReplyCommentModal,
      }}
    >
      <div ref={innerRef} className="comments-container" {...props}>
        {children}
      </div>
      {isCreateCommentModalActive && <CreateCommentModal onClose={toggleCreateCommentModal} />}
      {isReplyCommentModalActive && <ReplyCommentModal onClose={toggleReplyCommentModal} />}
      {isAddTagPopupActive && <AddTagPopup isOpen={isAddTagPopupActive} />}
    </CommentContext.Provider>
  );
}

export const useCommentContext = () => useContext(CommentContext);
