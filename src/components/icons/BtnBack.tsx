import type { ComponentProps } from "react";
import Arrow from '@icons/arrow-left.svg?react';
import { css } from "@emotion/react";
import { colors, shadows } from "@/styles/styles";

const BtnBack = ({...props}: ComponentProps<'button'>) => {
    return <button css={css`
        color: ${colors.primary};
        background-color: ${colors.white};
        ${shadows.dropCenter};
        border-radius: 3rem;
        line-height: 0;
        width: 5.6rem;
        height: 5.6rem;
    `} aria-label='뒤로가기' {...props}>
        <Arrow/>
    </button>
}

export default BtnBack;