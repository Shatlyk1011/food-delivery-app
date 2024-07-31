import { SVGProps, FC } from "react";

export const MealIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path
      d="M11 9.38703H9V2.38703H7V9.38703H5V2.38703H3V9.38703C3 11.507 4.66 13.227 6.75 13.357V22.387H9.25V13.357C11.34 13.227 13 11.507 13 9.38703V2.38703H11V9.38703ZM16 6.38703V14.387H18.5V22.387H21V2.38703C18.24 2.38703 16 4.62703 16 6.38703Z"
      fill="black"
    />
  </svg>
);
