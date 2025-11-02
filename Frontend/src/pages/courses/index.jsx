import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CourseCard from './components/CourseCard';
import SearchBar from './components/SearchBar';
import CourseComparison from './components/CourseComparison';
import CourseStats from './components/CourseStats';
import SortingControls from './components/SortingControls';

const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    categories: [],
    levels: [],
    durations: [],
    ratings: [],
    features: [],
    priceRange: { min: null, max: null }
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid');
  const [wishlist, setWishlist] = useState([]);
  const [comparison, setComparison] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  // Mock courses data
  const mockCourses = [
  {
    id: 1,
    title: "Complete React Development Masterclass 2024",
    description: "Master React from basics to advanced concepts including hooks, context, Redux, and modern development practices with real-world projects.",
    image: "https://images.unsplash.com/photo-1662638600507-0846616ec508",
    imageAlt: "Modern computer setup with React code displayed on multiple monitors in a bright office environment",
    category: "Programming & Development",
    level: "Intermediate",
    price: 89.99,
    originalPrice: 199.99,
    duration: 120,
    lessons: 45,
    enrolled: 15420,
    rating: 4.8,
    reviews: 2341,
    isNew: true,
    instructor: {
      name: "Dr. Sarah Johnson",
      title: "Senior React Developer",
      avatar: "https://images.unsplash.com/photo-1702089050621-62646a2b748f",
      avatarAlt: "Professional headshot of Dr. Sarah Johnson, a woman with shoulder-length brown hair wearing a navy blazer"
    },
    outcomes: ["React Hooks", "State Management", "Component Architecture", "Testing", "Deployment"],
    features: ["certificate", "lifetime", "mobile", "support"]
  },
  {
    id: 2,
    title: "Advanced JavaScript ES6+ and Beyond",
    description: "Deep dive into modern JavaScript features, asynchronous programming, modules, and advanced concepts for professional development.",
    image: "https://images.unsplash.com/photo-1516101922849-2bf0be616449",
    imageAlt: "Close-up view of JavaScript code on a dark theme editor with colorful syntax highlighting",
    category: "Programming & Development",
    level: "Advanced",
    price: 79.99,
    originalPrice: 149.99,
    duration: 80,
    lessons: 32,
    enrolled: 8750,
    rating: 4.9,
    reviews: 1876,
    isNew: false,
    instructor: {
      name: "Prof. Michael Chen",
      title: "JavaScript Expert",
      avatar: "https://images.unsplash.com/photo-1698072556534-40ec6e337311",
      avatarAlt: "Professional headshot of Prof. Michael Chen, an Asian man with glasses wearing a gray suit"
    },
    outcomes: ["ES6+ Features", "Async/Await", "Modules", "Performance", "Best Practices"],
    features: ["certificate", "lifetime", "mobile"]
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals with Figma",
    description: "Learn user interface and user experience design principles using Figma, from wireframing to prototyping and design systems.",
    image: "https://images.unsplash.com/photo-1541462608143-67571c6738dd",
    imageAlt: "Designer working on UI mockups and wireframes spread across a desk with Figma interface visible on laptop screen",
    category: "Design & Creative",
    level: "Beginner",
    price: 0,
    duration: 60,
    lessons: 28,
    enrolled: 12300,
    rating: 4.7,
    reviews: 1543,
    isNew: true,
    instructor: {
      name: "Emma Rodriguez",
      title: "UX Design Lead",
      avatar: "https://images.unsplash.com/photo-1682683067633-190ac6961144",
      avatarAlt: "Professional headshot of Emma Rodriguez, a Hispanic woman with curly hair wearing a creative patterned top"
    },
    outcomes: ["Design Principles", "Figma Mastery", "Prototyping", "User Research", "Design Systems"],
    features: ["certificate", "mobile", "support"]
  },
  {
    id: 4,
    title: "Digital Marketing Strategy & Analytics",
    description: "Comprehensive digital marketing course covering SEO, social media, content marketing, and data-driven decision making.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3",
    imageAlt: "Marketing analytics dashboard displayed on laptop screen showing colorful charts and graphs with marketing team in background",
    category: "Marketing & Sales",
    level: "Intermediate",
    price: 129.99,
    originalPrice: 249.99,
    duration: 100,
    lessons: 38,
    enrolled: 9870,
    rating: 4.6,
    reviews: 1234,
    isNew: false,
    instructor: {
      name: "David Thompson",
      title: "Marketing Director",
      avatar: "https://images.unsplash.com/photo-1667575949231-fbf430640797",
      avatarAlt: "Professional headshot of David Thompson, a middle-aged man with beard wearing a blue business shirt"
    },
    outcomes: ["SEO Optimization", "Social Media", "Analytics", "Content Strategy", "ROI Measurement"],
    features: ["certificate", "lifetime", "support"]
  },
  {
    id: 5,
    title: "Data Science with Python and Machine Learning",
    description: "Complete data science bootcamp covering Python, pandas, NumPy, machine learning algorithms, and real-world data analysis projects.",
    image: "https://images.unsplash.com/photo-1698919585695-546e4a31fc8f",
    imageAlt: "Data scientist analyzing complex datasets with Python code and colorful data visualizations on multiple computer screens",
    category: "Data Science & Analytics",
    level: "Advanced",
    price: 199.99,
    originalPrice: 399.99,
    duration: 180,
    lessons: 65,
    enrolled: 6540,
    rating: 4.9,
    reviews: 987,
    isNew: true,
    instructor: {
      name: "Dr. Priya Patel",
      title: "Data Science PhD",
      avatar: "https://images.unsplash.com/photo-1704455305620-21d29b7b63a0",
      avatarAlt: "Professional headshot of Dr. Priya Patel, an Indian woman with long black hair wearing a white lab coat"
    },
    outcomes: ["Python Programming", "Machine Learning", "Data Visualization", "Statistical Analysis", "Model Deployment"],
    features: ["certificate", "lifetime", "mobile", "support"]
  },
  {
    id: 6,
    title: "Cybersecurity Fundamentals and Ethical Hacking",
    description: "Learn cybersecurity principles, network security, penetration testing, and ethical hacking techniques for modern digital protection.",
    image: "https://images.unsplash.com/photo-1651990892631-723da6447d7d",
    imageAlt: "Cybersecurity expert working on network security analysis with multiple monitors showing security dashboards and code",
    category: "Cybersecurity",
    level: "Intermediate",
    price: 159.99,
    originalPrice: 299.99,
    duration: 140,
    lessons: 52,
    enrolled: 4320,
    rating: 4.8,
    reviews: 756,
    isNew: false,
    instructor: {
      name: "James Wilson",
      title: "Security Consultant",
      avatar: "https://images.unsplash.com/photo-1616707808904-e012afa93dba",
      avatarAlt: "Professional headshot of James Wilson, a man with short brown hair wearing a black security uniform"
    },
    outcomes: ["Network Security", "Penetration Testing", "Risk Assessment", "Incident Response", "Security Tools"],
    features: ["certificate", "lifetime", "support"]
  },
  {
    id: 7,
    title: "Cloud Computing with AWS and Azure",
    description: "Master cloud computing platforms including AWS and Azure services, deployment strategies, and cloud architecture best practices.",
    image: "https://images.unsplash.com/photo-1667984390535-6d03cff0b11a",
    imageAlt: "Cloud computing infrastructure visualization with servers and network connections displayed on futuristic holographic interface",
    category: "Cloud Computing",
    level: "Advanced",
    price: 179.99,
    originalPrice: 349.99,
    duration: 160,
    lessons: 58,
    enrolled: 5670,
    rating: 4.7,
    reviews: 892,
    isNew: true,
    instructor: {
      name: "Lisa Chang",
      title: "Cloud Architect",
      avatar: "https://images.unsplash.com/photo-1525614686090-7a3108e3758e",
      avatarAlt: "Professional headshot of Lisa Chang, an Asian woman with short black hair wearing a modern tech company polo shirt"
    },
    outcomes: ["AWS Services", "Azure Platform", "Cloud Architecture", "DevOps", "Cost Optimization"],
    features: ["certificate", "lifetime", "mobile", "support"]
  },
  {
    id: 8,
    title: "Artificial Intelligence and Machine Learning Basics",
    description: "Introduction to AI and ML concepts, algorithms, neural networks, and practical applications in modern technology solutions.",
    image: "https://images.unsplash.com/photo-1578496479939-722d9dd1cc5b",
    imageAlt: "AI researcher working with neural network visualizations and machine learning algorithms on advanced computer systems",
    category: "AI & Machine Learning",
    level: "Beginner",
    price: 99.99,
    originalPrice: 199.99,
    duration: 90,
    lessons: 35,
    enrolled: 11200,
    rating: 4.6,
    reviews: 1456,
    isNew: false,
    instructor: {
      name: "Dr. Robert Kim",
      title: "AI Research Scientist",
      avatar: "https://images.unsplash.com/photo-1620928269189-dc4ee9d981c0",
      avatarAlt: "Professional headshot of Dr. Robert Kim, a Korean man with glasses wearing a white research lab coat"
    },
    outcomes: ["AI Fundamentals", "ML Algorithms", "Neural Networks", "Deep Learning", "AI Applications"],
    features: ["certificate", "mobile", "support"]
  }];


  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = mockCourses?.filter((course) => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery?.toLowerCase();
        const matchesSearch =
        course?.title?.toLowerCase()?.includes(query) ||
        course?.description?.toLowerCase()?.includes(query) ||
        course?.category?.toLowerCase()?.includes(query) ||
        course?.instructor?.name?.toLowerCase()?.includes(query) ||
        course?.outcomes?.some((outcome) => outcome?.toLowerCase()?.includes(query));

        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters?.categories?.length > 0) {
        const categoryMatch = filters?.categories?.some((cat) => {
          switch (cat) {
            case 'programming':return course?.category === 'Programming & Development';
            case 'design':return course?.category === 'Design & Creative';
            case 'business':return course?.category === 'Business & Management';
            case 'marketing':return course?.category === 'Marketing & Sales';
            case 'data-science':return course?.category === 'Data Science & Analytics';
            case 'cybersecurity':return course?.category === 'Cybersecurity';
            case 'cloud':return course?.category === 'Cloud Computing';
            case 'ai-ml':return course?.category === 'AI & Machine Learning';
            default:return false;
          }
        });
        if (!categoryMatch) return false;
      }

      // Level filter
      if (filters?.levels?.length > 0) {
        if (!filters?.levels?.includes(course?.level?.toLowerCase())) return false;
      }

      // Duration filter
      if (filters?.durations?.length > 0) {
        const durationMatch = filters?.durations?.some((dur) => {
          switch (dur) {
            case 'short':return course?.duration < 60;
            case 'medium':return course?.duration >= 60 && course?.duration <= 150;
            case 'long':return course?.duration > 150;
            default:return false;
          }
        });
        if (!durationMatch) return false;
      }

      // Rating filter
      if (filters?.ratings?.length > 0) {
        const ratingMatch = filters?.ratings?.some((rating) => {
          const minRating = parseFloat(rating);
          return course?.rating >= minRating;
        });
        if (!ratingMatch) return false;
      }

      // Price range filter
      if (filters?.priceRange?.min !== null || filters?.priceRange?.max !== null) {
        const { min, max } = filters?.priceRange;
        if (min !== null && course?.price < min) return false;
        if (max !== null && course?.price > max) return false;
      }

      // Features filter
      if (filters?.features?.length > 0) {
        const hasAllFeatures = filters?.features?.every((feature) =>
        course?.features?.includes(feature)
        );
        if (!hasAllFeatures) return false;
      }

      return true;
    });

    // Sort courses
    filtered?.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'popularity':
          comparison = b?.enrolled - a?.enrolled;
          break;
        case 'rating':
          comparison = b?.rating - a?.rating;
          break;
        case 'price-low':
          comparison = a?.price - b?.price;
          break;
        case 'price-high':
          comparison = b?.price - a?.price;
          break;
        case 'newest':
          comparison = b?.isNew - a?.isNew;
          break;
        case 'duration':
          comparison = b?.duration - a?.duration;
          break;
        default: // relevance
          comparison = b?.rating * b?.enrolled - a?.rating * a?.enrolled;
      }

      return sortOrder === 'asc' ? -comparison : comparison;
    });

    return filtered;
  }, [mockCourses, searchQuery, filters, sortBy, sortOrder]);

  // Handle wishlist toggle
  const handleWishlistToggle = (courseId) => {
    setWishlist((prev) =>
    prev?.includes(courseId) ?
    prev?.filter((id) => id !== courseId) :
    [...prev, courseId]
    );
  };

  // Handle comparison toggle
  const handleComparisonToggle = (courseId) => {
    setComparison((prev) => {
      if (prev?.includes(courseId)) {
        return prev?.filter((id) => id !== courseId);
      } else if (prev?.length < 3) {
        return [...prev, courseId];
      } else {
        // Replace oldest item if at limit
        return [...prev?.slice(1), courseId];
      }
    });
  };

  // Handle search suggestion selection
  const handleSuggestionSelect = (suggestion) => {
    if (suggestion?.type === 'category') {
      const categoryMap = {
        'Programming & Development': 'programming',
        'Design & Creative': 'design',
        'Marketing & Sales': 'marketing',
        'Data Science & Analytics': 'data-science'
      };
      const categoryId = categoryMap?.[suggestion?.title];
      if (categoryId) {
        setFilters((prev) => ({
          ...prev,
          categories: [...(prev?.categories || []), categoryId]
        }));
      }
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      categories: [],
      levels: [],
      durations: [],
      ratings: [],
      features: [],
      priceRange: { min: null, max: null }
    });
    setSearchQuery('');
  };

  // Handle sorting change
  const handleSortChange = (newSortBy, newSortOrder = sortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  // Get comparison courses
  const comparisonCourses = mockCourses?.filter((course) =>
  comparison?.includes(course?.id)
  );

  // Auto-open comparison when courses are added
  useEffect(() => {
    if (comparison?.length > 0) {
      setIsComparisonOpen(true);
    }
  }, [comparison?.length]);

  return (
    <>
      <Helmet>
        <title>Courses - EduVision Academy | Interactive Course Catalog & Discovery</title>
        <meta name="description" content="Explore our comprehensive course catalog with advanced filtering, comparison tools, and interactive discovery features. Find the perfect learning path for your career goals." />
        <meta name="keywords" content="online courses, programming, design, business, data science, cybersecurity, cloud computing, AI, machine learning" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-20 pb-12 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-gradient mb-4">
                Discover Your Perfect Course
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore our comprehensive catalog of expert-led courses designed to accelerate your career and unlock your potential
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex justify-center mb-8">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSuggestionSelect={handleSuggestionSelect} />

            </div>

            {/* Course Stats */}
            <CourseStats
              totalCourses={mockCourses?.length}
              filteredCourses={filteredAndSortedCourses?.length}
              activeFilters={filters} />

          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8">
              {/* Course Content */}
              <div className="flex-1 min-w-0">
                {/* Sorting Controls */}
                <SortingControls
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSortChange={handleSortChange}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  onFilterToggle={() => setIsFilterOpen(!isFilterOpen)}
                  resultsCount={filteredAndSortedCourses?.length} />


                {/* Course Grid */}
                {filteredAndSortedCourses?.length > 0 ?
                <div className={`grid gap-6 ${
                viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`
                }>
                    {filteredAndSortedCourses?.map((course) =>
                  <CourseCard
                    key={course?.id}
                    course={course}
                    onWishlistToggle={handleWishlistToggle}
                    onCompareToggle={handleComparisonToggle}
                    isInWishlist={wishlist?.includes(course?.id)}
                    isInComparison={comparison?.includes(course?.id)} />

                  )}
                  </div> :

                <div className="text-center py-16">
                    <div className="w-24 h-24 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                      <Icon name="Search" size={32} className="text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      No courses found
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your search criteria or filters to find more courses
                    </p>
                    <Button variant="outline" onClick={handleClearFilters}>
                      <Icon name="RotateCcw" size={16} className="mr-2" />
                      Clear All Filters
                    </Button>
                  </div>
                }

                {/* Load More Button */}
                {filteredAndSortedCourses?.length > 0 &&
                <div className="text-center mt-12">
                    <Button variant="outline" size="lg">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Load More Courses
                    </Button>
                  </div>
                }
              </div>
            </div>
          </div>
        </section>

        {/* Course Comparison */}
        {comparison?.length > 0 &&
        <CourseComparison
          courses={comparisonCourses}
          onRemoveCourse={(courseId) => setComparison((prev) => prev?.filter((id) => id !== courseId))}
          onClearComparison={() => setComparison([])}
          isOpen={isComparisonOpen}
          onToggle={() => setIsComparisonOpen(!isComparisonOpen)} />

        }

        {/* Floating Comparison Button */}
        {comparison?.length > 0 &&
        <button
          onClick={() => setIsComparisonOpen(!isComparisonOpen)}
          className="fixed bottom-6 right-6 bg-primary text-primary-foreground p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 lg:hidden"
          aria-label="Toggle course comparison">

            <div className="flex items-center space-x-2">
              <Icon name="GitCompare" size={20} />
              <span className="text-sm font-medium">{comparison?.length}</span>
            </div>
          </button>
        }

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated with New Courses
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get notified when we add new courses that match your interests
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/50 outline-none" />

              <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>);

};

export default CoursesPage;