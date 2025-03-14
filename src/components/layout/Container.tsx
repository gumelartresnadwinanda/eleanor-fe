import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className={`flex flex-col items-center justify-center `}>
      <div className="w-full h-full overflow-y-auto scrollbar-hide relative">
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Container;
