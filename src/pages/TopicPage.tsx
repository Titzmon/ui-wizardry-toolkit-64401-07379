import { useParams, Link } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { Navigation } from "@/components/Navigation";
import { BackToTopButton } from "@/components/BackToTopButton";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

export default function TopicPage() {
  const { topic } = useParams<{ topic: string }>();
  
  const topicData: Record<string, any> = {
    vertebrate: {
      title: "VERTEBRATE",
      cards: [
        {
          id: "bone-physiology",
          title: "Bone Physiology",
          description: "Microgravity effects on bone density, osteocyte function, and calcium metabolism",
          image: "🦴"
        },
        {
          id: "muscle-adaptation", 
          title: "Muscle Adaptation",
          description: "Skeletal muscle changes, atrophy prevention, and exercise countermeasures",
          image: "💪"
        },
        {
          id: "cardiovascular-changes",
          title: "Cardiovascular Changes", 
          description: "Heart function adaptations and blood circulation in microgravity",
          image: "❤️"
        }
      ],
      hashtags: ["#VertebrataModel", "#HumanCellsInMicrogravity", "#OmicsIntegration", "#SystemsPhysiology", "#ComparativeMicrogravityModels"]
    },
    plants: {
      title: "PLANTS",
      cards: [
        {
          id: "model-species",
          title: "Model Species",
          description: "Arabidopsis, Brassica rapa, moss, and other plant models in space research",
          image: "🌿"
        },
        {
          id: "gravitropism-growth",
          title: "Gravitropism & Growth",
          description: "Root growth patterns, photosynthesis, and gene expression in microgravity",
          image: "🌱"
        },
        {
          id: "stress-hormones",
          title: "Stress & Hormones",
          description: "Stress signaling pathways, root development, and auxin regulation",
          image: "🌾"
        }
      ],
      hashtags: ["#SpacePlants", "#RootGrowth", "#Photosynthesis", "#PlantOmics", "#Gravitropism"]
    },
    microbes: {
      title: "MICROBES",
      cards: [
        {
          id: "bacterial-adaptation",
          title: "Bacterial Adaptation",
          description: "Microbial survival strategies and genetic modifications in extreme environments",
          image: "🦠"
        },
        {
          id: "virulence-factors",
          title: "Virulence Factors",
          description: "Changes in pathogenicity and biofilm formation under space conditions",
          image: "🧫"
        },
        {
          id: "extremophiles",
          title: "Extremophiles",
          description: "Hardy microorganisms and their potential for astrobiology applications",
          image: "🔬"
        }
      ],
      hashtags: ["#Astrobiology", "#BacterialAdaptation", "#Extremophiles", "#SpaceMicrobiology", "#PlanetaryProtection"]
    },
    fungi: {
      title: "FUNGI",
      cards: [
        {
          id: "spore-viability",
          title: "Spore Viability",
          description: "Fungal spore survival rates and dormancy mechanisms in space environments",
          image: "🍄"
        },
        {
          id: "morphological-changes",
          title: "Morphological Changes",
          description: "Structural adaptations and growth pattern modifications in microgravity",
          image: "🧬"
        },
        {
          id: "biotechnology-applications",
          title: "Biotechnology Applications",
          description: "Fungal biomaterials and potential applications for space missions",
          image: "⚗️"
        }
      ],
      hashtags: ["#FungalBiology", "#SporeViability", "#Biotechnology", "#SpaceMaterials", "#FungalAdaptation"]
    },
    "human-cell": {
      title: "HUMAN CELL & BIOMEDICAL",
      cards: [
        {
          id: "cell-culture",
          title: "Cell Culture",
          description: "Human cell line responses and adaptation mechanisms in microgravity",
          image: "🧪"
        },
        {
          id: "tissue-engineering",
          title: "Tissue Engineering",
          description: "3D tissue models and regenerative medicine applications in space",
          image: "🫀"
        },
        {
          id: "drug-development",
          title: "Drug Development",
          description: "Pharmaceutical research and drug efficacy studies in microgravity",
          image: "💊"
        }
      ],
      hashtags: ["#SpaceMedicine", "#CellCulture", "#TissueEngineering", "#DrugDevelopment", "#HumanHealthInSpace"]
    },
    "systems-biology": {
      title: "SYSTEMS BIOLOGY & TOOLS",
      cards: [
        {
          id: "omics-integration",
          title: "Omics Integration",
          description: "Multi-omics approaches for comprehensive biological system analysis",
          image: "📊"
        },
        {
          id: "bioinformatics-tools",
          title: "Bioinformatics Tools",
          description: "Computational methods and software for space biology data analysis",
          image: "💻"
        },
        {
          id: "data-visualization",
          title: "Data Visualization",
          description: "Advanced visualization techniques for complex biological datasets",
          image: "📈"
        }
      ],
      hashtags: ["#SystemsBiology", "#Bioinformatics", "#DataScience", "#OmicsIntegration", "#ComputationalBiology"]
    }
  };

  const currentTopic = topicData[topic || ""];
  
  if (!currentTopic) {
    return <div className="min-h-screen flex items-center justify-center">Topic not found</div>;
  }

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
            
            <SearchBar placeholder="Search articles..." />
            
            <Navigation />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              <h1 className="text-5xl font-bold text-gray-900 mb-12 text-center">
                {currentTopic.title}
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {currentTopic.cards.map((card: any) => (
                  <Link
                    key={card.id}
                    to={`/articles/${topic}`}
                    className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="text-center">
                      <div className="text-6xl mb-4">{card.image}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600">
                        {card.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Panel - Related Topics */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-lg sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Related Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {currentTopic.hashtags.map((hashtag: string) => (
                    <button
                      key={hashtag}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors"
                      onClick={() => {
                        // Filter functionality would go here
                        console.log(`Filtering by ${hashtag}`);
                      }}
                    >
                      {hashtag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <BackToTopButton />
    </div>
  );
}