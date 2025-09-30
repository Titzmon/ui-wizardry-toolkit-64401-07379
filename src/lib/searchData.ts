export interface Article {
  id: string;
  title: string;
  description: string;
  topic: string;
  year: number;
  authors: string[];
  keywords: string[];
  abstract: string;
  sections: {
    background: string;
    methods: string;
    results: string;
    discussion: string;
    conclusion: string;
  };
  isRead?: boolean;
  isHighlighted?: boolean;
}

export const articles: Article[] = [
  {
    id: "vertebrate-bone-loss",
    title: "Microgravity Induces Pelvic Bone Loss Through Osteoclastic Activity",
    description: "Comprehensive study on bone density changes in microgravity environments and cellular mechanisms.",
    topic: "Vertebrate",
    year: 2024,
    authors: ["Dr. Sarah Chen", "Dr. Michael Rodriguez", "Dr. Emma Thompson"],
    keywords: ["microgravity", "bone loss", "osteocytes", "osteoblasts", "osteoclasts", "pelvic bone", "space medicine"],
    abstract: "This study investigates the mechanisms of bone loss in microgravity environments, focusing on cellular activity and metabolic changes in vertebrate models.",
    sections: {
      background: "Microgravity environments pose significant challenges to bone health in vertebrates. Previous studies have shown accelerated bone loss during spaceflight, but the underlying cellular mechanisms remain unclear.",
      methods: "We utilized a combination of in vitro cell cultures and animal models exposed to simulated microgravity conditions. Bone density measurements were taken using micro-CT scanning, and cellular activity was monitored through fluorescent markers.",
      results: "Our findings demonstrate a 15-20% reduction in bone density over 30 days of microgravity exposure. Osteoclastic activity increased by 300% while osteoblastic activity decreased by 40%.",
      discussion: "The results suggest that microgravity primarily affects bone remodeling through enhanced bone resorption rather than decreased bone formation. This has significant implications for long-duration spaceflight missions.",
      conclusion: "Understanding these mechanisms is crucial for developing countermeasures to prevent bone loss in astronauts during extended space missions."
    }
  },
  {
    id: "plants-gravitropism",
    title: "Root Growth and Photosynthesis in Microgravity: Arabidopsis Model Studies",
    description: "Investigation of plant growth mechanisms and photosynthetic efficiency in zero-gravity conditions.",
    topic: "Plants",
    year: 2023,
    authors: ["Dr. Lisa Wang", "Dr. James Park", "Dr. Maria Gonzalez"],
    keywords: ["gravitropism", "root growth", "photosynthesis", "Arabidopsis", "plant biology", "space agriculture", "auxin regulation"],
    abstract: "This research examines how microgravity affects plant growth patterns, root development, and photosynthetic processes in Arabidopsis thaliana.",
    sections: {
      background: "Understanding plant growth in microgravity is essential for sustainable life support systems in space exploration.",
      methods: "Arabidopsis seedlings were grown in controlled microgravity simulators with continuous monitoring of growth parameters.",
      results: "Plants showed altered gravitropic responses with increased lateral root formation and modified photosynthetic efficiency.",
      discussion: "The adaptive mechanisms suggest potential for successful space agriculture with proper environmental controls.",
      conclusion: "These findings contribute to the development of sustainable food production systems for space missions."
    }
  },
  {
    id: "microbes-adaptation",
    title: "Bacterial Adaptation and Virulence Changes in Simulated Martian Environment",
    description: "Study of microbial behavior and genetic expression under extreme environmental conditions.",
    topic: "Microbes",
    year: 2024,
    authors: ["Dr. Robert Kim", "Dr. Alice Johnson", "Dr. David Lee"],
    keywords: ["bacteria", "Mars simulation", "virulence", "adaptation", "extremophiles", "astrobiology", "genetic expression"],
    abstract: "This study explores how bacteria adapt to Mars-like environmental conditions and the implications for planetary protection.",
    sections: {
      background: "Understanding microbial survival and adaptation in extraterrestrial environments is crucial for planetary protection protocols.",
      methods: "Bacterial cultures were exposed to simulated Martian conditions including low pressure, temperature fluctuations, and radiation.",
      results: "Several bacterial strains showed enhanced survival mechanisms and altered virulence factors under stress conditions.",
      discussion: "The adaptive responses highlight the importance of strict sterilization protocols for space missions.",
      conclusion: "These findings inform biosafety measures and contamination prevention strategies for Mars exploration."
    }
  },
  {
    id: "fungi-spores",
    title: "Fungal Spore Viability and Morphological Changes in Deep Space Conditions",
    description: "Analysis of fungal survival mechanisms and structural adaptations in extreme space environments.",
    topic: "Fungi",
    year: 2023,
    authors: ["Dr. Nina Patel", "Dr. Carlos Silva", "Dr. Helen Chang"],
    keywords: ["fungi", "spores", "deep space", "viability", "morphology", "extremophiles", "space biology"],
    abstract: "Investigation of fungal spore survival and morphological adaptations when exposed to deep space environmental conditions.",
    sections: {
      background: "Fungi represent one of the most resilient life forms and understanding their survival in space has implications for astrobiology.",
      methods: "Fungal spores were exposed to vacuum, radiation, and extreme temperatures typical of deep space conditions.",
      results: "Spores demonstrated remarkable survival rates with morphological adaptations that enhanced resistance to environmental stresses.",
      discussion: "The survival mechanisms identified could inform the search for life in extreme extraterrestrial environments.",
      conclusion: "Fungal resilience provides insights into the potential for life to survive interplanetary travel."
    }
  },
  {
    id: "human-cell-culture",
    title: "Human Cell Culture Responses to Microgravity: Implications for Space Medicine",
    description: "Comprehensive analysis of human cellular responses and adaptation mechanisms in microgravity conditions.",
    topic: "Human Cell & Biomedical",
    year: 2024,
    authors: ["Dr. Amanda Foster", "Dr. Kevin Zhang", "Dr. Sophie Miller"],
    keywords: ["human cells", "cell culture", "microgravity", "space medicine", "cellular adaptation", "biomedical research"],
    abstract: "This study examines how human cells respond and adapt to microgravity conditions at the cellular and molecular level.",
    sections: {
      background: "Understanding cellular responses to microgravity is fundamental to protecting astronaut health during space missions.",
      methods: "Various human cell lines were cultured in microgravity simulators with comprehensive molecular analysis.",
      results: "Cells showed altered metabolism, gene expression, and protein synthesis patterns in microgravity conditions.",
      discussion: "The cellular adaptations provide insights into potential health risks and protective mechanisms.",
      conclusion: "These findings contribute to the development of medical countermeasures for space exploration."
    }
  },
  {
    id: "systems-biology-omics",
    title: "Integrative Omics Analysis of Biological Systems in Space Environment",
    description: "Multi-omics approach to understanding biological system responses to space environmental factors.",
    topic: "Systems Biology & Tools",
    year: 2023,
    authors: ["Dr. Rachel Green", "Dr. Thomas Anderson", "Dr. Yuki Tanaka"],
    keywords: ["omics", "systems biology", "space environment", "bioinformatics", "multi-omics", "data integration"],
    abstract: "Application of integrated omics technologies to study complex biological responses to space environmental conditions.",
    sections: {
      background: "Systems-level approaches are needed to understand the complex interactions of biological systems in space environments.",
      methods: "Multi-omics data integration including genomics, transcriptomics, proteomics, and metabolomics analysis.",
      results: "Comprehensive molecular profiles revealed coordinated responses across multiple biological pathways.",
      discussion: "The systems-level insights provide a holistic understanding of space-induced biological changes.",
      conclusion: "Integrated omics approaches are essential for advancing space biology research and astronaut health protection."
    }
  }
];

export function searchArticles(query: string): Article[] {
  if (!query.trim()) return [];
  
  const lowerQuery = query.toLowerCase();
  
  return articles.filter(article => {
    return (
      article.title.toLowerCase().includes(lowerQuery) ||
      article.description.toLowerCase().includes(lowerQuery) ||
      article.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery)) ||
      article.topic.toLowerCase().includes(lowerQuery) ||
      article.abstract.toLowerCase().includes(lowerQuery)
    );
  });
}

export function getArticleById(id: string): Article | undefined {
  return articles.find(article => article.id === id);
}

export function getArticlesByTopic(topic: string): Article[] {
  return articles.filter(article => 
    article.topic.toLowerCase().replace(/\s+/g, '-') === topic.toLowerCase()
  );
}