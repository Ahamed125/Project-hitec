import React, { useState } from 'react';
import { Save, Plus, Trash2, Edit, Phone, Mail, MapPin, Clock, Globe, Users, Building } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { useAdmin } from '../context/AdminContext';
import { toast } from '../utils/toast';

export const Contact = () => {
  const { contact, setContact } = useAdmin();
  const [activeTab, setActiveTab] = useState('methods');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const tabs = [
    { id: 'methods', label: 'Contact Methods', icon: Phone, color: 'text-blue-600' },
    { id: 'social', label: 'Social Channels', icon: Globe, color: 'text-purple-600' },
    { id: 'locations', label: 'Campus Locations', icon: MapPin, color: 'text-green-600' },
  ];

  const handleSave = () => {
    toast.success('Contact settings saved successfully!');
  };

  // Contact Methods handlers
  const updateMethod = (id, field, value) => {
    setContact(prev => ({
      ...prev,
      methods: prev.methods.map(m => m.id === id ? { ...m, [field]: value } : m)
    }));
  };

  // Social Channels handlers
  const updateSocial = (id, field, value) => {
    setContact(prev => ({
      ...prev,
      socialChannels: prev.socialChannels.map(s => s.id === id ? { ...s, [field]: value } : s)
    }));
  };

  // Campus Location handlers
  const addLocation = () => {
    const newLocation = {
      id: Date.now(),
      name: '',
      address: '',
      phone: '',
      email: '',
      hours: { weekdays: '', saturday: '', sunday: '' },
      services: [],
      mapEmbedUrl: '',
      isPrimary: false
    };
    setContact(prev => ({
      ...prev,
      campusLocations: [...prev.campusLocations, newLocation]
    }));
    toast.success('Location added successfully!');
  };

  const deleteLocation = (id) => {
    if (confirm('Are you sure you want to delete this campus location?')) {
      setContact(prev => ({
        ...prev,
        campusLocations: prev.campusLocations.filter(l => l.id !== id)
      }));
      toast.success('Location deleted successfully!');
    }
  };

  const updateLocation = (id, field, value) => {
    setContact(prev => ({
      ...prev,
      campusLocations: prev.campusLocations.map(l =>
        l.id === id ? { ...l, [field]: value } : l
      )
    }));
  };

  const updateLocationHours = (id, period, value) => {
    setContact(prev => ({
      ...prev,
      campusLocations: prev.campusLocations.map(l =>
        l.id === id ? { ...l, hours: { ...l.hours, [period]: value } } : l
      )
    }));
  };

  const addService = (locationId) => {
    const service = prompt('Enter service name:');
    if (service) {
      setContact(prev => ({
        ...prev,
        campusLocations: prev.campusLocations.map(l =>
          l.id === locationId ? { ...l, services: [...l.services, service] } : l
        )
      }));
      toast.success('Service added!');
    }
  };

  const removeService = (locationId, serviceIndex) => {
    setContact(prev => ({
      ...prev,
      campusLocations: prev.campusLocations.map(l =>
        l.id === locationId
          ? { ...l, services: l.services.filter((_, i) => i !== serviceIndex) }
          : l
      )
    }));
    toast.success('Service removed!');
  };

  const getTabColor = (tabId) => {
    switch (tabId) {
      case 'methods': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'social': return 'bg-purple-50 border-purple-200 text-purple-700';
      case 'locations': return 'bg-green-50 border-green-200 text-green-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const getMethodIcon = (methodType) => {
    switch (methodType) {
      case 'phone': return Phone;
      case 'email': return Mail;
      case 'visit': return MapPin;
      default: return Phone;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">
              Contact Management
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Manage contact methods, social media, and campus locations</p>
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
                        {tab.id === 'methods' && 'Phone, email, and visit'}
                        {tab.id === 'social' && 'Social media channels'}
                        {tab.id === 'locations' && 'Campus locations & hours'}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Contact Methods Tab */}
            {activeTab === 'methods' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <Phone className="text-blue-600" size={24} />
                    Contact Methods
                  </h2>
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {contact.methods.length} methods
                  </span>
                </div>
                
                {contact.methods.map(method => {
                  const MethodIcon = getMethodIcon(method.type);
                  return (
                    <Card key={method.id} className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-b border-blue-200">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                            <MethodIcon className="text-blue-600" size={24} />
                          </div>
                          <CardTitle className="text-xl font-bold text-gray-900">{method.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="p-6 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <Input
                              label="Title"
                              value={method.title}
                              onChange={(e) => updateMethod(method.id, 'title', e.target.value)}
                              placeholder="Contact Method Title"
                              className="bg-white border-2 border-gray-300 focus:border-blue-500"
                            />
                            <Textarea
                              label="Description"
                              value={method.description}
                              onChange={(e) => updateMethod(method.id, 'description', e.target.value)}
                              placeholder="Describe this contact method..."
                              rows={3}
                              className="bg-white border-2 border-gray-300 focus:border-blue-500"
                            />
                            <Input
                              label="Hours"
                              value={method.hours}
                              onChange={(e) => updateMethod(method.id, 'hours', e.target.value)}
                              placeholder="e.g., Monday - Friday: 9 AM - 5 PM"
                              className="bg-white border-2 border-gray-300 focus:border-blue-500"
                            />
                          </div>
                          <div className="space-y-4">
                            <Input
                              label="Primary Contact"
                              value={method.primary}
                              onChange={(e) => updateMethod(method.id, 'primary', e.target.value)}
                              placeholder="Main contact information"
                              className="bg-white border-2 border-gray-300 focus:border-blue-500"
                            />
                            {method.secondary !== undefined && (
                              <Input
                                label="Secondary Contact"
                                value={method.secondary}
                                onChange={(e) => updateMethod(method.id, 'secondary', e.target.value)}
                                placeholder="Backup contact information"
                                className="bg-white border-2 border-gray-300 focus:border-blue-500"
                              />
                            )}
                            <Input
                              label="Action Button Text"
                              value={method.action}
                              onChange={(e) => updateMethod(method.id, 'action', e.target.value)}
                              placeholder="e.g., Call Now, Send Email"
                              className="bg-white border-2 border-gray-300 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Social Channels Tab */}
            {activeTab === 'social' && (
              <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100/50 border-b border-purple-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Globe className="text-purple-600" size={24} />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold text-gray-900">Social Media Channels</CardTitle>
                        <p className="text-gray-600 mt-1">Manage your social media presence</p>
                      </div>
                    </div>
                    <span className="bg-purple-100 text-purple-800 font-semibold px-4 py-2 rounded-full">
                      {contact.socialChannels.length} channels
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {contact.socialChannels.map(social => (
                      <div key={social.id} className="group bg-gradient-to-br from-purple-50 to-purple-100/50 border-2 border-purple-200 rounded-xl p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                            <Globe className="text-purple-600" size={18} />
                          </div>
                          <h4 className="font-bold text-lg text-gray-900">{social.name}</h4>
                        </div>
                        <div className="space-y-3">
                          <Input
                            label="Handle"
                            value={social.handle}
                            onChange={(e) => updateSocial(social.id, 'handle', e.target.value)}
                            placeholder="@username"
                            className="bg-white border-2 border-gray-300 focus:border-purple-500"
                          />
                          <Input
                            label="Profile URL"
                            value={social.url}
                            onChange={(e) => updateSocial(social.id, 'url', e.target.value)}
                            placeholder="https://..."
                            className="bg-white border-2 border-gray-300 focus:border-purple-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Campus Locations Tab */}
            {activeTab === 'locations' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <MapPin className="text-green-600" size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Campus Locations</h2>
                      <p className="text-gray-600">Manage multiple campus locations and their details</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="bg-green-100 text-green-800 font-semibold px-4 py-2 rounded-full">
                      {contact.campusLocations.length} locations
                    </span>
                    <Button 
                      onClick={addLocation}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                    >
                      <Plus size={20} className="mr-2" />
                      Add Location
                    </Button>
                  </div>
                </div>

                {contact.campusLocations.length === 0 ? (
                  <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                    <CardContent className="text-center py-16">
                      <Building size={64} className="mx-auto text-gray-400 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Campus Locations</h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Add your first campus location to provide students with contact information and visiting details.
                      </p>
                      <Button onClick={addLocation} size="lg">
                        <Plus size={20} className="mr-2" />
                        Add First Location
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {contact.campusLocations.map(location => (
                      <Card key={location.id} className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                        <CardHeader className="bg-gradient-to-r from-green-50 to-green-100/50 border-b border-green-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <Building className="text-green-600" size={24} />
                              </div>
                              <div>
                                <CardTitle className="text-xl font-bold text-gray-900">
                                  {location.name || 'New Location'}
                                </CardTitle>
                                {location.isPrimary && (
                                  <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full">
                                    PRIMARY CAMPUS
                                  </span>
                                )}
                              </div>
                            </div>
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => deleteLocation(location.id)}
                              className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="space-y-6">
                              <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                  <Building size={18} className="text-blue-600" />
                                  Basic Information
                                </h4>
                                <div className="space-y-4">
                                  <Input
                                    label="Campus Name"
                                    value={location.name}
                                    onChange={(e) => updateLocation(location.id, 'name', e.target.value)}
                                    placeholder="Main Campus, Downtown Campus, etc."
                                    className="bg-gray-50 border-2 border-gray-300 focus:border-blue-500"
                                  />
                                  <Textarea
                                    label="Address"
                                    value={location.address}
                                    onChange={(e) => updateLocation(location.id, 'address', e.target.value)}
                                    rows={3}
                                    placeholder="Full campus address"
                                    className="bg-gray-50 border-2 border-gray-300 focus:border-blue-500"
                                  />
                                </div>
                              </div>

                              <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                  <Clock size={18} className="text-orange-600" />
                                  Operating Hours
                                </h4>
                                <div className="space-y-3">
                                  <Input
                                    label="Weekdays"
                                    value={location.hours.weekdays}
                                    onChange={(e) => updateLocationHours(location.id, 'weekdays', e.target.value)}
                                    placeholder="Monday - Friday: 9.00 A.M to 5.00 P.M"
                                    className="bg-gray-50 border-2 border-gray-300 focus:border-orange-500"
                                  />
                                  <Input
                                    label="Saturday"
                                    value={location.hours.saturday}
                                    onChange={(e) => updateLocationHours(location.id, 'saturday', e.target.value)}
                                    placeholder="Saturday: 9.00 A.M to 1.00 P.M"
                                    className="bg-gray-50 border-2 border-gray-300 focus:border-orange-500"
                                  />
                                  <Input
                                    label="Sunday"
                                    value={location.hours.sunday}
                                    onChange={(e) => updateLocationHours(location.id, 'sunday', e.target.value)}
                                    placeholder="Sunday: Closed"
                                    className="bg-gray-50 border-2 border-gray-300 focus:border-orange-500"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="space-y-6">
                              <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                  <Phone size={18} className="text-green-600" />
                                  Contact Details
                                </h4>
                                <div className="space-y-4">
                                  <Input
                                    label="Phone Number"
                                    value={location.phone}
                                    onChange={(e) => updateLocation(location.id, 'phone', e.target.value)}
                                    placeholder="+1 (555) 123-4567"
                                    className="bg-gray-50 border-2 border-gray-300 focus:border-green-500"
                                  />
                                  <Input
                                    label="Email Address"
                                    value={location.email}
                                    onChange={(e) => updateLocation(location.id, 'email', e.target.value)}
                                    placeholder="campus@college.edu"
                                    className="bg-gray-50 border-2 border-gray-300 focus:border-green-500"
                                  />
                                </div>
                              </div>

                              <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                  <Users size={18} className="text-purple-600" />
                                  Services & Facilities
                                </h4>
                                <div className="space-y-3">
                                  <div className="flex flex-wrap gap-2 mb-3">
                                    {location.services.map((service, index) => (
                                      <span
                                        key={index}
                                        className="inline-flex items-center gap-2 px-3 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-200"
                                      >
                                        {service}
                                        <button
                                          onClick={() => removeService(location.id, index)}
                                          className="hover:text-purple-900 text-purple-600"
                                        >
                                          ×
                                        </button>
                                      </span>
                                    ))}
                                  </div>
                                  <Button 
                                    size="sm" 
                                    onClick={() => addService(location.id)}
                                    className="bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200"
                                  >
                                    <Plus size={16} className="mr-1" />
                                    Add Service
                                  </Button>
                                </div>
                              </div>

                              <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                                <Textarea
                                  label="Google Maps Embed URL"
                                  value={location.mapEmbedUrl}
                                  onChange={(e) => updateLocation(location.id, 'mapEmbedUrl', e.target.value)}
                                  rows={2}
                                  placeholder="https://www.google.com/maps/embed?pb=..."
                                  className="bg-gray-50 border-2 border-gray-300 focus:border-blue-500"
                                />
                              </div>

                              <div className="flex items-center gap-2 p-3 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                                <input
                                  type="checkbox"
                                  id={`primary-${location.id}`}
                                  checked={location.isPrimary}
                                  onChange={(e) => updateLocation(location.id, 'isPrimary', e.target.checked)}
                                  className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                                />
                                <label htmlFor={`primary-${location.id}`} className="text-sm font-medium text-gray-700">
                                  Mark as Primary Campus Location
                                </label>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};