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
  div {
    flex-shrink: 0;
  }
`;

const selectedCss = css`
  background-color: ${colors.primary20};
`;

interface SelectorProps extends ComponentProps<'div'> {
  categories: Category[];
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const CategorySelector = ({
  categories,
  selectedIds,
  setSelectedIds,
  ...props
}: SelectorProps) => {
  const onTagClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const tgt = e.target as HTMLElement;
    const cat = Number(tgt.id);
    if (isNaN(cat)) return;
    if (selectedIds.includes(cat)) {
      setSelectedIds(selectedIds.filter((e) => e !== cat));
    } else {
      setSelectedIds([...selectedIds, cat]);
    }
  };

  return (
    <div css={containerCss} {...props}>
      {categories.map((category, i) => (
        <Tag
          key={i}
          onClick={onTagClick}
          variant='secondary'
          css={selectedIds.includes(category.id) && selectedCss}
          id={`${category.id}`}
        >
          {category.name}
        </Tag>
      ))}
    </div>
  );
};

export default CategorySelector;
