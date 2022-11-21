import { TagSelector } from 'components';
import { useCommentContext } from 'containers/commentsContainer';
import { useState, useEffect } from 'react';

import { Button, Popup } from 'ui';

import { IPopupProps } from 'ui/popup';

export default function AddTagPopup({ onClose, isOpen }: IPopupProps) {
  const [tags, setTags] = useState<string[]>([]);
  const { setSelectedComment } = useCommentContext();

  useEffect(() => {
    return () => setSelectedComment(null);
  }, []);

  const onSave = () => {
    //Todo: update comment's tags
  };
  const onChangeTags = (selectedTags: string[]) => {
    setTags(selectedTags);
    console.log(selectedTags);
  };

  return (
    <Popup
      isOpen={isOpen}
      title="Add New Tag"
      className="flex !h-auto w-[420px] flex-col gap-y-6"
      onClose={onClose}
    >
      <TagSelector
        placeholder="type somethings"
        suggestions={['funny', 'good', 'awesome', 'bad', 'lovely']}
        onChange={onChangeTags}
      />
      <Button className="w-full" onClick={onSave}>
        Save
      </Button>
    </Popup>
  );
}
