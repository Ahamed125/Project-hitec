import React, { useState } from 'react';
import { Save, Target, Users, Star, Image, Play, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { useAdmin } from '../context/AdminContext';
import { toast } from '../utils/toast';

export const About = () => {
  const { about, setAbout } = useAdmin();
  const [activeTab, setActiveTab] = useState('hero');

  const tabs = [
    { id: 'hero', label: 'Hero Section', icon: Image, color: 'text-blue-600' },
    { id: 'mission', label: 'Mission', icon: Target, color: 'text-green-600' },
    { id: 'values', label: 'Core Values', icon: Star, color: 'text-purple-600' },
  ];

  const handleSave = () => {
    toast.success('About page settings saved successfully!');
  };

  const updateHero = (field, value) => {
    setAbout(prev => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }));
  };

  const updateMission = (field, value) => {
    setAbout(prev => ({
      ...prev,
      mission: { ...prev.mission, [field]: value }
    }));
  };

  const updateValues = (field, value) => {
    setAbout(prev => ({
      ...prev,
      values: { ...prev.values, [field]: value }
    }));
  };

  const getTabColor = (tabId) => {
    switch (tabId) {
      case 'hero': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'mission': return 'bg-green-50 border-green-200 text-green-700';
      case 'values': return 'bg-purple-50 border-purple-200 text-purple-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">
              About Page Management
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Customize your about page content and sections</p>
          </div>
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <Save size={20} className="mr-2" />
            Save All Changes
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-80 space-y-3">
            {tabs.map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 group hover:shadow-lg ${
                    activeTab === tab.id
                      ? `${getTabColor(tab.id)} border-current shadow-lg transform scale-105`
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg transition-colors ${
                      activeTab === tab.id ? 'bg-white' : 'bg-gray-100 group-hover:bg-gray-200'
                    }`}>
                      <IconComponent size={20} className={activeTab === tab.id ? tab.color : 'text-gray-500'} />
                    </div>
                    <div>
                      <span className="font-semibold block">{tab.label}</span>
                      <span className="text-sm opacity-75">
                        {tab.id === 'hero' && 'Main banner section'}
                        {tab.id === 'mission' && 'Mission and vision'}
                        {tab.id === 'values' && 'Core principles'}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'hero' && (
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-b border-blue-200">
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Image className="text-blue-600" size={24} />
                    About Hero Section
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-2 border-blue-200 rounded-xl p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-4">Main Content</h3>
                    <div className="space-y-4">
                      <Input 
                        label="Badge Text" 
                        value={about.hero.badgeText} 
                        onChange={(e) => updateHero('badgeText', e.target.value)} 
                        placeholder="About Our College"
                        className="bg-white border-2 border-gray-300 focus:border-blue-500"
                      />
                      <Input 
                        label="Main Title Line 1" 
                        value={about.hero.mainTitle1} 
                        onChange={(e) => updateHero('mainTitle1', e.target.value)} 
                        placeholder="Welcome to Our Educational"
                        className="bg-white border-2 border-gray-300 focus:border-blue-500"
                      />
                      <Input 
                        label="Accent Title" 
                        value={about.hero.accentTitle} 
                        onChange={(e) => updateHero('accentTitle', e.target.value)} 
                        placeholder="Journey of Excellence"
                        className="bg-white border-2 border-gray-300 focus:border-blue-500"
                      />
                      <Textarea 
                        label="Description" 
                        value={about.hero.description} 
                        onChange={(e) => updateHero('description', e.target.value)} 
                        placeholder="Describe your institution's story and values..."
                        rows={4}
                        className="bg-white border-2 border-gray-300 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 border-2 border-purple-200 rounded-xl p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                      <Image size={18} className="text-purple-600" />
                      Hero Image
                    </h3>
                    <div className="space-y-4">
                      <Input 
                        label="Hero Image URL" 
                        value={about.hero.heroImage} 
                        onChange={(e) => updateHero('heroImage', e.target.value)} 
                        placeholder="https://example.com/hero-image.jpg"
                        className="bg-white border-2 border-gray-300 focus:border-purple-500"
                      />
                      <Input 
                        label="Image Alt Text" 
                        value={about.hero.imageAlt} 
                        onChange={(e) => updateHero('imageAlt', e.target.value)} 
                        placeholder="Descriptive text for accessibility"
                        className="bg-white border-2 border-gray-300 focus:border-purple-500"
                      />
                      {about.hero.heroImage && (
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
                          <img 
                            src={about.hero.heroImage} 
                            alt="Preview" 
                            className="w-full h-32 object-cover rounded-lg border-2 border-gray-300"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200'; }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-green-100/50 border-2 border-green-200 rounded-xl p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                      <Play size={18} className="text-green-600" />
                      Call to Action
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input 
                        label="Watch Video Text" 
                        value={about.hero.watchVideoText} 
                        onChange={(e) => updateHero('watchVideoText', e.target.value)} 
                        placeholder="Watch Our Story"
                        className="bg-white border-2 border-gray-300 focus:border-green-500"
                      />
                      <Input 
                        label="Watch Video Link" 
                        value={about.hero.watchVideoLink} 
                        onChange={(e) => updateHero('watchVideoLink', e.target.value)} 
                        placeholder="https://youtube.com/your-video"
                        className="bg-white border-2 border-gray-300 focus:border-green-500"
                      />
                    </div>
                    <div className="mt-4">
                      <Input 
                        label="Explore Button Text" 
                        value={about.hero.exploreButtonText} 
                        onChange={(e) => updateHero('exploreButtonText', e.target.value)} 
                        placeholder="Explore Our Campus"
                        className="bg-white border-2 border-gray-300 focus:border-green-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'mission' && (
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-green-50 to-green-100/50 border-b border-green-200">
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Target className="text-green-600" size={24} />
                    Mission Section
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="bg-gradient-to-r from-green-50 to-green-100/50 border-2 border-green-200 rounded-xl p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-4">Mission Content</h3>
                    <div className="space-y-4">
                      <Input 
                        label="Badge Text" 
                        value={about.mission.badgeText} 
                        onChange={(e) => updateMission('badgeText', e.target.value)} 
                        placeholder="Our Mission"
                        className="bg-white border-2 border-gray-300 focus:border-green-500"
                      />
                      <Input 
                        label="Title Line 1" 
                        value={about.mission.title1} 
                        onChange={(e) => updateMission('title1', e.target.value)} 
                        placeholder="Our Commitment to"
                        className="bg-white border-2 border-gray-300 focus:border-green-500"
                      />
                      <Input 
                        label="Title Line 2" 
                        value={about.mission.title2} 
                        onChange={(e) => updateMission('title2', e.target.value)} 
                        placeholder="Excellence in Education"
                        className="bg-white border-2 border-gray-300 focus:border-green-500"
                      />
                      <Textarea 
                        label="Description" 
                        value={about.mission.description} 
                        onChange={(e) => updateMission('description', e.target.value)} 
                        placeholder="Describe your institution's mission and vision..."
                        rows={5}
                        className="bg-white border-2 border-gray-300 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-2 border-blue-200 rounded-xl p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                      <Image size={18} className="text-blue-600" />
                      Mission Image
                    </h3>
                    <div className="space-y-4">
                      <Input 
                        label="Mission Image URL" 
                        value={about.mission.missionImage} 
                        onChange={(e) => updateMission('missionImage', e.target.value)} 
                        placeholder="https://example.com/mission-image.jpg"
                        className="bg-white border-2 border-gray-300 focus:border-blue-500"
                      />
                      <Input 
                        label="Image Alt Text" 
                        value={about.mission.imageAlt} 
                        onChange={(e) => updateMission('imageAlt', e.target.value)} 
                        placeholder="Descriptive text for mission image"
                        className="bg-white border-2 border-gray-300 focus:border-blue-500"
                      />
                      {about.mission.missionImage && (
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
                          <img 
                            src={about.mission.missionImage} 
                            alt="Preview" 
                            className="w-full h-32 object-cover rounded-lg border-2 border-gray-300"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200'; }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'values' && (
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100/50 border-b border-purple-200">
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Star className="text-purple-600" size={24} />
                    Core Values Section
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 border-2 border-purple-200 rounded-xl p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-4">Values Content</h3>
                    <div className="space-y-4">
                      <Input 
                        label="Badge Text" 
                        value={about.values.badgeText} 
                        onChange={(e) => updateValues('badgeText', e.target.value)} 
                        placeholder="Our Values"
                        className="bg-white border-2 border-gray-300 focus:border-purple-500"
                      />
                      <Input 
                        label="Title" 
                        value={about.values.title} 
                        onChange={(e) => updateValues('title', e.target.value)} 
                        placeholder="Core Values That Define Us"
                        className="bg-white border-2 border-gray-300 focus:border-purple-500"
                      />
                      <Textarea 
                        label="Description" 
                        value={about.values.description} 
                        onChange={(e) => updateValues('description', e.target.value)} 
                        placeholder="Describe the core values and principles that guide your institution..."
                        rows={4}
                        className="bg-white border-2 border-gray-300 focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 border-2 border-orange-200 rounded-xl p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                      <Users size={18} className="text-orange-600" />
                      Core Values Configuration
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-4 bg-white rounded-lg border-2 border-gray-200">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Star size={18} className="text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">6 Core Values Configured</h4>
                          <p className="text-sm text-gray-600">Values are managed in the application state</p>
                        </div>
                        <div className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                          Active
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 bg-white/50 p-3 rounded-lg border border-gray-200">
                        For advanced customization of individual core values, please edit the values directly in the application state. 
                        Each value includes title, description, and icon configuration.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};