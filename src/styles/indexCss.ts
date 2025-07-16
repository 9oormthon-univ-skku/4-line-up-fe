import { css } from '@emotion/react';

const reset = css`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  button {
    cursor: pointer;
    padding: 0;
    font: inherit;
    color: inherit;
    background-color: transparent;
    appearance: none;
    border: none;
  }
`;

const indexCss = css`
  ${reset}

  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  html {
    font-size: 62.5%;
  }

  body {
    background-color: white;
    height: 100dvh;
    width: 100%;
    display: flex;
    justify-content: center;

    font-size: 1.6rem;
    font-family: "Pretendard Variable"
  }

  #root {
    height: 100dvh;
    width: 100%;
  }

  @media (min-width: 480px) {
    #root {
      max-width: 480px;
    }
  }

  @font-face {
    font-family: 'Pretendard Variable';
    src: url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css');
  }

  @font-face {
    font-family: 'JNE-Ttobak';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-1@1.0/JNE-Ttobak-TTF-Extrabold.woff2')
      format('woff2');
    font-weight: normal;
    font-style: normal;
  }
`;

export default indexCss;
