import { SVGProps, FC } from "react";

export const ClockIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="32" height="32" viewBox="0 0 24 24" {...props}>
    <path
      d="M11.99 2.38703C6.47 2.38703 2 6.86703 2 12.387C2 17.907 6.47 22.387 11.99 22.387C17.52 22.387 22 17.907 22 12.387C22 6.86703 17.52 2.38703 11.99 2.38703ZM15.29 17.097L11 12.797V7.38703H13V11.977L16.71 15.687L15.29 17.097Z"
      fill="black"
    />
  </svg>
);
