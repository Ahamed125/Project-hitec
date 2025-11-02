import React, { useState } from 'react';
import { Plus, Edit, Trash2, Award, User, BookOpen, Calendar, Hash, Camera } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { useAdmin } from '../context/AdminContext';
import { toast } from '../utils/toast';

export const Certificates = () => {
  const { certificates, setCertificates } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    registrationNumber: '',
    studentName: '',
    studentProfilePicture: '',
    courseName: '',
    duration: '',
    dateOfAward: ''
  });

  const handleAdd = () => {
    const newCert = { id: Date.now(), ...formData };
    setCertificates(prev => ({ ...prev, records: [...prev.records, newCert] }));
    toast.success('Certificate added!');
    setIsModalOpen(false);
    setFormData({ 
      registrationNumber: '', 
      studentName: '', 
      studentProfilePicture: '',
      courseName: '', 
      duration: '', 
      dateOfAward: '' 
    });
  };

  const handleDelete = (id) => {
    setCertificates(prev => ({ ...prev, records: prev.records.filter(c => c.id !== id) }));
    toast.success('Certificate deleted!');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, studentProfilePicture: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">
              Certificate Management
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Manage and issue student certificates</p>
          </div>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <Plus size={20} className="mr-2" />
            Add Certificate
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-blue-100/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Award className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{certificates.records.length}</p>
                  <p className="text-sm text-gray-600">Total Certificates</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-green-100/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <User className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(certificates.records.map(cert => cert.studentName)).size}
                  </p>
                  <p className="text-sm text-gray-600">Unique Students</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-purple-100/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <BookOpen className="text-purple-600" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(certificates.records.map(cert => cert.courseName)).size}
                  </p>
                  <p className="text-sm text-gray-600">Courses Covered</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-r from-orange-50 to-orange-100/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Calendar className="text-orange-600" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(certificates.records.map(cert => cert.dateOfAward)).size}
                  </p>
                  <p className="text-sm text-gray-600">Award Dates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certificates Table */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-b border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <Award className="text-blue-600" size={24} />
                  Issued Certificates
                </CardTitle>
                <p className="text-gray-600 mt-1">Manage all certificate records</p>
              </div>
              <span className="bg-white/80 text-blue-600 font-semibold px-4 py-2 rounded-full border border-blue-200">
                {certificates.records.length} certificates
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {certificates.records.length === 0 ? (
              <div className="text-center py-16">
                <Award size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Certificates Issued</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Start by issuing your first certificate to recognize student achievements and course completions.
                </p>
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <Plus size={20} className="mr-2" />
                  Issue First Certificate
                </Button>
              </div>
            ) : (
              <div className="overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
                      <th className="text-left py-4 px-6 font-bold text-gray-700 uppercase text-sm">Certificate Details</th>
                      <th className="text-left py-4 px-6 font-bold text-gray-700 uppercase text-sm">Student Information</th>
                      <th className="text-left py-4 px-6 font-bold text-gray-700 uppercase text-sm">Course Details</th>
                      <th className="text-left py-4 px-6 font-bold text-gray-700 uppercase text-sm">Award Date</th>
                      <th className="text-right py-4 px-6 font-bold text-gray-700 uppercase text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {certificates.records.map(cert => (
                      <tr 
                        key={cert.id} 
                        className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-200 group"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                              <Award className="text-white" size={20} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Hash size={16} className="text-gray-400" />
                                <span className="font-mono font-bold text-gray-900">{cert.registrationNumber}</span>
                              </div>
                              <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                                Duration: {cert.duration}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              {cert.studentProfilePicture ? (
                                <img 
                                  src={cert.studentProfilePicture} 
                                  alt={cert.studentName}
                                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-200 shadow-sm"
                                  onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/48';
                                  }}
                                />
                              ) : (
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center border-2 border-blue-200">
                                  <User size={20} className="text-blue-600" />
                                </div>
                              )}
                            </div>
                            <div>
                              <span className="font-semibold text-gray-900 block">{cert.studentName}</span>
                              <span className="text-sm text-gray-500">Student</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <BookOpen size={16} className="text-green-600" />
                            </div>
                            <span className="font-medium text-gray-900">{cert.courseName}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                              <Calendar size={16} className="text-orange-600" />
                            </div>
                            <div>
                              <span className="font-medium text-gray-900 block">{formatDate(cert.dateOfAward)}</span>
                              <span className="text-sm text-gray-500">{cert.dateOfAward}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2 justify-end">
                            <Button 
                              size="sm" 
                              variant="danger" 
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this certificate? This action cannot be undone.')) {
                                  handleDelete(cert.id);
                                }
                              }}
                              className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:shadow-md"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add Certificate Modal */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title={
            <div className="flex items-center gap-2">
              <Award size={24} className="text-blue-600" />
              Issue New Certificate
            </div>
          }
          size="md"
        >
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Hash size={18} className="text-blue-600" />
                Certificate Information
              </h3>
              <div className="space-y-4">
                <Input
                  label="Registration Number"
                  placeholder="e.g., M/HTC/FIC/825"
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                  className="bg-white border-2 border-gray-300 focus:border-blue-500"
                />
                <Input
                  label="Duration"
                  placeholder="e.g., 6 months"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="bg-white border-2 border-gray-300 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100/50 border-2 border-green-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <User size={18} className="text-green-600" />
                Student Details
              </h3>
              <div className="space-y-4">
                <Input
                  label="Student Name"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  placeholder="Enter full student name"
                  className="bg-white border-2 border-gray-300 focus:border-green-500"
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <Camera size={16} className="text-green-600" />
                    Student Profile Picture
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Image URL or upload file"
                        value={formData.studentProfilePicture}
                        onChange={(e) => setFormData({ ...formData, studentProfilePicture: e.target.value })}
                        className="bg-white border-2 border-gray-300 focus:border-green-500"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Button 
                        type="button" 
                        variant="outline"
                        className="bg-white text-green-600 hover:bg-green-50 border-green-200"
                      >
                        <Camera size={16} className="mr-2" />
                        Upload
                      </Button>
                    </div>
                  </div>
                  
                  {formData.studentProfilePicture && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                      <div className="flex items-center gap-3">
                        <img 
                          src={formData.studentProfilePicture} 
                          alt="Student preview" 
                          className="w-16 h-16 rounded-full object-cover border-2 border-green-200 shadow-sm"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/64';
                          }}
                        />
                        <div>
                          <p className="text-sm text-gray-600">Profile picture preview</p>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, studentProfilePicture: '' })}
                            className="text-xs text-red-600 hover:text-red-700 mt-1"
                          >
                            Remove image
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 border-2 border-purple-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen size={18} className="text-purple-600" />
                Course Information
              </h3>
              <Input
                label="Course Name"
                value={formData.courseName}
                onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                placeholder="Enter course name"
                className="bg-white border-2 border-gray-300 focus:border-purple-500"
              />
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 border-2 border-orange-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Calendar size={18} className="text-orange-600" />
                Award Date
              </h3>
              <Input
                label="Date of Award"
                type="date"
                value={formData.dateOfAward}
                onChange={(e) => setFormData({ ...formData, dateOfAward: e.target.value })}
                className="bg-white border-2 border-gray-300 focus:border-orange-500"
              />
            </div>

            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <Button 
                variant="secondary" 
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAdd}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg"
              >
                <Award size={18} className="mr-2" />
                Issue Certificate
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};