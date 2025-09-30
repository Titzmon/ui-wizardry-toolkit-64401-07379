import { SearchBar } from "@/components/SearchBar";
import { Navigation } from "@/components/Navigation";
import { BackToTopButton } from "@/components/BackToTopButton";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { Microscope, Users, MessageCircle, Bone, Sprout, Bug, Circle, Dna, FlaskConical } from "lucide-react";

const Index = () => {
  const topics = [
    {
      name: "Vertebrate",
      path: "/topic/vertebrate",
      icon: Bone,
      description: "Bone physiology and vertebrate adaptations in microgravity"
    },
    {
      name: "Plants",
      path: "/topic/plants", 
      icon: Sprout,
      description: "Plant growth, gravitropism, and space agriculture"
    },
    {
      name: "Microbes",
      path: "/topic/microbes",
      icon: Bug, 
      description: "Microbial adaptation and survival in extreme environments"
    },
    {
      name: "Fungi",
      path: "/topic/fungi",
      icon: Circle,
      description: "Fungal spore viability and morphological changes"
    },
    {
      name: "Human Cell & Biomedical",
      path: "/topic/human-cell",
      icon: Dna,
      description: "Human cellular responses and space medicine"
    },
    {
      name: "Systems Biology & Tools", 
      path: "/topic/systems-biology",
      icon: FlaskConical,
      description: "Integrative omics and systems-level analysis"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-2.5">
          <div className="flex items-center justify-between">
            <SearchBar placeholder="Search space biology research..." />
            <Navigation />
          </div>
        </div>
      </header>

      {/* Website Title */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            AstroMorphosis
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Exploring biological transformations in space environments through cutting-edge research
          </p>
        </div>
      </section>

      {/* Main Navigation Sections */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <a
              href="#topics"
              className="group p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
            >
              <div className="flex justify-center mb-4">
                <Microscope className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Topics</h3>
              <p className="text-gray-600">Explore our research areas</p>
            </a>
            
            <a
              href="#about"
              className="group p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
            >
              <div className="flex justify-center mb-4">
                <Users className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">About</h3>
              <p className="text-gray-600">Learn about our team</p>
            </a>
            
            <a
              href="#feedback"
              className="group p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
            >
              <div className="flex justify-center mb-4">
                <MessageCircle className="w-12 h-12 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Feedback</h3>
              <p className="text-gray-600">Share your thoughts</p>
            </a>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section id="topics" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Research Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topics.map((topic) => (
              <Link
                key={topic.path}
                to={topic.path}
                className="group bg-gray-50 rounded-xl p-6 hover:bg-blue-50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <topic.icon className="w-16 h-16 text-blue-600 group-hover:text-blue-700 transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600">
                    {topic.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{topic.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">About Us</h2>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We are a team from <strong>Hanoi University of Science and Technology</strong>, joining the 
                <strong> NASA Space Apps Challenge 2025</strong>. Our mission is to advance our understanding 
                of biological systems in space environments through innovative research and collaborative knowledge sharing.
              </p>
              <p className="text-xl font-semibold text-blue-600">
                "SHARE TO BE SHARED"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section id="feedback" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Share Your Thoughts</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">A</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Anonymous Researcher</h4>
                    <p className="text-gray-700 mt-2">"The website is so beautiful. Amazing work on presenting complex space biology research in such an accessible way!"</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">S</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Space Biology Student</h4>
                    <p className="text-gray-700 mt-2">"This platform makes cutting-edge research so much more understandable. Great resource for the scientific community!"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default Index;
