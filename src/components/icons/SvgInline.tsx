import { css } from '@emotion/react';
import { useEffect, useState, type ComponentProps } from 'react';

const svgInlineCss = css`
  width: fit-content;
  height: fit-content;
`;

interface SvgInlineProps extends ComponentProps<'div'> {
  url?: string;
  defaultSvg: React.ReactNode;
}

/**
 * Render SVG element with a file from url.
 * (Codes from https://stackoverflow.com/a/56258761)
 */
const SvgInline = ({ url, defaultSvg, ...props }: SvgInlineProps) => {
  const [svg, setSvg] = useState<TrustedHTML | null>(null);
  useEffect(() => {
    if (!url) return;
    fetch(url)
      .then((res) => (res.ok ? res.text() : ''))
      .then((body) => {
        if (body.trim().endsWith('</svg>')) {
          // validate svg or not
          setSvg(body);
        }
      });
  }, [url]);

  return url ? (
    <div
      css={svgInlineCss}
      dangerouslySetInnerHTML={{ __html: svg ?? "" }}
      {...props}
    />
  ) : (
    <div {...props}>
      { defaultSvg }
    </div>
  );
};

export default SvgInline;
