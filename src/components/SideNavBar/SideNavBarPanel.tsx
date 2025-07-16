import { colors, shadows } from "@/styles/styles"
import { css } from "@emotion/react"

interface PanelProps {
    children?: React.ReactNode;
}

const SideNavBarPanel = ({...props}: PanelProps) => {
    return(
        <div css={css`
            height: 100%;
            width: 100%;
            background-color: ${colors.white};
            border-left: 2px solid ${colors.primary};
            ${shadows.dropLeft};
          `}>
            {props.children}
        </div>
    )
}

export default SideNavBarPanel;