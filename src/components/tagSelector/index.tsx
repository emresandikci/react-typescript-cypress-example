import { useState, useRef } from 'react';
import { MdOutlineClose as IconClose } from 'react-icons/md';

import { Card, Input, Tag } from 'ui';
import { ITagProps } from 'ui/tag';
import { BaseComponentProps } from 'utils/types';

export interface ITagSelector {
  suggestions: string[];
  placeholder?: string;
  onChange: (tags: string[]) => void;
  selected: string[];
}

interface IRemoveableTag extends ITagProps, BaseComponentProps {
  onDelete: (value: string) => void;
}

export default function TagSelector({
  suggestions,
  placeholder,
  selected,
  onChange,
}: ITagSelector) {
  const [selectedTags, setSelectedTags] = useState<string[]>(selected || []);
  const [text, setText] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setText(value);
    if (value.includes(',')) onSelectTag(value);
  };

  const onFilterSuggestion = (filter: string) =>
    filter.includes(text) && !selectedTags.includes(filter);

  const onSelectTag = (tag: string) => {
    setSelectedTags((prevTags) => {
      const updateTags = [...prevTags, tag.replace(',', '')];
      onChange(updateTags);
      setText('');
      inputRef.current?.focus();
      return updateTags;
    });
  };

  const onDelete = (tag: string) => {
    if (tag) {
      setSelectedTags((prevTags) => {
        const deletedTags = prevTags.filter((filter) => filter != tag);
        onChange(deletedTags);
        return deletedTags;
      });
    }
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && text) {
      onSelectTag(text);
    }
    if (e.key === 'Backspace' && selectedTags.length > 0 && !text) {
      onDelete(selectedTags?.pop() as string);
    }
  };

  const filteredSuggestions = suggestions?.filter(onFilterSuggestion);

  return (
    <div className="relative" ref={containerRef}>
      <div className="input flex h-auto">
        <div className="flex flex-wrap items-center gap-1">
          {selectedTags?.map((option, index) => (
            <RemoveableTag key={index} onDelete={onDelete}>
              {option}
            </RemoveableTag>
          ))}
          <Input
            className="border-none !bg-transparent p-1"
            value={text}
            placeholder={placeholder}
            autoFocus
            onChange={onChangeText}
            onKeyUp={onKeyUp}
            innerRef={inputRef}
          />
        </div>
      </div>
      {text.trim() && suggestions?.filter(onFilterSuggestion).length > 0 && (
        <Card className="absolute z-dropdown mt-4 w-full p-4 !shadow-bb">
          {filteredSuggestions?.map((tag, index) => (
            <div
              key={tag + index}
              className="cursor-pointer p-2 hover:bg-gray-100"
              onClick={() => onSelectTag(tag)}
            >
              {tag}
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

const RemoveableTag = ({ children, onDelete, ...props }: IRemoveableTag) => {
  return (
    <Tag color="red-light" className="cursor-pointer hover:bg-red-400" {...props}>
      <div className="flex items-center gap-x-2" onClick={() => onDelete(children as string)}>
        <span> {children}</span>
        <IconClose />
      </div>
    </Tag>
  );
};
