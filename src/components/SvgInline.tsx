import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

const svgInlineCss = css`
  width: fit-content;
  height: fit-content;
`;

interface SvgInlineProps {
  url: string;
}

/**
 * Render SVG element with a file from url.
 * (Codes from https://stackoverflow.com/a/56258761)
 */
const SvgInline = ({ url }: SvgInlineProps) => {
  const [svg, setSvg] = useState<TrustedHTML>('');
  useEffect(() => {
    fetch(url)
      .then((res) => (res.ok ? res.text() : ''))
      .then((body) => {
        if (body.trim().endsWith('</svg>')) {
          // validate svg or not
          setSvg(body);
        }
      });
  }, [url]);

  return <div css={svgInlineCss} dangerouslySetInnerHTML={{ __html: svg }} />;
};

export default SvgInline;
