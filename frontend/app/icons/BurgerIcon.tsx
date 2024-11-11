import { SVGProps, FC } from "react";

export const BurgerIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path d="M3 18.387H21V16.387H3V18.387ZM3 13.387H21V11.387H3V13.387ZM3 6.38703V8.38703H21V6.38703H3Z" fill="black" />
  </svg>
);
