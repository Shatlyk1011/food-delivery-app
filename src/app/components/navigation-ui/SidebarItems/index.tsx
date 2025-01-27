import atoms from "@/app/(pages)/_providers/jotai";
import { useSetAtom } from "jotai";

import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Index: FC<Props> = ({ children }) => {
  const setIsSidebarOpen = useSetAtom(atoms.isSidebarOpen);
  return (
    <button className="hidden cursor-pointer md:block" onClick={() => setIsSidebarOpen(true)}>
      {children}
    </button>
  );
};
export default Index;
