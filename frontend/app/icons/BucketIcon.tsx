import { SVGProps, FC } from "react";

export const BucketIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" viewBox="0 0 24 24" {...props}>
    <path
      d="M22 9.38703H17.21L12.83 2.82703C12.64 2.54703 12.32 2.40703 12 2.40703C11.68 2.40703 11.36 2.54703 11.17 2.83703L6.79 9.38703H2C1.45 9.38703 1 9.83703 1 10.387C1 10.477 1.01 10.567 1.04 10.657L3.58 19.927C3.81 20.767 4.58 21.387 5.5 21.387H18.5C19.42 21.387 20.19 20.767 20.43 19.927L22.97 10.657L23 10.387C23 9.83703 22.55 9.38703 22 9.38703ZM12 5.18703L14.8 9.38703H9.2L12 5.18703ZM18.5 19.387L5.51 19.397L3.31 11.387H20.7L18.5 19.387ZM12 13.387C10.9 13.387 10 14.287 10 15.387C10 16.487 10.9 17.387 12 17.387C13.1 17.387 14 16.487 14 15.387C14 14.287 13.1 13.387 12 13.387Z"
      fill="black"
    />
  </svg>
);