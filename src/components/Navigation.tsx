import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const topics = [
  { name: "Vertebrate", path: "/topic/vertebrate" },
  { name: "Plants", path: "/topic/plants" },
  { name: "Microbes", path: "/topic/microbes" },
  { name: "Fungi", path: "/topic/fungi" },
  { name: "Human Cell & Biomedical", path: "/topic/human-cell" },
  { name: "Systems Biology & Tools", path: "/topic/systems-biology" }
];

export function Navigation() {
  const [showTopicsDropdown, setShowTopicsDropdown] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowTopicsDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="flex items-center space-x-4">
      <Link 
        to="/" 
        onClick={handleHomeClick}
        className="text-sm text-gray-700 hover:text-blue-600 font-medium transition-colors"
      >
        Home
      </Link>
      
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setShowTopicsDropdown(!showTopicsDropdown)}
          className="flex items-center space-x-1 text-sm text-gray-700 hover:text-blue-600 font-medium transition-colors"
        >
          <span>Topics</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
        
        {showTopicsDropdown && (
          <div className="absolute top-full left-0 mt-1.5 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-[1000]">
            {topics.map((topic) => (
              <Link
                key={topic.path}
                to={topic.path}
                className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors first:rounded-t-lg last:rounded-b-lg border-b last:border-b-0"
                onClick={() => setShowTopicsDropdown(false)}
              >
                {topic.name}
              </Link>
            ))}
          </div>
        )}
      </div>
      
      <button
        onClick={() => scrollToSection('about')}
        className="text-sm text-gray-700 hover:text-blue-600 font-medium transition-colors"
      >
        About
      </button>
      
      <button
        onClick={() => scrollToSection('feedback')}
        className="text-sm text-gray-700 hover:text-blue-600 font-medium transition-colors"
      >
        Feedback
      </button>
    </nav>
  );
}