import React from 'react';
import { Users, BookOpen, TrendingUp, Award, Plus, ArrowUpRight, ChevronRight } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const statsData = [
  { name: 'Jan', students: 4000, courses: 100 },
  { name: 'Feb', students: 4500, courses: 110 },
  { name: 'Mar', students: 5200, courses: 125 },
  { name: 'Apr', students: 6000, courses: 140 },
  { name: 'May', students: 7100, courses: 155 },
  { name: 'Jun', students: 8000, courses: 170 },
];

const courseDistribution = [
  { name: 'Technology', value: 400 },
  { name: 'Business', value: 300 },
  { name: 'Arts', value: 200 },
  { name: 'Science', value: 100 },
];

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444'];

export const Dashboard = () => {
  const navigate = useNavigate();
  const { courses, settings, faqs, certificates } = useAdmin();

  const stats = [
    { 
      title: 'Total Students', 
      value: settings.trustStats.studentsCount, 
      icon: Users, 
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      trend: '+12%',
      description: 'Enrolled students'
    },
    { 
      title: 'Active Courses', 
      value: courses.length || settings.trustStats.coursesAvailable, 
      icon: BookOpen, 
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      trend: '+5%',
      description: 'Available courses'
    },
    { 
      title: 'Expert Instructors', 
      value: settings.trustStats.expertInstructors, 
      icon: Award, 
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      trend: '+8%',
      description: 'Teaching staff'
    },
    { 
      title: 'Success Rate', 
      value: settings.trustStats.successRate, 
      icon: TrendingUp, 
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      trend: '+2%',
      description: 'Completion rate'
    },
  ];

  const quickActions = [
    { label: 'Add Course', path: '/courses', icon: BookOpen, color: 'text-blue-600 bg-blue-50 hover:bg-blue-100' },
    { label: 'Add FAQ', path: '/faq', icon: Plus, color: 'text-green-600 bg-green-50 hover:bg-green-100' },
    { label: 'Manage Homepage', path: '/homepage', icon: Plus, color: 'text-purple-600 bg-purple-50 hover:bg-purple-100' },
    { label: 'View Certificates', path: '/certificates', icon: Award, color: 'text-orange-600 bg-orange-50 hover:bg-orange-100' },
  ];

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">System Active</span>
        </div>
      </div>

      {/* Stats Grid - Enhanced Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                  <div className="flex items-center">
                    <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full flex items-center">
                      <ArrowUpRight size={14} className="mr-1" />
                      {stat.trend}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">{stat.description}</span>
                  </div>
                </div>
                <div className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="text-white" size={28} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Student & Course Growth Chart */}
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-4 border-b border-gray-100">
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
              <TrendingUp size={20} className="mr-2 text-blue-600" />
              Student & Course Growth
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: 'none', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="students" 
                  fill="#0ea5e9" 
                  name="Students" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="courses" 
                  fill="#10b981" 
                  name="Courses" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Course Distribution Chart */}
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="pb-4 border-b border-gray-100">
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
              <BookOpen size={20} className="mr-2 text-green-600" />
              Course Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={courseDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {courseDistribution.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: 'none', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <Card className="lg:col-span-1 border-0 shadow-md">
          <CardHeader className="pb-4 border-b border-gray-100">
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
              <Plus size={20} className="mr-2 text-purple-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => navigate(action.path)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:shadow-md border border-gray-200 ${action.color}`}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm mr-3">
                      <action.icon size={18} />
                    </div>
                    <span className="font-medium">{action.label}</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-400" />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2 border-0 shadow-md">
          <CardHeader className="pb-4 border-b border-gray-100">
            <CardTitle className="text-xl font-semibold text-gray-900 flex items-center">
              <TrendingUp size={20} className="mr-2 text-orange-600" />
              Recent Content Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-25 border border-blue-100">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <BookOpen className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Courses Management</p>
                    <p className="text-sm text-gray-600">{courses.length} active courses available for students</p>
                  </div>
                </div>
                <Button 
                  onClick={() => navigate('/courses')}
                  className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                >
                  Manage
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-25 border border-green-100">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <Plus className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">FAQ Sections</p>
                    <p className="text-sm text-gray-600">{faqs.categories?.length || 0} categories helping students</p>
                  </div>
                </div>
                <Button 
                  onClick={() => navigate('/faq')}
                  className="bg-green-600 hover:bg-green-700 text-white shadow-sm"
                >
                  Manage
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-25 border border-purple-100">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <Award className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Certificates</p>
                    <p className="text-sm text-gray-600">{certificates.records?.length || 0} certificates issued to students</p>
                  </div>
                </div>
                <Button 
                  onClick={() => navigate('/certificates')}
                  className="bg-purple-600 hover:bg-purple-700 text-white shadow-sm"
                >
                  View All
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};