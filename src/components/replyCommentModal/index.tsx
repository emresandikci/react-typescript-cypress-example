import CommentCard from 'components/commentCard';
import { useCommentContext } from 'containers/commentsContainer';
import { useRouter } from 'hooks';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { addComment } from 'store/actions/comments';

import { Button, Card, Input, Modal, Textarea } from 'ui';
import { IModalProps } from 'ui/modal';
import { IComment } from 'utils/types/comment';
import './index.css';

export default function ReplyCommentModal({ onClose }: IModalProps) {
  const { query } = useRouter();
  const { selectedComment, toggleReplyCommentModal } = useCommentContext();
  const [newComment, setNewComment] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const dispatch = useDispatch<AppDispatch<IComment>>();

  const onChangeName = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setName(value);
  };

  const onChangeEmail = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setEmail(value);
  };
  const onChangeNewComment = (e: { target: { value: string } }) => {
    const { value } = e.target;
    setNewComment(value);
  };

  const onSubmitComment = () => {
    dispatch(
      addComment({
        postId: query?.id,
        body: newComment,
        name,
        email,
        parentId: selectedComment?.id,
      })
    ).then(() => {
      setNewComment('');
      setName('');
      setEmail('');
      toggleReplyCommentModal();
    });
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <Modal.Right title="Reply the Comment" className="overflow-y-auto">
        <div className="flex flex-col gap-y-4">
          <Card className="bg-gray-200 p-4 text-gray-400 shadow-lg">
            <div>
              <span className="font-semibold">Autor:</span>
              <span className="text-md">{selectedComment?.email}</span>
            </div>
            <div>{selectedComment?.body}</div>
          </Card>
          {selectedComment?.replies?.map((comment) => (
            <CommentCard comment={comment} isRepliedComment />
          ))}
          <Card className="reply-comment-content mb-6">
            <Input label="Name" name="name" onChange={onChangeName} value={name} />
            <Input label="Email" name="email" onChange={onChangeEmail} value={email} />
            <Textarea
              label="Comment"
              name="body"
              className="p-4"
              value={newComment}
              onChange={onChangeNewComment}
              placeholder="Type some comment"
            />
            <div className="reply-comment-footer">
              <Button
                color="secondary"
                className="w-full"
                type="button"
                disabled={newComment.length <= 3 || !name || !email.includes('@')}
                onClick={onSubmitComment}
              >
                Reply
              </Button>
            </div>
          </Card>
        </div>
      </Modal.Right>
    </Modal>
  );
}
