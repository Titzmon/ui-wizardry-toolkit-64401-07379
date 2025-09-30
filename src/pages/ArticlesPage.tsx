import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { Navigation } from "@/components/Navigation";
import { BackToTopButton } from "@/components/BackToTopButton";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Check, Star } from "lucide-react";
import { getArticlesByTopic } from "@/lib/searchData";
import type { Article } from "@/lib/searchData";

export default function ArticlesPage() {
  const { topic } = useParams<{ topic: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [readArticles, setReadArticles] = useState<Set<string>>(new Set());
  const [highlightedArticles, setHighlightedArticles] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (topic) {
      const topicArticles = getArticlesByTopic(topic);
      setArticles(topicArticles);
    }

    // Load saved states from localStorage
    const savedRead = localStorage.getItem('readArticles');
    const savedHighlighted = localStorage.getItem('highlightedArticles');
    
    if (savedRead) setReadArticles(new Set(JSON.parse(savedRead)));
    if (savedHighlighted) setHighlightedArticles(new Set(JSON.parse(savedHighlighted)));
  }, [topic]);

  const toggleRead = (articleId: string) => {
    const newRead = new Set(readArticles);
    if (newRead.has(articleId)) {
      newRead.delete(articleId);
    } else {
      newRead.add(articleId);
    }
    setReadArticles(newRead);
    localStorage.setItem('readArticles', JSON.stringify([...newRead]));
  };

  const toggleHighlight = (articleId: string) => {
    const newHighlighted = new Set(highlightedArticles);
    if (newHighlighted.has(articleId)) {
      newHighlighted.delete(articleId);
    } else {
      newHighlighted.add(articleId);
    }
    setHighlightedArticles(newHighlighted);
    localStorage.setItem('highlightedArticles', JSON.stringify([...newHighlighted]));
  };

  const getTopicTitle = (topicSlug: string) => {
    const titles: Record<string, string> = {
      'vertebrate': 'Vertebrate',
      'plants': 'Plants',
      'microbes': 'Microbes', 
      'fungi': 'Fungi',
      'human-cell': 'Human Cell & Biomedical',
      'systems-biology': 'Systems Biology & Tools'
    };
    return titles[topicSlug] || topicSlug;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
              <span className="text-gray-400">|</span>
              <Link 
                to={`/topic/${topic}`}
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Back
              </Link>
            </div>
            
            <SearchBar placeholder="Search articles..." />
            
            <Navigation />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold text-gray-900 mb-2 text-center">
            {getTopicTitle(topic || "")}
          </h1>
          <p className="text-gray-600 text-center mb-12">Related Research Articles</p>
          
          {articles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No articles found for this topic.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                    readArticles.has(article.id) ? 'opacity-70' : ''
                  } ${
                    highlightedArticles.has(article.id) ? 'ring-4 ring-yellow-300' : ''
                  }`}
                >
                  <div className="p-8">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">📊</span>
                          </div>
                          <div>
                            <Link
                              to={`/article/${article.id}`}
                              className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
                              onClick={() => {
                                // Mark as read when clicked
                                const newRead = new Set(readArticles);
                                newRead.add(article.id);
                                setReadArticles(newRead);
                                localStorage.setItem('readArticles', JSON.stringify([...newRead]));
                              }}
                            >
                              {article.title}
                            </Link>
                            <p className="text-gray-500 text-sm">
                              {article.authors.join(", ")} • {article.year}
                            </p>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-4 leading-relaxed">
                          {article.abstract}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {article.keywords.map((keyword) => (
                            <span
                              key={keyword}
                              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                            >
                              #{keyword.replace(/\s+/g, '')}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2 ml-6">
                        <button
                          onClick={() => toggleHighlight(article.id)}
                          className={`p-2 rounded-full transition-colors ${
                            highlightedArticles.has(article.id)
                              ? 'bg-yellow-500 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-yellow-100'
                          }`}
                          title="Highlight article"
                        >
                          <Star className="w-5 h-5" />
                        </button>
                        
                        <button
                          onClick={() => toggleRead(article.id)}
                          className={`p-2 rounded-full transition-colors ${
                            readArticles.has(article.id)
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-green-100'
                          }`}
                          title="Mark as read"
                        >
                          <Check className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <BackToTopButton />
    </div>
  );
}