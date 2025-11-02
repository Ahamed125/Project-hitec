import React, { useState } from 'react';
import { Save, Plus, Trash2, Settings as SettingsIcon, Globe, Phone, Share2, Link, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { useAdmin } from '../context/AdminContext';
import { toast } from '../utils/toast';

export const Settings = () => {
  const { settings, setSettings } = useAdmin();
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', label: 'General', icon: SettingsIcon, color: 'text-blue-600', bg: 'from-blue-500 to-blue-600' },
    { id: 'contact', label: 'Contact', icon: Phone, color: 'text-green-600', bg: 'from-green-500 to-green-600' },
    { id: 'social', label: 'Social Media', icon: Share2, color: 'text-purple-600', bg: 'from-purple-500 to-purple-600' },
    { id: 'footer', label: 'Footer Links', icon: Link, color: 'text-orange-600', bg: 'from-orange-500 to-orange-600' },
    { id: 'trust', label: 'Trust Stats', icon: TrendingUp, color: 'text-red-600', bg: 'from-red-500 to-red-600' },
  ];

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  const handleChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const addLink = (type) => {
    const newId = Date.now();
    setSettings(prev => ({
      ...prev,
      footerLinks: {
        ...prev.footerLinks,
        [type]: [...prev.footerLinks[type], { id: newId, name: '', url: '' }]
      }
    }));
  };

  const removeLink = (type, id) => {
    setSettings(prev => ({
      ...prev,
      footerLinks: {
        ...prev.footerLinks,
        [type]: prev.footerLinks[type].filter(link => link.id !== id)
      }
    }));
  };

  const updateLink = (type, id, field, value) => {
    setSettings(prev => ({
      ...prev,
      footerLinks: {
        ...prev.footerLinks,
        [type]: prev.footerLinks[type].map(link =>
          link.id === id ? { ...link, [field]: value } : link
        )
      }
    }));
  };

  const getTabColor = (tabId) => {
    switch (tabId) {
      case 'general': return 'bg-blue-50 border-blue-200 text-blue-700 shadow-blue-100';
      case 'contact': return 'bg-green-50 border-green-200 text-green-700 shadow-green-100';
      case 'social': return 'bg-purple-50 border-purple-200 text-purple-700 shadow-purple-100';
      case 'footer': return 'bg-orange-50 border-orange-200 text-orange-700 shadow-orange-100';
      case 'trust': return 'bg-red-50 border-red-200 text-red-700 shadow-red-100';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-700 to-purple-600 bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Manage global site configuration</p>
          </div>
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105"
          >
            <Save size={20} className="mr-2" />
            Save All Changes
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Sidebar Navigation */}
          <div className="lg:w-80 space-y-3">
            {tabs.map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 group hover:shadow-lg relative overflow-hidden ${
                    activeTab === tab.id
                      ? `${getTabColor(tab.id)} border-current shadow-lg transform scale-105 ring-2 ring-opacity-20 ring-current`
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {/* Background gradient for active tab */}
                  {activeTab === tab.id && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${tab.bg} opacity-5`}></div>
                  )}
                  <div className="flex items-center gap-3 relative z-10">
                    <div className={`p-2 rounded-lg transition-all duration-300 ${
                      activeTab === tab.id 
                        ? 'bg-white shadow-md' 
                        : 'bg-gray-100 group-hover:bg-gray-200 group-hover:shadow-sm'
                    }`}>
                      <IconComponent 
                        size={20} 
                        className={activeTab === tab.id ? tab.color : 'text-gray-500'} 
                      />
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold block text-current">{tab.label}</span>
                      <span className="text-sm opacity-75">
                        {tab.id === 'general' && 'Site name & basic info'}
                        {tab.id === 'contact' && 'Contact information'}
                        {tab.id === 'social' && 'Social media links'}
                        {tab.id === 'footer' && 'Footer navigation'}
                        {tab.id === 'trust' && 'Statistics & metrics'}
                      </span>
                    </div>
                    {activeTab === tab.id && (
                      <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'general' && (
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/70 border-b border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                      <SettingsIcon className="text-white" size={24} />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">General Site Settings</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6 space-y-4">
                    <Input
                      label="Site Name"
                      value={settings.general.siteName}
                      onChange={(e) => handleChange('general', 'siteName', e.target.value)}
                      className="bg-gray-50 border-2 border-gray-300 focus:border-blue-500 transition-colors"
                    />
                    <Input
                      label="Brand Logo URL"
                      value={settings.general.brandLogo}
                      onChange={(e) => handleChange('general', 'brandLogo', e.target.value)}
                      placeholder="https://example.com/logo.png"
                      className="bg-gray-50 border-2 border-gray-300 focus:border-blue-500 transition-colors"
                    />
                    <Textarea
                      label="Site Description"
                      value={settings.general.siteDescription}
                      onChange={(e) => handleChange('general', 'siteDescription', e.target.value)}
                      rows={3}
                      className="bg-gray-50 border-2 border-gray-300 focus:border-blue-500 transition-colors"
                    />
                    <Textarea
                      label="Default Meta Description"
                      value={settings.general.metaDescription}
                      onChange={(e) => handleChange('general', 'metaDescription', e.target.value)}
                      rows={2}
                      className="bg-gray-50 border-2 border-gray-300 focus:border-blue-500 transition-colors"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'contact' && (
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-green-50 to-green-100/70 border-b border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Phone className="text-white" size={24} />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">Contact Information</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6 space-y-4">
                    <Textarea
                      label="Address"
                      value={settings.contact.address}
                      onChange={(e) => handleChange('contact', 'address', e.target.value)}
                      rows={2}
                      className="bg-gray-50 border-2 border-gray-300 focus:border-green-500 transition-colors"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="Verification Phone"
                        value={settings.contact.verificationPhone}
                        onChange={(e) => handleChange('contact', 'verificationPhone', e.target.value)}
                        className="bg-gray-50 border-2 border-gray-300 focus:border-green-500 transition-colors"
                      />
                      <Input
                        label="General Phone"
                        value={settings.contact.generalPhone}
                        onChange={(e) => handleChange('contact', 'generalPhone', e.target.value)}
                        className="bg-gray-50 border-2 border-gray-300 focus:border-green-500 transition-colors"
                      />
                    </div>
                    <Input
                      label="Email"
                      type="email"
                      value={settings.contact.email}
                      onChange={(e) => handleChange('contact', 'email', e.target.value)}
                      className="bg-gray-50 border-2 border-gray-300 focus:border-green-500 transition-colors"
                    />
                    <Input
                      label="Operating Hours"
                      value={settings.contact.operatingHours}
                      onChange={(e) => handleChange('contact', 'operatingHours', e.target.value)}
                      className="bg-gray-50 border-2 border-gray-300 focus:border-green-500 transition-colors"
                    />
                    <Input
                      label="Support Phone (CTA)"
                      value={settings.contact.supportPhone}
                      onChange={(e) => handleChange('contact', 'supportPhone', e.target.value)}
                      className="bg-gray-50 border-2 border-gray-300 focus:border-green-500 transition-colors"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'social' && (
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100/70 border-b border-purple-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Share2 className="text-white" size={24} />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">Social Media Links</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6 space-y-4">
                    <Input
                      label="Facebook URL"
                      value={settings.socialMedia.facebook}
                      onChange={(e) => handleChange('socialMedia', 'facebook', e.target.value)}
                      placeholder="https://facebook.com/hitech"
                      className="bg-gray-50 border-2 border-gray-300 focus:border-purple-500 transition-colors"
                    />
                    <Input
                      label="Twitter URL"
                      value={settings.socialMedia.twitter}
                      onChange={(e) => handleChange('socialMedia', 'twitter', e.target.value)}
                      placeholder="https://twitter.com/hitech"
                      className="bg-gray-50 border-2 border-gray-300 focus:border-purple-500 transition-colors"
                    />
                    <Input
                      label="LinkedIn URL"
                      value={settings.socialMedia.linkedin}
                      onChange={(e) => handleChange('socialMedia', 'linkedin', e.target.value)}
                      placeholder="https://linkedin.com/company/hitech"
                      className="bg-gray-50 border-2 border-gray-300 focus:border-purple-500 transition-colors"
                    />
                    <Input
                      label="Instagram URL"
                      value={settings.socialMedia.instagram}
                      onChange={(e) => handleChange('socialMedia', 'instagram', e.target.value)}
                      placeholder="https://instagram.com/hitech"
                      className="bg-gray-50 border-2 border-gray-300 focus:border-purple-500 transition-colors"
                    />
                    <Input
                      label="YouTube URL"
                      value={settings.socialMedia.youtube}
                      onChange={(e) => handleChange('socialMedia', 'youtube', e.target.value)}
                      placeholder="https://youtube.com/@hitech"
                      className="bg-gray-50 border-2 border-gray-300 focus:border-purple-500 transition-colors"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'footer' && (
              <div className="space-y-6">
                <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100/70 border-b border-orange-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Link className="text-white" size={24} />
                        </div>
                        <CardTitle className="text-2xl font-bold text-gray-900">Quick Links</CardTitle>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => addLink('quickLinks')}
                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                      >
                        <Plus size={16} className="mr-1" />
                        Add Link
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    {settings.footerLinks.quickLinks.map(link => (
                      <div key={link.id} className="flex gap-3 items-start">
                        <Input
                          placeholder="Name"
                          value={link.name}
                          onChange={(e) => updateLink('quickLinks', link.id, 'name', e.target.value)}
                          className="bg-gray-50 border-2 border-gray-300 focus:border-orange-500 transition-colors flex-1"
                        />
                        <Input
                          placeholder="URL"
                          value={link.url}
                          onChange={(e) => updateLink('quickLinks', link.id, 'url', e.target.value)}
                          className="bg-gray-50 border-2 border-gray-300 focus:border-orange-500 transition-colors flex-1"
                        />
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeLink('quickLinks', link.id)}
                          className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200 mt-1"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100/70 border-b border-orange-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                          <Link className="text-white" size={24} />
                        </div>
                        <CardTitle className="text-2xl font-bold text-gray-900">Support Links</CardTitle>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => addLink('supportLinks')}
                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                      >
                        <Plus size={16} className="mr-1" />
                        Add Link
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    {settings.footerLinks.supportLinks.map(link => (
                      <div key={link.id} className="flex gap-3 items-start">
                        <Input
                          placeholder="Name"
                          value={link.name}
                          onChange={(e) => updateLink('supportLinks', link.id, 'name', e.target.value)}
                          className="bg-gray-50 border-2 border-gray-300 focus:border-orange-500 transition-colors flex-1"
                        />
                        <Input
                          placeholder="URL"
                          value={link.url}
                          onChange={(e) => updateLink('supportLinks', link.id, 'url', e.target.value)}
                          className="bg-gray-50 border-2 border-gray-300 focus:border-orange-500 transition-colors flex-1"
                        />
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeLink('supportLinks', link.id)}
                          className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200 mt-1"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100/70 border-b border-orange-200">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Link className="text-white" size={24} />
                      </div>
                      <CardTitle className="text-2xl font-bold text-gray-900">Footer Legal</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 space-y-4">
                      <Input
                        label="Privacy Policy URL"
                        value={settings.footer.privacyPolicyUrl}
                        onChange={(e) => handleChange('footer', 'privacyPolicyUrl', e.target.value)}
                        className="bg-gray-50 border-2 border-gray-300 focus:border-orange-500 transition-colors"
                      />
                      <Input
                        label="Terms of Service URL"
                        value={settings.footer.termsOfServiceUrl}
                        onChange={(e) => handleChange('footer', 'termsOfServiceUrl', e.target.value)}
                        className="bg-gray-50 border-2 border-gray-300 focus:border-orange-500 transition-colors"
                      />
                      <Input
                        label="Accessibility URL"
                        value={settings.footer.accessibilityUrl}
                        onChange={(e) => handleChange('footer', 'accessibilityUrl', e.target.value)}
                        className="bg-gray-50 border-2 border-gray-300 focus:border-orange-500 transition-colors"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'trust' && (
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                <CardHeader className="bg-gradient-to-r from-red-50 to-red-100/70 border-b border-red-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                      <TrendingUp className="text-white" size={24} />
                    </div>
                    <CardTitle className="text-2xl font-bold text-gray-900">Trust Statistics</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        label="Students Count"
                        value={settings.trustStats.studentsCount}
                        onChange={(e) => handleChange('trustStats', 'studentsCount', e.target.value)}
                        className="bg-gray-50 border-2 border-gray-300 focus:border-red-500 transition-colors"
                      />
                      <Input
                        label="Success Rate"
                        value={settings.trustStats.successRate}
                        onChange={(e) => handleChange('trustStats', 'successRate', e.target.value)}
                        className="bg-gray-50 border-2 border-gray-300 focus:border-red-500 transition-colors"
                      />
                      <Input
                        label="Rating"
                        value={settings.trustStats.rating}
                        onChange={(e) => handleChange('trustStats', 'rating', e.target.value)}
                        className="bg-gray-50 border-2 border-gray-300 focus:border-red-500 transition-colors"
                      />
                      <Input
                        label="Expert Instructors"
                        value={settings.trustStats.expertInstructors}
                        onChange={(e) => handleChange('trustStats', 'expertInstructors', e.target.value)}
                        className="bg-gray-50 border-2 border-gray-300 focus:border-red-500 transition-colors"
                      />
                      <Input
                        label="Courses Available"
                        value={settings.trustStats.coursesAvailable}
                        onChange={(e) => handleChange('trustStats', 'coursesAvailable', e.target.value)}
                        className="bg-gray-50 border-2 border-gray-300 focus:border-red-500 transition-colors"
                      />
                      <Input
                        label="Job Placement Rate"
                        value={settings.trustStats.jobPlacementRate}
                        onChange={(e) => handleChange('trustStats', 'jobPlacementRate', e.target.value)}
                        className="bg-gray-50 border-2 border-gray-300 focus:border-red-500 transition-colors"
                      />
                      <Input
                        label="Alumni Network"
                        value={settings.trustStats.alumniNetwork}
                        onChange={(e) => handleChange('trustStats', 'alumniNetwork', e.target.value)}
                        className="bg-gray-50 border-2 border-gray-300 focus:border-red-500 transition-colors"
                      />
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