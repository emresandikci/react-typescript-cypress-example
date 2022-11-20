import { useGetCommentsByPost, useGetPosts, useRouter } from 'hooks';
import React, { FormEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { addComment } from 'store/actions/comments';
import { Button, Card, Input, Tag, Textarea } from 'ui';
import { IComment } from 'utils/types/comment';
import { MdOutlineReply as IconReply } from 'react-icons/md';
import { BaseComponentProps } from 'utils/types';
import EmptyState from 'components/emptyState';
import { useCommentsSelector } from 'store/selectors';
import Title from 'components/title';

interface ICommentContainer extends BaseComponentProps {
  innerRef?: React.Ref<HTMLDivElement>;
}

export default function Comments() {
  const { query } = useRouter();
  const { isLoading, error, data } = useGetCommentsByPost(query.id);

  const comments = useCommentsSelector();

  const scrollRef = useRef<HTMLDivElement>(null);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>something went wrong</div>;
  }

  if (!data?.comments?.length) {
    return (
      <CommentContainer>
        <EmptyState message="No Comment Yet" />
      </CommentContainer>
    );
  }

  return (
    <CommentContainer innerRef={scrollRef}>
      <PostDetail />
      {data?.comments?.length && <AddComment />}
      <Title>Comments ({comments?.length})</Title>
      <div className="flex flex-col gap-y-4">
        {data?.comments?.map((comment, index) => (
          <CommentCard key={index + comment.id} {...comment} />
        ))}
      </div>
    </CommentContainer>
  );
}

const PostDetail = () => {
  const { query } = useRouter();
  const { data } = useGetPosts({ autoFetch: false });
  const post = data?.posts?.find(({ id }) => id == query.id);

  return (
    <div className="flex flex-col gap-y-4">
      <Title>Post Detail</Title>
      <Card>
        <p className="mb-2 text-left text-3xl font-semibold first-letter:uppercase">
          {post?.title}
        </p>
        <p>{post?.body}</p>
      </Card>
    </div>
  );
};

const AddComment = () => {
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

  const onSubmitComment = (e: FormEvent) => {
    e.preventDefault();
    console.log(e.target);
    dispatch(addComment({ postId: query?.id, body: newComment, name, email })).then(() => {
      setNewComment('');
      setName('');
      setEmail('');
    });
  };
  return (
    <div className="flex flex-col gap-y-4">
      <Title>Add Comment</Title>
      <Card className="flex flex-col gap-y-4">
        <form onSubmit={onSubmitComment} className="flex flex-col gap-y-2">
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
          <Button
            color="secondary"
            type="submit"
            disabled={newComment.length <= 3 || !name || !email.includes('@')}
          >
            Submit comment
          </Button>
        </form>
      </Card>
    </div>
  );
};
const CommentCard = ({ id, body, tags }: IComment) => {
  return (
    <Card key={id} className="!shadow-none hover:shadow-bb">
      <p>{body}</p>
      <div className="flex gap-x-2">
        {tags?.map((tag, index) => (
          <span
            className="rounded-3xl bg-orange-300 p-2 px-4 text-sm font-semibold text-white"
            key={tag + index}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-end gap-x-2">
        <Button leftIcon={IconReply} size="sm" color="secondary">
          Reply
        </Button>
        <Button size="sm" color="yellow">
          Add Tag
        </Button>
      </div>
    </Card>
  );
};
const CommentContainer = ({ children, innerRef, ...props }: ICommentContainer) => {
  return (
    <div
      ref={innerRef}
      className="flex h-screen flex-1 flex-col gap-y-6 overflow-y-auto p-4"
      {...props}
    >
      {children}
    </div>
  );
};
