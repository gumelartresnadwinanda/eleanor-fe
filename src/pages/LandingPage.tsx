import { Album, Gamepad2, House, Image, Library, Tag, TvMinimalPlay, User, Video } from "lucide-react";
import Container from "../components/layout/Container";
import Description from "../components/layout/Description";
import Title from "../components/layout/Title";
import { Link } from "react-router-dom";
import { Apps } from "../types/AppsType";

const LandingPage = () => {

  const appMenu = [
    { id: 1, name: "All Media", icon: <Library className="w-4 h-4" />, to: "/all-media" },
    { id: 2, name: "lrtrsprn_", icon: <House className="w-4 h-4" />, to: "/tags/lrtrsprn_/group" },
    { id: 3, name: "negi", icon: <Gamepad2 className="w-4 h-4" />, to: "/tags/negi/group" },
    { id: 4, name: "Videos", icon: <Video className="w-4 h-4" />, to: "/file-type/video" },
    { id: 5, name: "Images", icon: <Image className="w-4 h-4" />, to: "/file-type/photo" },
    { id: 6, name: "Stage", icon: <Tag className="w-4 h-4" />, to: "/tags" },
    { id: 7, name: "Album", icon: <Album className="w-4 h-4" />, to: "/tags/album" },
    { id: 8, name: "Person", icon: <User className="w-4 h-4" />, to: "/tags/person" },
    { id: 9, name: "Bola", icon: <TvMinimalPlay className="w-4 h-4" />, to: "/bola/liverpool" }
  ];

  const featuredApps: Apps[] = [];

  return (
    <Container>
      <div className="min-h-screenpy-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Title text="Welcome to Eleanor" />
            <Description text="Media Library Server - Electronic Library for Entertainment, Audio, and ORganization." />

          </div>

          <div className="mb-10 bg-gray-50 dark:bg-slate-600 rounded-md shadow-md p-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Menu</h2>
            <p className="text-md text-gray-700 dark:text-gray-300">Navigate through your library, settings, and more</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
              {appMenu.map((item) => (
                <Link
                  key={item.id}
                  to={item.to}
                  className="bg-white dark:bg-gray-900 p-3 rounded-lg shadow-xs hover:shadow-sm transition-all duration-200 flex flex-col items-center text-center hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full text-indigo-600 dark:text-indigo-400 mb-1.5">
                    {item.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {
            featuredApps.length > 0 && (
              <div className="mb-10 bg-gray-50 dark:bg-slate-600 rounded-md shadow-md p-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">More From Me</h2>
                <p className="text-md text-gray-700 dark:text-gray-300">Discover other tools and experiences</p>
                <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide mt-4">
                  {featuredApps.map((app) => (
                    <Link
                      key={app.name}
                      to={app.url}
                      className="flex-shrink-0 bg-white dark:bg-gray-900 p-3 rounded-lg shadow-xs hover:shadow-sm transition-all duration-200 flex items-center space-x-2 w-auto px-4 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-full text-indigo-600 dark:text-indigo-400">
                        {app.icon}
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {app.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )
          }


        </div>
      </div>
    </Container>
  );
};

export default LandingPage;
