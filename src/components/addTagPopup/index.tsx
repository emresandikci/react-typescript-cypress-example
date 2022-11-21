import { TagSelector } from 'components';
import { useCommentContext } from 'containers/commentsContainer';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { addTags } from 'store/actions/comments';

import { Button, Popup } from 'ui';

import { IPopupProps } from 'ui/popup';
import { IComment } from 'utils/types/comment';

export default function AddTagPopup({ isOpen }: IPopupProps) {
  const [tags, setTags] = useState<string[]>([]);
  const { setSelectedComment, selectedComment, toggleAddTagPopup } = useCommentContext();
  const dispatch = useDispatch<AppDispatch<IComment>>();

  useEffect(() => {
    return () => setSelectedComment(null);
  }, []);

  const onSave = () => {
    if (selectedComment?.tags?.length) {
      tags.push(...(selectedComment?.tags as string[]));
    }
    dispatch(addTags(tags, selectedComment?.id)).then(() => toggleAddTagPopup());
  };

  const onChangeTags = (selectedTags: string[]) => {
    setTags(selectedTags);
  };

  return (
    <Popup
      isOpen={isOpen}
      title="Add New Tag"
      className="flex !h-auto w-[420px] flex-col gap-y-6"
      onClose={toggleAddTagPopup}
    >
      <TagSelector
        placeholder="type somethings"
        suggestions={['funny', 'good', 'awesome', 'bad', 'lovely']}
        onChange={onChangeTags}
        selected={selectedComment?.tags as string[]}
      />
      <Button className="w-full" onClick={onSave} disabled={tags.length === 0}>
        Save
      </Button>
    </Popup>
  );
}
