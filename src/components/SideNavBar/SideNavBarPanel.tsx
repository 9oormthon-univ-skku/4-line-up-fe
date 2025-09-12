import { disclaimerText } from '@/constants';
import { colors, fonts, shadows } from '@/styles/styles';
import { css } from '@emotion/react';
import Bg from '@images/bg-stars.svg?react';
import Logo from '@images/logo-9u.svg?react';

const SideNavBarPanelCss = css`
  height: 100lvh;
  width: 100%;
  padding: 5.4rem 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: -20;
  background-color: ${colors.white};
  border-left: 2px solid ${colors.primary};
  box-shadow: ${shadows.left};

  & > div {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .snb-footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-top: 44px;
    margin-bottom: 60px;
  }
  .disclaimer {
    ${fonts.label_xsm};
    color: ${colors.primary30};
  }
`;

const SideNavBarPanel = (props: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div css={SideNavBarPanelCss}>
      <div>{props.children}</div>
      <div className='snb-footer'>
        <Bg
          css={css`
            color: ${colors.primary20};
            position: absolute;
            bottom: 0;
            right: 0;
            z-index: -10;
          `}
        />
        <Logo
          css={css`
            color: ${colors.primary30};
          `}
        />
        <div className='disclaimer'>{disclaimerText}</div>
      </div>
    </div>
  );
};

export default SideNavBarPanel;
