// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';

// interface NavbarProps {
//   darkMode: boolean;
//   toggleDarkMode: () => void;
// }

// const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const navItems = [
//     { name: 'Home', href: '/' },
//     { name: 'About', href: '/about' },
//     { name: 'Projects', href: '/projects' },
//     { name: 'AI Demos', href: '/ai-demos' },
//     { name: 'Contact', href: '/contact' },
//   ];

//   return (
    
//     <>
//     <nav className="fixed top-0 left-0 w-full bg-white/60 backdrop-blur-md shadow z-50 ">



//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link to="/" className="text-2xl font-bold text-primary">
//             Welcome to my World
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex space-x-8   ">
            
//             {navItems.map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.href}
//                 className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </div>

//           {/* Dark Mode Toggle */}
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={toggleDarkMode}
//               className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
//             >
//               {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-600" />}
//             </button>

//             {/* Mobile Menu Button */}
//             <button
//               className="md:hidden p-2"
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//             >
//               {isMenuOpen ? <FaTimes /> : <FaBars />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
//             {navItems.map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.href}
//                 className="block py-2 text-gray-700 dark:text-gray-300 hover:text-primary"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </nav>
 
//     </>
//   );
// };

// export default Navbar;






import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "AI Demos", href: "/ai-demos" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Welcome to my World
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="relative font-medium text-gray-700 dark:text-gray-300 tracking-wide
                           transition-all duration-300 ease-in-out
                           hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600
                           hover:bg-clip-text hover:text-transparent
                           hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.6)]
                           after:content-[''] after:absolute after:left-0 after:-bottom-1
                           after:w-0 after:h-[2px] after:rounded-full
                           after:bg-gradient-to-r after:from-blue-600 after:to-purple-600
                           hover:after:w-full after:transition-all after:duration-500"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Dark Mode + Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {darkMode ? (
                <FaSun className="text-yellow-500" />
              ) : (
                <FaMoon className="text-gray-600" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-base font-medium text-gray-700 dark:text-gray-300
                           transition-all duration-300
                           hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600
                           hover:bg-clip-text hover:text-transparent
                           hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.6)]"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
