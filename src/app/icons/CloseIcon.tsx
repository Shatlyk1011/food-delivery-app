import { SVGProps, FC } from "react";

export const CloseIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path
      d="M19 6.79703L17.59 5.38703L12 10.977L6.41 5.38703L5 6.79703L10.59 12.387L5 17.977L6.41 19.387L12 13.797L17.59 19.387L19 17.977L13.41 12.387L19 6.79703Z"
      fill="black"
    />
  </svg>
);
