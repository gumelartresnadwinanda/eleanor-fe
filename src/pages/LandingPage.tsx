import { useOutletContext } from "react-router-dom";

const LandingPage = () => {
  const { isPhoneScreen } = useOutletContext<{ isPhoneScreen: boolean }>();

  return (
    <div className={`flex flex-col items-center justify-center ${isPhoneScreen ? 'text-center h-[calc(100vh-12rem)]' : 'h-[calc(100vh-8rem)]'}`}>
      <div className="w-full h-full overflow-y-auto scrollbar-hide">
        <div className="w-full">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Welcome to Eleanor</h1>
          <p className="mt-4 text-base text-gray-700 dark:text-gray-300">
            Media Library Server - Electronic Library for Entertainment, Audio, and ORganization.
          </p>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
