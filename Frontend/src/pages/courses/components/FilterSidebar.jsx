import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ filters, onFiltersChange, onClearFilters, isOpen, onToggle }) => {
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const categories = [
    { id: 'programming', label: 'Programming & Development', count: 45 },
    { id: 'design', label: 'Design & Creative', count: 32 },
    { id: 'business', label: 'Business & Management', count: 28 },
    { id: 'marketing', label: 'Marketing & Sales', count: 24 },
    { id: 'data-science', label: 'Data Science & Analytics', count: 19 },
    { id: 'cybersecurity', label: 'Cybersecurity', count: 15 },
    { id: 'cloud', label: 'Cloud Computing', count: 12 },
    { id: 'ai-ml', label: 'AI & Machine Learning', count: 18 }
  ];

  const levels = [
    { id: 'beginner', label: 'Beginner', count: 67 },
    { id: 'intermediate', label: 'Intermediate', count: 89 },
    { id: 'advanced', label: 'Advanced', count: 34 }
  ];

  const durations = [
    { id: 'short', label: 'Under 10 hours', count: 45 },
    { id: 'medium', label: '10-50 hours', count: 78 },
    { id: 'long', label: '50+ hours', count: 67 }
  ];

  const ratings = [
    { id: '4.5', label: '4.5 & up', count: 156 },
    { id: '4.0', label: '4.0 & up', count: 178 },
    { id: '3.5', label: '3.5 & up', count: 189 },
    { id: '3.0', label: '3.0 & up', count: 190 }
  ];

  const features = [
    { id: 'certificate', label: 'Certificate of Completion', count: 145 },
    { id: 'lifetime', label: 'Lifetime Access', count: 123 },
    { id: 'mobile', label: 'Mobile Access', count: 167 },
    { id: 'subtitles', label: 'Closed Captions', count: 134 },
    { id: 'quizzes', label: 'Practice Tests', count: 89 },
    { id: 'projects', label: 'Hands-on Projects', count: 76 }
  ];

  const handleCategoryChange = (categoryId, checked) => {
    const newCategories = checked
      ? [...(filters?.categories || []), categoryId]
      : (filters?.categories || [])?.filter(id => id !== categoryId);
    
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleLevelChange = (levelId, checked) => {
    const newLevels = checked
      ? [...(filters?.levels || []), levelId]
      : (filters?.levels || [])?.filter(id => id !== levelId);
    
    onFiltersChange({ ...filters, levels: newLevels });
  };

  const handleDurationChange = (durationId, checked) => {
    const newDurations = checked
      ? [...(filters?.durations || []), durationId]
      : (filters?.durations || [])?.filter(id => id !== durationId);
    
    onFiltersChange({ ...filters, durations: newDurations });
  };

  const handleRatingChange = (ratingId, checked) => {
    const newRatings = checked
      ? [...(filters?.ratings || []), ratingId]
      : (filters?.ratings || [])?.filter(id => id !== ratingId);
    
    onFiltersChange({ ...filters, ratings: newRatings });
  };

  const handleFeatureChange = (featureId, checked) => {
    const newFeatures = checked
      ? [...(filters?.features || []), featureId]
      : (filters?.features || [])?.filter(id => id !== featureId);
    
    onFiltersChange({ ...filters, features: newFeatures });
  };

  const handlePriceRangeChange = () => {
    onFiltersChange({ 
      ...filters, 
      priceRange: { 
        min: priceRange?.min ? parseInt(priceRange?.min) : null,
        max: priceRange?.max ? parseInt(priceRange?.max) : null
      }
    });
  };

  const FilterSection = ({ title, children, defaultOpen = true }) => {
    const [isExpanded, setIsExpanded] = useState(defaultOpen);

    return (
      <div className="border-b border-border pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left mb-4 group"
        >
          <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
            {title}
          </h3>
          <Icon 
            name="ChevronDown" 
            size={16} 
            className={`text-muted-foreground transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`} 
          />
        </button>
        
        <div className={`transition-all duration-300 overflow-hidden ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          {children}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      {/* Sidebar */}
      <div className={`fixed lg:sticky top-0 left-0 h-full lg:h-auto w-80 bg-background border-r border-border z-50 lg:z-auto transform transition-transform duration-300 lg:transform-none ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="h-full overflow-y-auto">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-6 border-b border-border lg:hidden">
            <h2 className="text-lg font-semibold text-foreground">Filters</h2>
            <button
              onClick={onToggle}
              className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          <div className="p-6">
            {/* Clear Filters */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground hidden lg:block">Filters</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="RotateCcw" size={14} className="mr-2" />
                Clear All
              </Button>
            </div>

            {/* Price Range */}
            <FilterSection title="Price Range">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceRange?.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: e?.target?.value })}
                    className="text-sm"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceRange?.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: e?.target?.value })}
                    className="text-sm"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePriceRangeChange}
                  fullWidth
                >
                  Apply Range
                </Button>
              </div>
            </FilterSection>

            {/* Categories */}
            <FilterSection title="Categories">
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {categories?.map((category) => (
                  <div key={category?.id} className="flex items-center justify-between">
                    <Checkbox
                      label={category?.label}
                      checked={(filters?.categories || [])?.includes(category?.id)}
                      onChange={(e) => handleCategoryChange(category?.id, e?.target?.checked)}
                      className="flex-1"
                    />
                    <span className="text-xs text-muted-foreground ml-2">
                      {category?.count}
                    </span>
                  </div>
                ))}
              </div>
            </FilterSection>

            {/* Difficulty Level */}
            <FilterSection title="Difficulty Level">
              <div className="space-y-3">
                {levels?.map((level) => (
                  <div key={level?.id} className="flex items-center justify-between">
                    <Checkbox
                      label={level?.label}
                      checked={(filters?.levels || [])?.includes(level?.id)}
                      onChange={(e) => handleLevelChange(level?.id, e?.target?.checked)}
                      className="flex-1"
                    />
                    <span className="text-xs text-muted-foreground ml-2">
                      {level?.count}
                    </span>
                  </div>
                ))}
              </div>
            </FilterSection>

            {/* Duration */}
            <FilterSection title="Course Duration">
              <div className="space-y-3">
                {durations?.map((duration) => (
                  <div key={duration?.id} className="flex items-center justify-between">
                    <Checkbox
                      label={duration?.label}
                      checked={(filters?.durations || [])?.includes(duration?.id)}
                      onChange={(e) => handleDurationChange(duration?.id, e?.target?.checked)}
                      className="flex-1"
                    />
                    <span className="text-xs text-muted-foreground ml-2">
                      {duration?.count}
                    </span>
                  </div>
                ))}
              </div>
            </FilterSection>

            {/* Ratings */}
            <FilterSection title="Ratings">
              <div className="space-y-3">
                {ratings?.map((rating) => (
                  <div key={rating?.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 flex-1">
                      <Checkbox
                        checked={(filters?.ratings || [])?.includes(rating?.id)}
                        onChange={(e) => handleRatingChange(rating?.id, e?.target?.checked)}
                      />
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={14} className="text-amber-400" fill="currentColor" />
                        <span className="text-sm text-foreground">{rating?.label}</span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">
                      {rating?.count}
                    </span>
                  </div>
                ))}
              </div>
            </FilterSection>

            {/* Features */}
            <FilterSection title="Course Features" defaultOpen={false}>
              <div className="space-y-3">
                {features?.map((feature) => (
                  <div key={feature?.id} className="flex items-center justify-between">
                    <Checkbox
                      label={feature?.label}
                      checked={(filters?.features || [])?.includes(feature?.id)}
                      onChange={(e) => handleFeatureChange(feature?.id, e?.target?.checked)}
                      className="flex-1"
                    />
                    <span className="text-xs text-muted-foreground ml-2">
                      {feature?.count}
                    </span>
                  </div>
                ))}
              </div>
            </FilterSection>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;