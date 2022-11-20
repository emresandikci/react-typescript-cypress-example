import ReactSelect, { Props, GroupBase } from 'react-select';

const style = {
  control: (base: any, state: any) => ({
    ...base,
    border: state.isSelected && 0,

    boxShadow: state.isSelected && 'none',
    '&:hover': {
      border: state.isSelected && 'none',
    },
    '&:focus': {
      border: state.isSelected && 0,
      boxShadow: state.isSelected && 'none',
      backgroundColor: state.isSelected && '#bdbdbd',
    },
    '&.bb__control--is-disabled': {
      boxShadow: 'none',
    },
  }),
};

function Select<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
  return <ReactSelect styles={style} classNamePrefix="bb" {...props} />;
}

export default Select;
