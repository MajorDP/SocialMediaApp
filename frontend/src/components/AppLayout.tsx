import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

function AppLayout() {
  return (
    <div className="flex flex-col-reverse md:flex-row">
      <Navigation />
      <div className="h-screen w-full overflow-y-auto scrollbar-hide">
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
