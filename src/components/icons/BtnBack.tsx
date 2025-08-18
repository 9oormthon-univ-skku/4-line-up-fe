import type { ComponentProps } from "react";
import Arrow from '@icons/arrow-left.svg?react';
import { css } from "@emotion/react";
import { colors } from "@/styles/styles";

const BtnBack = ({...props}: ComponentProps<'button'>) => {
    return <button css={css`
        color: ${colors.primary};
        line-height: 0;
        width: 4.8rem;
        height: 4.8rem;
    `} aria-label='뒤로가기' {...props}>
        <Arrow/>
    </button>
}

export default BtnBack;