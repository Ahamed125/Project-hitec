import React, { useState } from 'react';
import { Plus, Edit, Trash2, HelpCircle, FolderOpen, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input, Textarea } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { useAdmin } from '../context/AdminContext';
import { toast } from '../utils/toast';

export const FAQ = () => {
  const { faqs, setFaqs } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [catFormData, setCatFormData] = useState({ title: '', order: 1 });
  const [faqFormData, setFaqFormData] = useState({ question: '', answer: '', order: 1 });
  const [expandedCategories, setExpandedCategories] = useState(new Set());

  const toggleCategory = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleAddCategory = () => {
    if (!catFormData.title.trim()) {
      toast.error('Please enter a category title');
      return;
    }
    const newCat = { id: Date.now(), ...catFormData, items: [] };
    setFaqs(prev => ({ ...prev, categories: [...prev.categories, newCat] }));
    toast.success('Category added successfully!');
    setIsCatModalOpen(false);
    setCatFormData({ title: '', order: 1 });
  };

  const handleAddFAQ = () => {
    if (!selectedCategory) return;
    if (!faqFormData.question.trim() || !faqFormData.answer.trim()) {
      toast.error('Please fill in both question and answer');
      return;
    }
    const newFAQ = { id: Date.now(), ...faqFormData };
    setFaqs(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === selectedCategory.id
          ? { ...cat, items: [...cat.items, newFAQ] }
          : cat
      )
    }));
    toast.success('FAQ added successfully!');
    setIsModalOpen(false);
    setFaqFormData({ question: '', answer: '', order: 1 });
  };

  const handleDeleteCategory = (id) => {
    if (confirm('Are you sure you want to delete this category? All FAQs within it will also be deleted.')) {
      setFaqs(prev => ({ ...prev, categories: prev.categories.filter(c => c.id !== id) }));
      toast.success('Category deleted successfully!');
    }
  };

  const handleDeleteFAQ = (catId, faqId) => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      setFaqs(prev => ({
        ...prev,
        categories: prev.categories.map(cat =>
          cat.id === catId
            ? { ...cat, items: cat.items.filter(f => f.id !== faqId) }
            : cat
        )
      }));
      toast.success('FAQ deleted successfully!');
    }
  };

  const getCategoryColor = (index) => {
    const colors = [
      'bg-gradient-to-r from-blue-50 to-blue-100/50 border-blue-200',
      'bg-gradient-to-r from-green-50 to-green-100/50 border-green-200',
      'bg-gradient-to-r from-purple-50 to-purple-100/50 border-purple-200',
      'bg-gradient-to-r from-orange-50 to-orange-100/50 border-orange-200',
      'bg-gradient-to-r from-pink-50 to-pink-100/50 border-pink-200'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">
              FAQ Management
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Manage frequently asked questions and categories</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={() => setIsCatModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Plus size={20} className="mr-2" />
              Add Category
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-blue-100/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FolderOpen className="text-blue-600" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{faqs.categories.length}</p>
                  <p className="text-sm text-gray-600">Total Categories</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-green-100/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <HelpCircle className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {faqs.categories.reduce((total, cat) => total + (cat.items?.length || 0), 0)}
                  </p>
                  <p className="text-sm text-gray-600">Total FAQs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-purple-100/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Edit className="text-purple-600" size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {faqs.categories.filter(cat => cat.items?.length === 0).length}
                  </p>
                  <p className="text-sm text-gray-600">Empty Categories</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories and FAQs */}
        {faqs.categories.length === 0 ? (
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="text-center py-16">
              <HelpCircle size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No FAQ Categories Yet</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Get started by creating your first FAQ category to organize your frequently asked questions.
              </p>
              <Button 
                onClick={() => setIsCatModalOpen(true)}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Plus size={20} className="mr-2" />
                Create First Category
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {faqs.categories.map((category, index) => (
              <Card key={category.id} className={`border-0 shadow-lg ${getCategoryColor(index)} backdrop-blur-sm`}>
                <CardHeader className="border-b border-gray-200/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className="flex items-center gap-3 hover:bg-white/50 p-2 rounded-lg transition-colors"
                      >
                        {expandedCategories.has(category.id) ? (
                          <ChevronUp className="text-gray-600" size={20} />
                        ) : (
                          <ChevronDown className="text-gray-600" size={20} />
                        )}
                        <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          <FolderOpen size={20} className="text-current" />
                          {category.title}
                        </CardTitle>
                      </button>
                      <span className="bg-white/80 text-gray-600 text-sm font-medium px-3 py-1 rounded-full border border-gray-200">
                        {category.items?.length || 0} FAQs
                      </span>
                      <span className="bg-white/80 text-gray-600 text-sm font-medium px-3 py-1 rounded-full border border-gray-200">
                        Order: {category.order}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => { setSelectedCategory(category); setIsModalOpen(true); }}
                        className="bg-white text-blue-600 hover:bg-blue-50 border-blue-200 shadow-sm hover:shadow-md transition-all"
                      >
                        <Plus size={16} className="mr-1" />
                        Add FAQ
                      </Button>
                      <Button 
                        size="sm" 
                        variant="danger" 
                        onClick={() => handleDeleteCategory(category.id)}
                        className="bg-white text-red-600 hover:bg-red-50 border-red-200 shadow-sm hover:shadow-md transition-all"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                {expandedCategories.has(category.id) && (
                  <CardContent className="p-6">
                    {category.items?.length === 0 ? (
                      <div className="text-center py-8 bg-white/50 rounded-xl border-2 border-dashed border-gray-300">
                        <HelpCircle size={48} className="mx-auto text-gray-400 mb-3" />
                        <p className="text-gray-600 font-medium mb-4">No FAQs in this category yet</p>
                        <Button 
                          onClick={() => { setSelectedCategory(category); setIsModalOpen(true); }}
                          variant="outline"
                          className="border-blue-200 text-blue-600 hover:bg-blue-50"
                        >
                          <Plus size={16} className="mr-2" />
                          Add First FAQ
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {category.items?.map((faq, faqIndex) => (
                          <div 
                            key={faq.id} 
                            className="group bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-start gap-3 mb-3">
                                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                    <HelpCircle className="text-blue-600" size={16} />
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="font-bold text-lg text-gray-900 mb-2">{faq.question}</h4>
                                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                                      <span className="bg-gray-100 px-2 py-1 rounded-full">
                                        Order: {faq.order}
                                      </span>
                                      <span className="bg-gray-100 px-2 py-1 rounded-full">
                                        FAQ #{faqIndex + 1}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <Button 
                                size="sm" 
                                variant="danger" 
                                onClick={() => handleDeleteFAQ(category.id, faq.id)}
                                className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:shadow-md ml-4"
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Add Category Modal */}
        <Modal 
          isOpen={isCatModalOpen} 
          onClose={() => setIsCatModalOpen(false)} 
          title={
            <div className="flex items-center gap-2">
              <FolderOpen size={24} className="text-blue-600" />
              Add New Category
            </div>
          }
          size="md"
        >
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Category Information</h3>
              <div className="space-y-4">
                <Input
                  label="Category Title"
                  value={catFormData.title}
                  onChange={(e) => setCatFormData({...catFormData, title: e.target.value})}
                  placeholder="e.g., General Questions, Technical Support"
                  className="bg-white border-2 border-gray-300 focus:border-blue-500"
                />
                <Input
                  label="Display Order"
                  type="number"
                  value={catFormData.order}
                  onChange={(e) => setCatFormData({...catFormData, order: Number(e.target.value)})}
                  placeholder="1"
                  min="1"
                  className="bg-white border-2 border-gray-300 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
              <Button 
                variant="secondary" 
                onClick={() => setIsCatModalOpen(false)}
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddCategory}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg"
              >
                <Plus size={18} className="mr-2" />
                Create Category
              </Button>
            </div>
          </div>
        </Modal>

        {/* Add FAQ Modal */}
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title={
            <div className="flex items-center gap-2">
              <HelpCircle size={24} className="text-green-600" />
              Add New FAQ
              {selectedCategory && (
                <span className="text-sm text-gray-600 font-normal ml-2">
                  to {selectedCategory.title}
                </span>
              )}
            </div>
          }
          size="lg"
        >
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-green-100/50 border-2 border-green-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">FAQ Content</h3>
              <div className="space-y-4">
                <Input
                  label="Question"
                  value={faqFormData.question}
                  onChange={(e) => setFaqFormData({...faqFormData, question: e.target.value})}
                  placeholder="What is your return policy?"
                  className="bg-white border-2 border-gray-300 focus:border-green-500"
                />
                <Textarea
                  label="Answer"
                  value={faqFormData.answer}
                  onChange={(e) => setFaqFormData({...faqFormData, answer: e.target.value})}
                  placeholder="Our return policy allows returns within 30 days of purchase..."
                  rows={4}
                  className="bg-white border-2 border-gray-300 focus:border-green-500"
                />
                <Input
                  label="Display Order"
                  type="number"
                  value={faqFormData.order}
                  onChange={(e) => setFaqFormData({...faqFormData, order: Number(e.target.value)})}
                  placeholder="1"
                  min="1"
                  className="bg-white border-2 border-gray-300 focus:border-green-500"
                />
              </div>
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
                onClick={handleAddFAQ}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg"
              >
                <Plus size={18} className="mr-2" />
                Add FAQ
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};