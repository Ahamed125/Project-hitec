import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    inquiryType: '',
    program: '',
    message: '',
    newsletter: false,
    terms: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inquiryTypes = [
    { value: 'admission', label: 'Admission Information' },
    { value: 'program', label: 'Program Details' },
    { value: 'financial', label: 'Financial Aid & Scholarships' },
    { value: 'transfer', label: 'Transfer Credits' },
    { value: 'international', label: 'International Students' },
    { value: 'corporate', label: 'Corporate Training' },
    { value: 'support', label: 'Student Support Services' },
    { value: 'other', label: 'Other Inquiry' }
  ];

  const programs = [
    { value: 'business', label: 'Business Administration' },
    { value: 'technology', label: 'Information Technology' },
    { value: 'healthcare', label: 'Healthcare Management' },
    { value: 'education', label: 'Education & Teaching' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'arts', label: 'Liberal Arts' },
    { value: 'science', label: 'Applied Sciences' },
    { value: 'undecided', label: 'Undecided / Exploring Options' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) newErrors.firstName = 'First name is required';
    if (!formData?.lastName?.trim()) newErrors.lastName = 'Last name is required';
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData?.phone?.trim()) newErrors.phone = 'Phone number is required';
    if (!formData?.inquiryType) newErrors.inquiryType = 'Please select an inquiry type';
    if (!formData?.message?.trim()) newErrors.message = 'Message is required';
    if (!formData?.terms) newErrors.terms = 'You must agree to the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Thank you for your inquiry! We will contact you within 24 hours.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        inquiryType: '',
        program: '',
        message: '',
        newsletter: false,
        terms: false
      });
    } catch (error) {
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 text-primary mb-4">
            <Icon name="FileText" size={20} />
            <span className="text-sm font-medium uppercase tracking-wider">Get Started</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Send Us Your Inquiry
          </h2>
          <p className="text-xl text-muted-foreground">
            Fill out the form below and our admissions team will get back to you within 24 hours.
          </p>
        </div>

        {/* Contact Form */}
        <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                type="text"
                name="firstName"
                value={formData?.firstName}
                onChange={handleInputChange}
                error={errors?.firstName}
                placeholder="Enter your first name"
                required
              />
              <Input
                label="Last Name"
                type="text"
                name="lastName"
                value={formData?.lastName}
                onChange={handleInputChange}
                error={errors?.lastName}
                placeholder="Enter your last name"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData?.email}
                onChange={handleInputChange}
                error={errors?.email}
                placeholder="your.email@example.com"
                required
              />
              <Input
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData?.phone}
                onChange={handleInputChange}
                error={errors?.phone}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>

            {/* Inquiry Details */}
            <div className="grid md:grid-cols-2 gap-6">
              <Select
                label="Inquiry Type"
                options={inquiryTypes}
                value={formData?.inquiryType}
                onChange={(value) => setFormData(prev => ({ ...prev, inquiryType: value }))}
                error={errors?.inquiryType}
                placeholder="Select inquiry type"
                required
              />
              <Select
                label="Program of Interest"
                options={programs}
                value={formData?.program}
                onChange={(value) => setFormData(prev => ({ ...prev, program: value }))}
                placeholder="Select a program (optional)"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={formData?.message}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Please provide details about your inquiry, including any specific questions or requirements..."
              />
              {errors?.message && (
                <p className="mt-1 text-sm text-red-600">{errors?.message}</p>
              )}
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <Checkbox
                label="Subscribe to our newsletter for updates and educational resources"
                checked={formData?.newsletter}
                onChange={(e) => setFormData(prev => ({ ...prev, newsletter: e?.target?.checked }))}
              />
              <Checkbox
                label="I agree to the Terms of Service and Privacy Policy"
                checked={formData?.terms}
                onChange={(e) => setFormData(prev => ({ ...prev, terms: e?.target?.checked }))}
                error={errors?.terms}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                variant="default"
                size="lg"
                fullWidth
                loading={isSubmitting}
                disabled={isSubmitting}
                className="bg-gradient-primary hover:shadow-lg"
              >
                <Icon name="Send" size={20} className="mr-2" />
                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
              </Button>
            </div>
          </form>

          {/* Form Footer */}
          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              <Icon name="Shield" size={16} className="inline mr-1" />
              Your information is secure and will never be shared with third parties.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;