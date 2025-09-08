import { css } from '@emotion/react';

// export const colors = {
//   primary: '#B01616',
//   primary40: '#E55F5F',
//   primary30: '#DE9393',
//   primary20: '#FFC1C1',
//   primary10: '#FFF1F1',
//   white: '#FFFFFF',
//   black: '#000000',
// };
// Green
export const colors = {
  primary: '#043113',
  primary40: '#E55F5F',
  primary30: '#819E8A',
  primary20: '#B8CEB7',
  primary10: '#EEFBEE',
  white: '#FFFFFF',
  black: '#000000',
  gray40: '#404040',
};
export const gradients = {};

const _shadows = {
  bottom: '0px 4px 4px rgba(0,0,0,0.25)',
  up: '0px -4px 4px rgba(0,0,0,0.25)',
  center: '0px 0px 4px rgba(0,0,0,0.25)',
  left: '-4px 0px 4px rgba(0,0,0,0.25)',
};
export const shadows = {
  bottom: _shadows.bottom,
  up: _shadows.up,
  center: _shadows.center,
  left: _shadows.left,
  dropBottom: css`
    filter: drop-shadow(${_shadows.bottom});
  `,
  dropUp: css`
    filter: drop-shadow(${_shadows.up});
  `,
  dropCenter: css`
    filter: drop-shadow(${_shadows.center});
  `,
  dropLeft: css`
    filter: drop-shadow(${_shadows.left});
  `,
};
export const fonts = {
  title_xlg: css`
    font-family: 'JNE-Ttobak';
    font-size: 96px;
  `,
  title_lg: css`
    font-family: 'JNE-Ttobak';
    font-size: 4rem;
  `,
  title_md: css`
    font-family: 'JNE-Ttobak';
    font-size: 3.2rem;
  `,

  display_xlg: css`
    font-family: 'Pretendard Variable';
    font-size: 2.4rem;
    font-weight: 700;
  `,
  display_lg: css`
    font-family: 'Pretendard Variable';
    font-size: 2rem;
    font-weight: 700;
  `,
  display_md: css`
    font-family: 'Pretendard Variable';
    font-size: 1.8rem;
    font-weight: 700;
  `,
  display_sm: css`
    font-family: 'Pretendard Variable';
    font-size: 1.6rem;
    font-weight: 700;
  `,

  body_lg: css`
    font-family: 'Pretendard Variable';
    font-size: 2rem;
    font-weight: 500;
  `,
  body_md: css`
    font-family: 'Pretendard Variable';
    font-size: 1.8rem;
    font-weight: 500;
  `,

  label_sm: css`
    font-family: 'Pretendard Variable';
    font-size: 1.6rem;
    font-weight: 400;
  `,
  label_xsm: css`
    font-family: 'Pretendard Variable';
    font-size: 1.2rem;
    font-weight: 400;
  `,

  desc_lg: css`
    font-family: 'Roboto Mono';
    font-size: 2rem;
    font-weight: bold;
  `,
  desc_md: css`
    font-family: 'Roboto Mono';
    font-size: 1.5rem;
    font-weight: bold;
  `,
};
