import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { Navigation } from "@/components/Navigation";
import { BackToTopButton } from "@/components/BackToTopButton";
import { Footer } from "@/components/Footer";
import { ArrowLeft, FileText, ExternalLink } from "lucide-react";
import { getArticleById } from "@/lib/searchData";
import type { Article } from "@/lib/searchData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ScatterChart, Scatter } from 'recharts';

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (id) {
      const foundArticle = getArticleById(id);
      setArticle(foundArticle || null);
      
      // Mark as read
      const savedRead = localStorage.getItem('readArticles');
      const readArticles = savedRead ? new Set(JSON.parse(savedRead)) : new Set();
      readArticles.add(id);
      localStorage.setItem('readArticles', JSON.stringify([...readArticles]));
    }
  }, [id]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Article not found</p>
      </div>
    );
  }

  // Sample chart data
  const boneDensityData = [
    { day: 0, density: 100 },
    { day: 7, density: 95 },
    { day: 14, density: 88 },
    { day: 21, density: 82 },
    { day: 30, density: 78 }
  ];

  const proteinData = [
    { protein: 'Osteocalcin', expression: 65 },
    { protein: 'Collagen I', expression: 45 },
    { protein: 'Alkaline Phosphatase', expression: 78 },
    { protein: 'RANK-L', expression: 120 },
    { protein: 'OPG', expression: 30 }
  ];

  const heatmapData = [
    { x: 1, y: 1, value: 89 },
    { x: 2, y: 1, value: 67 }, 
    { x: 3, y: 1, value: 45 },
    { x: 1, y: 2, value: 34 },
    { x: 2, y: 2, value: 78 },
    { x: 3, y: 2, value: 92 },
    { x: 1, y: 3, value: 56 },
    { x: 2, y: 3, value: 23 },
    { x: 3, y: 3, value: 87 }
  ];

  const radarData = [
    { subject: 'Bone Formation', microgravity: 45, normal: 100 },
    { subject: 'Bone Resorption', microgravity: 120, normal: 50 },
    { subject: 'Calcium Metabolism', microgravity: 60, normal: 95 },
    { subject: 'Protein Synthesis', microgravity: 40, normal: 85 },
    { subject: 'Gene Expression', microgravity: 70, normal: 90 },
    { subject: 'Cell Viability', microgravity: 75, normal: 98 }
  ];

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
            </div>
            
            <SearchBar placeholder="Search within article..." />
            
            <Navigation />
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 py-16 pr-8">
          <div className="container mx-auto px-6">
            {/* Article Header */}
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {article.title}
              </h1>
              <p className="text-gray-600 mb-2">
                {article.authors.join(", ")} • {article.year}
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

            {/* Article Sections */}
            <div className="space-y-12">
              <section id="background">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Background</h2>
                <p className="text-gray-700 leading-relaxed">{article.sections.background}</p>
              </section>

              <section id="methods">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Methods</h2>
                <p className="text-gray-700 leading-relaxed">{article.sections.methods}</p>
              </section>

              <section id="results">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Results</h2>
                <p className="text-gray-700 leading-relaxed">{article.sections.results}</p>
              </section>

              <section id="discussion">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Discussion</h2>
                <p className="text-gray-700 leading-relaxed">{article.sections.discussion}</p>
              </section>

              <section id="conclusion">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusion</h2>
                <p className="text-gray-700 leading-relaxed">{article.sections.conclusion}</p>
              </section>

              {/* Dashboard Section */}
              <section id="dashboard" className="bg-white rounded-xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Research Dashboard</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Line Chart */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Bone Density Over Time</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={boneDensityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="density" stroke="#3b82f6" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* 3D Visualization Placeholder */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">3D Bone Structure Model</h3>
                    <div className="h-64 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center relative overflow-hidden">
                      <div className="animate-spin text-6xl">🦴</div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12 animate-pulse"></div>
                    </div>
                  </div>

                  {/* Heatmap using Scatter Chart */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Cellular Activity Heatmap</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <ScatterChart data={heatmapData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="x" />
                        <YAxis dataKey="y" />
                        <Tooltip />
                        <Scatter dataKey="value" fill="#f59e0b" />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Bar Chart */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Protein Expression Levels</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={proteinData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="protein" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="expression" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Radar Chart */}
                  <div className="bg-gray-50 rounded-lg p-6 lg:col-span-2">
                    <h3 className="text-lg font-semibold mb-4">Microgravity vs Normal Gravity Comparison</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={radarData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis />
                        <Radar name="Microgravity" dataKey="microgravity" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                        <Radar name="Normal Gravity" dataKey="normal" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </main>

        {/* Sticky Sidebar */}
        <aside className="w-80 bg-white border-l border-gray-200 sticky top-16 h-screen overflow-y-auto">
          <div className="p-6">
            {/* On This Page */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ON THIS PAGE</h3>
              <nav className="space-y-2">
                {[
                  { id: 'background', label: 'Background' },
                  { id: 'methods', label: 'Methods' },
                  { id: 'results', label: 'Results' },
                  { id: 'discussion', label: 'Discussion' },
                  { id: 'conclusion', label: 'Conclusion' },
                  { id: 'dashboard', label: 'Dashboard' }
                ].map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Detail Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">DETAIL</h3>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <FileText className="w-4 h-4" />
                <span>PDF</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            {/* Related Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">RELATED</h3>
              <div className="space-y-2">
                {article.keywords.slice(0, 5).map((keyword) => (
                  <button
                    key={keyword}
                    className="block w-full text-left px-3 py-2 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200 transition-colors"
                  >
                    #{keyword.replace(/\s+/g, '')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      <Footer />
      <BackToTopButton />
    </div>
  );
}