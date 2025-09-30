import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { searchArticles } from "@/lib/searchData";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({ placeholder = "Search articles...", onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length >= 2) {
      const searchResults = searchArticles(query);
      setResults(searchResults);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  };

  const handleResultClick = (articleId: string) => {
    window.location.href = `/article/${articleId}`;
    setShowResults(false);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg">🌍</span>
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          className="pl-10 pr-4 py-2 w-full border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
        />
      </div>
      
      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {results.slice(0, 5).map((result, index) => (
            <div
              key={index}
              className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
              onClick={() => handleResultClick(result.id)}
            >
              <h4 className="font-medium text-gray-900 text-sm">{result.title}</h4>
              <p className="text-gray-600 text-xs mt-1 line-clamp-2">{result.description}</p>
              <span className="text-blue-600 text-xs mt-2 inline-block">View more →</span>
            </div>
          ))}
        </div>
      )}
      
      {showResults && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 p-4 text-center text-gray-500">
          No results found
        </div>
      )}
    </div>
  );
}