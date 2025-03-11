import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  isPhoneScreen: boolean;
}

const Container = ({ children, isPhoneScreen }: ContainerProps) => {
  return (
    <div className={`flex flex-col items-center justify-center ${isPhoneScreen ? 'text-center h-[calc(100vh-12rem)]' : 'h-[calc(100vh-8rem)]'}`}>
      <div className="w-full h-full overflow-y-auto scrollbar-hide relative">
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Container;
