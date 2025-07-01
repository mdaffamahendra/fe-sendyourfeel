import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-16 py-4 bg-white shadow-md">
      <Link to="/" className="text-cyan-700 text-2xl font-bold hover:text-cyan-800">
        sendyourfeel!
      </Link>
      <div className="space-x-4">
        <Link
          to="/create"
          className="text-cyan-700 font-medium hover:text-cyan-800"
        >
          Create
        </Link>
        <Link
          to="/history"
          className="text-cyan-700 font-medium hover:text-cyan-800"
        >
          History
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
