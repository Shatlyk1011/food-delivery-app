import { SVGProps, FC } from "react";

export const ProfileIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path
      d="M12 12.387C14.21 12.387 16 10.597 16 8.38703C16 6.17703 14.21 4.38703 12 4.38703C9.79 4.38703 8 6.17703 8 8.38703C8 10.597 9.79 12.387 12 12.387ZM12 14.387C9.33 14.387 4 15.727 4 18.387V20.387H20V18.387C20 15.727 14.67 14.387 12 14.387Z"
      fill="black"
    />
  </svg>
);
