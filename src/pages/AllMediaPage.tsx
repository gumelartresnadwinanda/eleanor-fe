import { useOutletContext } from "react-router-dom";

const AllMediaPage = () => {
  const { isPhoneScreen } = useOutletContext<{ isPhoneScreen: boolean }>();

  return (
    <div className={`flex flex-col items-center justify-center p-4 bg-gray-100 dark:bg-gray-900 ${isPhoneScreen ? 'text-center h-[calc(100vh-14rem)]' : 'h-[calc(100vh-10rem)]'}`}>
      <div className="w-full h-full overflow-y-auto scrollbar-hide">
        <div className="w-full p-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">All Media</h1>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">Here you can browse all your media.</p>
        </div>
      </div>
    </div>
  );
};

export default AllMediaPage;
