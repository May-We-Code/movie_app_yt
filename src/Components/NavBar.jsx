import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className='w-full'>
      <Link to='/'>
        <div className='text-white text-2xl font-bold md:text-4xl lg:text-5xl ml-10 pt-2'>
          AZ-Movies
        </div>
      </Link>
    </div>
  );
}

export default NavBar;
