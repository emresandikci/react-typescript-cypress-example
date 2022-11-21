import { useRouter } from 'hooks';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { addComment } from 'store/actions/comments';
import { Button, Card, Input, Modal, Textarea } from 'ui';
import { IModalProps } from 'ui/modal';
import { IComment } from 'utils/types/comment';
import './index.css';

export default function CreateCommentModal({ onClose }: IModalProps) {
  const { query } = useRouter();

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
    dispatch(addComment({ postId: query?.id, body: newComment, name, email })).then(() => {
      setNewComment('');
      setName('');
      setEmail('');
      onClose && onClose();
    });
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <Modal.Right title="Add Comment">
        <Card className="create-comment-content">
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
          <div className="create-comment-footer">
            <Button
              color="secondary"
              className="w-full"
              type="button"
              disabled={newComment.length <= 3 || !name || !email.includes('@')}
              onClick={onSubmitComment}
            >
              Create
            </Button>
          </div>
        </Card>
      </Modal.Right>
    </Modal>
  );
}
