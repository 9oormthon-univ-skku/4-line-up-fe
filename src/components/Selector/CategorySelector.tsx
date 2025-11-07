import type { Category } from '@/types/schema';
import { css } from '@emotion/react';
import Tag from '../Tag';
import { colors } from '@/styles/styles';
import type { ComponentProps } from 'react';

const containerCss = css`
  overflow-y: scroll;
  display: flex;
  gap: 8px;
  padding-left: 24px;
`;

const selectedCss = css`
  background-color: ${colors.primary20};
`;

interface SelectorProps extends ComponentProps<'div'> {
  categories: Category[];
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

const CategorySelector = ({
  categories,
  selected,
  setSelected,
  ...props
}: SelectorProps) => {
  const onTagClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const tgt = e.target as HTMLElement;
    const cat = tgt.textContent;
    if (cat === null) return;
    if (selected.includes(cat)) {
      setSelected(selected.filter((e) => e !== cat));
    } else {
      setSelected([...selected, cat]);
    }
  };

  return (
    <div css={containerCss} {...props}>
      {categories.map((category, i) => (
        <Tag
          key={i}
          onClick={onTagClick}
          variant='secondary'
          css={selected.includes(category.name) && selectedCss}
        >
          {category.name}
        </Tag>
      ))}
    </div>
  );
};

export default CategorySelector;
