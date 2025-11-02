import React, { useState } from 'react';
import Icon from '../components/AppIcon';
import Header from './../components/ui/Header';

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set([1])); // First item open by default

  const faqCategories = [
    {
      title: "Admissions & Enrollment",
      faqs: [
        {
          id: 1,
          question: "What are the admission requirements?",
          answer: `Admission requirements vary by program, but generally include:\n• High school diploma or equivalent\n• Completed application form\n• Official transcripts\n• Personal statement or essay\n• Letters of recommendation (for some programs)\n• English proficiency test scores (for international students)\n\nSpecific programs may have additional requirements such as portfolios, interviews, or prerequisite courses.`
        },
        {
          id: 2,
          question: "When are the application deadlines?",
          answer: `We have rolling admissions for most programs with three main intake periods:\n• Fall Semester: Applications due July 15th\n• Spring Semester: Applications due November 15th\n• Summer Session: Applications due March 15th\n\nEarly applications are encouraged as some programs have limited capacity. International students should apply at least 3 months before the intended start date.`
        },
        {
          id: 3,
          question: "How long does the admission process take?",
          answer: `The typical admission timeline is:\n• Application review: 2-3 weeks\n• Interview scheduling (if required): 1 week\n• Final decision notification: 1-2 weeks after interview\n• Total process: 4-6 weeks from complete application\n\nWe provide regular updates throughout the process and you can track your application status online.`
        }
      ]
    },
    {
      title: "Financial Aid & Tuition",
      faqs: [
        {
          id: 4,
          question: "What financial aid options are available?",
          answer: `We offer comprehensive financial assistance including:\n• Merit-based scholarships (up to 50% tuition coverage)\n• Need-based grants\n• Federal and state financial aid\n• Work-study programs\n• Payment plans with 0% interest\n• Corporate sponsorship programs\n• Military and veteran benefits\n\nOur financial aid office provides personalized assistance to help you find the best funding options.`
        },
        {
          id: 5,
          question: "What is the total cost of attendance?",
          answer: `Tuition and fees vary by program:\n• Undergraduate programs: $15,000-$25,000 per year\n• Graduate programs: $18,000-$30,000 per year\n• Certificate programs: $3,000-$8,000 total\n• Professional development: $500-$2,000 per course\n\nAdditional costs may include books, materials, and technology fees. We provide detailed cost breakdowns for each program.`
        }
      ]
    },
    {
      title: "Programs & Courses",
      faqs: [
        {
          id: 6,
          question: "Do you offer online and hybrid learning options?",
          answer: `Yes, we offer flexible learning formats:\n• Fully online programs with live virtual classes\n• Hybrid programs combining online and on-campus learning\n• Evening and weekend classes for working professionals\n• Accelerated programs for faster completion\n• Self-paced learning modules\n\nAll formats maintain the same academic rigor and accreditation standards as traditional programs.`
        },
        {
          id: 7,
          question: "Can I transfer credits from other institutions?",
          answer: `We accept transfer credits from accredited institutions:\n• Up to 60 credits for undergraduate programs\n• Up to 30 credits for graduate programs\n• Professional certifications may qualify for credit\n• Military training and experience considered\n• Prior learning assessment available\n\nOur transfer credit evaluation is free and typically completed within 2 weeks of admission.`
        }
      ]
    },
    {
      title: "Student Support & Services",
      faqs: [
        {
          id: 8,
          question: "What support services are available for students?",
          answer: `We provide comprehensive student support:\n• Academic advising and tutoring\n• Career counseling and job placement assistance\n• Mental health and wellness services\n• Disability support services\n• International student services\n• Technical support for online learning\n• Library and research assistance\n• Student success coaching\n\nAll services are included in tuition with no additional fees.`
        },
        {
          id: 9,
          question: "Do you provide career placement assistance?",
          answer: `Our career services include:\n• Resume and interview preparation\n• Job search strategies and networking events\n• Industry connections and internship opportunities\n• Alumni mentorship programs\n• Career fairs and employer partnerships\n• LinkedIn profile optimization\n• Salary negotiation coaching\n\nWe maintain a 92% job placement rate within 6 months of graduation.`
        }
      ]
    }
  ];

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems?.has(id)) {
      newOpenItems?.delete(id);
    } else {
      newOpenItems?.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <Header/>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 text-primary mb-4">
            <Icon name="HelpCircle" size={20} />
            <span className="text-sm font-medium uppercase tracking-wider">Common Questions</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Find answers to the most common questions about admissions, programs, and student life.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqCategories?.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="text-xl font-semibold text-foreground mb-6 pb-2 border-b border-border">
                {category?.title}
              </h3>
              
              <div className="space-y-4">
                {category?.faqs?.map((faq) => (
                  <div
                    key={faq?.id}
                    className="bg-card rounded-lg border border-border overflow-hidden"
                  >
                    <button
                      onClick={() => toggleItem(faq?.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-200"
                    >
                      <span className="text-lg font-medium text-card-foreground pr-4">
                        {faq?.question}
                      </span>
                      <Icon
                        name={openItems?.has(faq?.id) ? "ChevronUp" : "ChevronDown"}
                        size={20}
                        className="text-muted-foreground flex-shrink-0 transition-transform duration-200"
                      />
                    </button>
                    
                    {openItems?.has(faq?.id) && (
                      <div className="px-6 pb-4">
                        <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {faq?.answer}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-16 bg-gradient-primary rounded-xl p-8 text-center text-white">
          <Icon name="MessageCircle" size={48} className="mx-auto mb-4 text-accent" />
          <h3 className="text-2xl font-semibold mb-4">Still Have Questions?</h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our admissions team is here to help with any specific questions about programs, requirements, or the application process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
              <Icon name="Phone" size={18} className="mr-2" />
              Call: +94773066411
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
              <Icon name="Mail" size={18} className="mr-2" />
              Email: ainudeen@gmail.com
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;