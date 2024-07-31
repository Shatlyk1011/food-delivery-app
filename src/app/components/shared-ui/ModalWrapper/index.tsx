import { FC, ReactElement } from "react";

interface Props {
  children: ReactElement;
}

const Index: FC<Props> = ({ children }) => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-bg-cover ">
      {children}
    </div>
  );
};
export default Index;
