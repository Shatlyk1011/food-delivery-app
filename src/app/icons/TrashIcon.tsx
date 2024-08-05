import { SVGProps, FC } from "react";

export const TrashIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="24" height="24" focusable="false" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM8 9h8v10H8zm7.5-5-1-1h-5l-1 1H5v2h14V4z"></path>
  </svg>
);
