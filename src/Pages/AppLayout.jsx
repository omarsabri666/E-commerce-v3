import { Outlet } from "react-router";
import NavBar from "../componots/NavBar"
import { Suspense } from "react";
import Loader from "../componots/Loader";

function AppLayout() {
    return (
      <>
        <div className=" font-abc h-auto sticky top-0 z-30 ">
          <NavBar />
        </div>
        <div className="   font-abc  ">
          <Suspense
            fallback={
              <div>
                <Loader />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </div>
      </>
    );
}

export default AppLayout
