import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, BookOpen, Clock, Users, Star, Tag } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Textarea, Select } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { useAdmin } from '../context/AdminContext';
import { toast } from '../utils/toast';

export const Courses = () => {
  const { courses, setCourses } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Technology',
    level: 'Beginner',
    price: 0,
    originalPrice: 0,
    duration: 0,
    lessons: 0,
    enrolled: 0,
    rating: 5,
    reviews: 0,
    image: '',
    imageAlt: '',
    isNew: false,
    instructor: {
      name: '',
      title: '',
      avatar: '',
      avatarAlt: ''
    },
    outcomes: []
  });

  const handleAdd = () => {
    setEditingCourse(null);
    setFormData({
      title: '',
      description: '',
      category: 'Technology',
      level: 'Beginner',
      price: 0,
      originalPrice: 0,
      duration: 0,
      lessons: 0,
      enrolled: 0,
      rating: 5,
      reviews: 0,
      image: '',
      imageAlt: '',
      isNew: false,
      instructor: {
        name: '',
        title: '',
        avatar: '',
        avatarAlt: ''
      },
      outcomes: []
    });
    setIsModalOpen(true);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData(course);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingCourse) {
      setCourses(prev => prev.map(c => c.id === editingCourse.id ? { ...formData, id: c.id } : c));
      toast.success('Course updated successfully!');
    } else {
      setCourses(prev => [...prev, { ...formData, id: Date.now() }]);
      toast.success('Course added successfully!');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    toast.success('Course deleted successfully!');
  };

  const filteredCourses = courses.filter(course =>
    course.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Technology': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Business': return 'bg-green-100 text-green-800 border-green-200';
      case 'Arts': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Science': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">
              Courses Management
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Manage all courses with comprehensive CRUD operations</p>
          </div>
          <Button 
            onClick={handleAdd}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <Plus size={20} className="mr-2" />
            Add New Course
          </Button>
        </div>

        {/* Search and Stats Card */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-b border-blue-200">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    placeholder="Search courses by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-2 border-gray-300 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{filteredCourses.length}</div>
                  <div className="text-sm text-gray-600">Total Courses</div>
                </div>
                <div className="w-px h-8 bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {courses.filter(c => c.isNew).length}
                  </div>
                  <div className="text-sm text-gray-600">New Courses</div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {filteredCourses.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Courses Found</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  {searchTerm ? 'No courses match your search criteria.' : 'Get started by adding your first course to the platform.'}
                </p>
                <Button onClick={handleAdd} size="lg">
                  <Plus size={20} className="mr-2" />
                  Create Your First Course
                </Button>
              </div>
            ) : (
              <div className="overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200">
                      <th className="text-left py-4 px-6 font-bold text-gray-700 uppercase text-sm">Course Details</th>
                      <th className="text-left py-4 px-6 font-bold text-gray-700 uppercase text-sm">Category & Level</th>
                      <th className="text-left py-4 px-6 font-bold text-gray-700 uppercase text-sm">Pricing</th>
                      <th className="text-left py-4 px-6 font-bold text-gray-700 uppercase text-sm">Metrics</th>
                      <th className="text-right py-4 px-6 font-bold text-gray-700 uppercase text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredCourses.map(course => (
                      <tr 
                        key={course.id} 
                        className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-200 group"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-start gap-4">
                            {course.image && (
                              <img 
                                src={course.image} 
                                alt={course.imageAlt}
                                className="w-16 h-16 object-cover rounded-xl shadow-sm border border-gray-200 group-hover:shadow-md transition-shadow"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/64'; }}
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-gray-900 text-lg truncate">{course.title}</h3>
                                {course.isNew && (
                                  <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full border border-green-200">
                                    NEW
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-600 text-sm line-clamp-2 mb-2">{course.description}</p>
                              {course.instructor?.name && (
                                <div className="flex items-center gap-2">
                                  {course.instructor.avatar && (
                                    <img 
                                      src={course.instructor.avatar} 
                                      alt={course.instructor.avatarAlt}
                                      className="w-6 h-6 rounded-full border border-gray-200"
                                      onError={(e) => { e.target.src = 'https://via.placeholder.com/24'; }}
                                    />
                                  )}
                                  <span className="text-sm text-gray-700 font-medium">{course.instructor.name}</span>
                                  {course.instructor.title && (
                                    <span className="text-sm text-gray-500">• {course.instructor.title}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-2">
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(course.category)}`}>
                              <Tag size={12} />
                              {course.category}
                            </span>
                            <div>
                              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getLevelColor(course.level)}`}>
                                {course.level}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold text-gray-900">${course.price}</span>
                              {course.originalPrice > course.price && (
                                <span className="text-sm text-gray-500 line-through">${course.originalPrice}</span>
                              )}
                            </div>
                            {course.originalPrice > course.price && (
                              <span className="inline-block bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full">
                                Save ${course.originalPrice - course.price}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-1 text-gray-600">
                              <Clock size={14} className="text-blue-600" />
                              <span>{course.duration}h</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <BookOpen size={14} className="text-green-600" />
                              <span>{course.lessons} lessons</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <Users size={14} className="text-purple-600" />
                              <span>{course.enrolled}</span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-600">
                              <Star size={14} className="text-yellow-500" />
                              <span>{course.rating}</span>
                              <span className="text-gray-400">({course.reviews})</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2 justify-end">
                            <Button 
                              size="sm" 
                              variant="secondary" 
                              onClick={() => handleEdit(course)}
                              className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:shadow-md"
                            >
                              <Edit size={14} />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="danger" 
                              onClick={() => setDeleteId(course.id)}
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

        {/* Add/Edit Course Modal */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title={
            <div className="flex items-center gap-2">
              <BookOpen size={24} className="text-blue-600" />
              {editingCourse ? 'Edit Course' : 'Add New Course'}
            </div>
          } 
          size="xl"
        >
          <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
            {/* Course Basic Information */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen size={18} className="text-blue-600" />
                Course Basic Information
              </h3>
              <div className="space-y-4">
                <Input
                  label="Course Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Advanced Web Development"
                  className="bg-white border-2 border-gray-300 focus:border-blue-500"
                />
                <Textarea
                  label="Course Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe what students will learn in this course..."
                  rows={4}
                  className="bg-white border-2 border-gray-300 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Course Image */}
            <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 border-2 border-purple-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Tag size={18} className="text-purple-600" />
                Course Image
              </h3>
              <div className="space-y-3">
                <Input
                  label="Image URL"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/course-image.jpg"
                  className="bg-white border-2 border-gray-300 focus:border-purple-500"
                />
                <Input
                  label="Image Alt Text"
                  value={formData.imageAlt}
                  onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                  placeholder="Descriptive text for accessibility"
                  className="bg-white border-2 border-gray-300 focus:border-purple-500"
                />
                {formData.image && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                    <img 
                      src={formData.image} 
                      alt="Preview" 
                      className="w-full h-32 object-cover rounded-lg border-2 border-gray-300"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200'; }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Course Details Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <Select
                  label="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  options={[
                    { value: 'Technology', label: 'Technology' },
                    { value: 'Business', label: 'Business' },
                    { value: 'Arts', label: 'Arts' },
                    { value: 'Science', label: 'Science' },
                  ]}
                  className="bg-white border-2 border-gray-300 focus:border-blue-500"
                />
                <Select
                  label="Difficulty Level"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  options={[
                    { value: 'Beginner', label: 'Beginner' },
                    { value: 'Intermediate', label: 'Intermediate' },
                    { value: 'Advanced', label: 'Advanced' },
                  ]}
                  className="bg-white border-2 border-gray-300 focus:border-blue-500"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-3 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
                  <input
                    type="checkbox"
                    id="isNew"
                    checked={formData.isNew}
                    onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isNew" className="text-sm font-medium text-gray-700">
                    Mark as New Course (shows "New" badge)
                  </label>
                </div>
              </div>
            </div>

            {/* Pricing & Duration */}
            <div className="bg-gradient-to-r from-green-50 to-green-100/50 border-2 border-green-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Clock size={18} className="text-green-600" />
                Pricing & Duration
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <Input
                  label="Current Price ($)"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="bg-white border-2 border-gray-300 focus:border-green-500"
                />
                <Input
                  label="Original Price ($)"
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                  placeholder="For showing discounts"
                  className="bg-white border-2 border-gray-300 focus:border-green-500"
                />
                <Input
                  label="Duration (hours)"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                  className="bg-white border-2 border-gray-300 focus:border-green-500"
                />
              </div>
            </div>

            {/* Course Metrics */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 border-2 border-orange-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Users size={18} className="text-orange-600" />
                Course Metrics
              </h3>
              <div className="grid grid-cols-4 gap-4">
                <Input
                  label="Lessons Count"
                  type="number"
                  value={formData.lessons}
                  onChange={(e) => setFormData({ ...formData, lessons: Number(e.target.value) })}
                  className="bg-white border-2 border-gray-300 focus:border-orange-500"
                />
                <Input
                  label="Enrolled Students"
                  type="number"
                  value={formData.enrolled}
                  onChange={(e) => setFormData({ ...formData, enrolled: Number(e.target.value) })}
                  className="bg-white border-2 border-gray-300 focus:border-orange-500"
                />
                <Input
                  label="Rating (0-5)"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  className="bg-white border-2 border-gray-300 focus:border-orange-500"
                />
                <Input
                  label="Reviews Count"
                  type="number"
                  value={formData.reviews}
                  onChange={(e) => setFormData({ ...formData, reviews: Number(e.target.value) })}
                  className="bg-white border-2 border-gray-300 focus:border-orange-500"
                />
              </div>
            </div>

            {/* Instructor Details */}
            <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 border-2 border-purple-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Users size={18} className="text-purple-600" />
                Instructor Details
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Instructor Name"
                    value={formData.instructor.name}
                    onChange={(e) => setFormData({ ...formData, instructor: { ...formData.instructor, name: e.target.value } })}
                    placeholder="e.g., John Doe"
                    className="bg-white border-2 border-gray-300 focus:border-purple-500"
                  />
                  <Input
                    label="Instructor Title"
                    value={formData.instructor.title}
                    onChange={(e) => setFormData({ ...formData, instructor: { ...formData.instructor, title: e.target.value } })}
                    placeholder="e.g., Senior Software Engineer"
                    className="bg-white border-2 border-gray-300 focus:border-purple-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Instructor Avatar URL"
                    value={formData.instructor.avatar}
                    onChange={(e) => setFormData({ ...formData, instructor: { ...formData.instructor, avatar: e.target.value } })}
                    placeholder="https://example.com/avatar.jpg"
                    className="bg-white border-2 border-gray-300 focus:border-purple-500"
                  />
                  <Input
                    label="Avatar Alt Text"
                    value={formData.instructor.avatarAlt}
                    onChange={(e) => setFormData({ ...formData, instructor: { ...formData.instructor, avatarAlt: e.target.value } })}
                    placeholder="Description of instructor"
                    className="bg-white border-2 border-gray-300 focus:border-purple-500"
                  />
                </div>
                {formData.instructor.avatar && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700 mb-2">Avatar Preview:</p>
                    <img 
                      src={formData.instructor.avatar} 
                      alt="Avatar Preview" 
                      className="w-16 h-16 object-cover rounded-full border-2 border-gray-300"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/64'; }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Learning Outcomes */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Star size={18} className="text-blue-600" />
                Learning Outcomes
              </h3>
              <div className="space-y-3">
                {formData.outcomes.map((outcome, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <div className="flex-1">
                      <Input
                        value={outcome}
                        onChange={(e) => {
                          const newOutcomes = [...formData.outcomes];
                          newOutcomes[index] = e.target.value;
                          setFormData({ ...formData, outcomes: newOutcomes });
                        }}
                        placeholder="What will students learn from this course?"
                        className="bg-white border-2 border-gray-300 focus:border-blue-500"
                      />
                    </div>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        const newOutcomes = formData.outcomes.filter((_, i) => i !== index);
                        setFormData({ ...formData, outcomes: newOutcomes });
                      }}
                      className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200 mt-1"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFormData({ ...formData, outcomes: [...formData.outcomes, ''] })}
                  className="bg-white text-blue-600 hover:bg-blue-50 border-blue-200"
                >
                  + Add Learning Outcome
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <Button 
                variant="secondary" 
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg"
              >
                {editingCourse ? 'Update Course' : 'Create Course'}
              </Button>
            </div>
          </div>
        </Modal>

        {/* Delete Confirmation Dialog */}
        <ConfirmDialog
          isOpen={deleteId !== null}
          onClose={() => setDeleteId(null)}
          onConfirm={() => { handleDelete(deleteId); setDeleteId(null); }}
          title="Delete Course"
          message="Are you sure you want to delete this course? This action cannot be undone and all course data will be permanently removed."
          confirmText="Delete Course"
          cancelText="Keep Course"
        />
      </div>
    </div>
  );
};