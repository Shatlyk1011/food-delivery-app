import { SVGProps, FC } from "react";

export const MessageIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path
      d="M20 4.38703H4C2.9 4.38703 2.01 5.28703 2.01 6.38703L2 18.387C2 19.487 2.9 20.387 4 20.387H20C21.1 20.387 22 19.487 22 18.387V6.38703C22 5.28703 21.1 4.38703 20 4.38703ZM20 8.38703L12 13.387L4 8.38703V6.38703L12 11.387L20 6.38703V8.38703Z"
      fill="black"
    />
  </svg>
);
