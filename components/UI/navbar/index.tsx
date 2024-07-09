import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-[80px]">
      <div className="w-full mx-auto px-2 sm:px-6 lg:px-8 flex items-center">
        <div className="relative w-full flex items-center justify-between h-16">
          <div className="flex w-full items-center justify-between">
            <div className="flex-shrink-0">
              <Link className='font-bold text-lg' href="/">
                Micela
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4 gap-10">
                <Link href="/" className="text-gray-900 hover:border-b-2 pb-1 hover:border-[#670b78] py-2 border-w-fit w-fit text-sm font-medium">Home</Link>
                <Link href="/login" className="text-gray-900 hover:border-b-2 pb-1 hover:border-[#670b78] py-2 border-w-fit w-fit text-sm font-medium">Login</Link>
                <Link href="/register" className="text-gray-900 hover:border-b-2 pb-1 hover:border-[#670b78] py-2 border-w-fit w-fit text-sm font-medium">Register</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href="/" className="text-gray-900 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
          <Link href="/login" className="text-gray-900 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Login</Link>
          <Link href="/register" className="text-gray-900 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
