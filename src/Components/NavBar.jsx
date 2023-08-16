import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className=" w-full bg-black">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <header className="flex justify-between items-center py-2 md:py-4">
          <nav className="align-middle hidden lg:flex gap-12 ">
            <Link
              to="/"
              className="text-white hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
            >
              Home
            </Link>
            <Link
              to="/chat"
              className="text-white hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
            >
              Movies
            </Link>
            <Link
              to="/previousorders"
              className="text-white hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
            >
              Orders
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100"
            >
              About
            </Link>
          </nav>
        </header>
      </div>
    </div>
  );
}

export default NavBar;
