import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import ChatNew from "./Messages";

function AppLayout() {
  return (
    <div className="flex flex-col-reverse md:flex-row">
      <Navigation />
      <div className="h-screen w-full overflow-y-auto scrollbar-hide">
        <ChatNew />
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
