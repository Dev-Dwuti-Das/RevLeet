export default function Navbar() {
  return (
    <header className="bg-gray-900">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <img
              alt="Your Company"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              className="h-8 w-auto"
            />
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:gap-x-12">
          <a href="http://localhost:5173/home" className="text-sm font-semibold text-white">
            Home 
          </a>
          <a href="http://localhost:5173/Queues" className="text-sm font-semibold text-white">
            Queues
          </a>
          <a href="#" className="text-sm font-semibold text-white">
            somehitng
          </a>
        </div>

        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold text-white">
            Log in →
          </a>
        </div>

       
        {/* <div className="lg:hidden">
          <button className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300">
            <span className="sr-only">Menu</span>
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18.75h16.5"/>
            </svg>
          </button>
        </div> */}
      </nav>
    </header>
  );
}
