import { css } from "@emotion/react";

export const colors = {
  primary: '#B01616',
  primary40: '#E55F5F',
  primary20: '#FFC1C1',
  primary10: '#FFF1F1',
  white: '#FFFFFF',
  black: '#000000',
};
// // Green
// export const colors = {
//   primary: '#043113',
//   primary40: '#E55F5F',
//   primary20: '#B8CEB7',
//   primary10: '#EEFBEE',
//   white: '#FFFFFF',
//   black: '#000000',
// };
export const gradients = {};

const _shadows = {
  bottom: '0px 4px 4px rgba(0,0,0,0.25)',
  center: '0px 0px 4px rgba(0,0,0,0.25)',
  left: '-4px 0px 4px rgba(0,0,0,0.25)',
}
export const shadows = {
  bottom: _shadows.bottom,
  center: _shadows.center,
  left: _shadows.left,
  dropBottom: css`filter:drop-shadow(${_shadows.bottom})`,
  dropCenter: css`filter:drop-shadow(${_shadows.center})`,
  dropLeft: css`filter:drop-shadow(${_shadows.left})`,
};
export const fonts = {};
