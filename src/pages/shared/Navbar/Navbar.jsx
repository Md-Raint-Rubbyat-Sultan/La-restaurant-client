import { useContext } from "react";
import { Link, NavLink, Outlet, ScrollRestoration } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { toast } from "react-hot-toast";
import useAxiosSucre from "../../../hooks/useAxiosSucre";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const url = useAxiosSucre();

  const handelLogout = () => {
    logoutUser()
      .then(() => {
        url
          .post("/logout", {})
          .then((res) => {
            if (res.data?.success) {
              toast.success("Logged Out!");
            }
          })
          .catch((er) => toast.error(er.message));
      })
      .catch((err) => toast.error(err.message));
  };

  const commonLinks = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"all-foods"}
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          All Foods
        </NavLink>
      </li>
    </>
  );

  const dynamicLinks = (
    <>
      <li>
        <NavLink
          to={"blogs"}
          className={({ isActive }) => (isActive ? "underline" : "")}
        >
          Blogs
        </NavLink>
      </li>
      {user ? (
        <>
          <li>
            <Link to={"/"}>
              <button onClick={handelLogout}>Logout</button>
            </Link>
          </li>
          <li>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={
                      user?.photoURL
                        ? user.photoURL
                        : `https://i.ibb.co/jJf2wWF/user.png`
                    }
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content left-0 lg:left-auto top-16 bg-base-100 rounded-box w-52"
              >
                <li>
                  <NavLink
                    to={"user/added-foods"}
                    className={({ isActive }) => (isActive ? "underline" : "")}
                  >
                    My Added Food
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"user/added-food"}
                    className={({ isActive }) => (isActive ? "underline" : "")}
                  >
                    Add A Food
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"user/cart"}
                    className={({ isActive }) => (isActive ? "underline" : "")}
                  >
                    My Cart
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
        </>
      ) : (
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
      )}
    </>
  );
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex justify-center items-center gap-8 w-full">
            <div className="hidden lg:block">
              <ul className="menu menu-horizontal text-lg">{commonLinks}</ul>
            </div>
            <h1 className="text-5xl text-center py-10">Lá</h1>
            <div className="hidden lg:block">
              <ul className="menu menu-horizontal items-center text-lg">
                {dynamicLinks}
              </ul>
            </div>
          </div>
        </div>
        {/* Page content here */}
        <Outlet />
        <ScrollRestoration />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-64 md:w-80 min-h-full bg-base-200 text-lg">
          {commonLinks}
          {dynamicLinks}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
