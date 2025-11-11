import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Faqs = () => {
  const faqData = [
    {
      question: "What is Habit Tracker?",
      answer: "Habit Tracker is a web app that helps you create, track, and manage your daily habits to build streaks and boost productivity."
    },
    {
      question: "How do I track my habits?",
      answer: "You can add habits in the app, set reminders, and mark them as complete each day. Your progress is visualized to help you stay consistent."
    },
    {
      question: "Can I get reminders for my habits?",
      answer: "Yes! You can set smart notifications to remind you to complete your habits on time."
    },
    {
      question: "Is there a community feature?",
      answer: "Absolutely! You can join the community to stay motivated, share tips, and track your progress with friends."
    },
    {
      question: "Can I analyze my progress?",
      answer: "Yes, Habit Tracker provides visual progress charts and streak statistics to monitor your growth over time."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Frequently Asked Questions</h2>
        <p className="text-center text-gray-600 mb-12">Answers to the most common questions about Habit Tracker.</p>

        <div className="relative space-y-8">
          {faqData.map((faq, index) => (
            <div key={index} className="relative pl-10 group">
              {/* Vertical line */}
              <span className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></span>
              
              <div className="flex items-center gap-4 cursor-pointer" onClick={() => toggleFaq(index)}>
                {/* Node circle */}
                <span className={`w-5 h-5 rounded-full transition-colors duration-300 ${activeIndex === index ? 'bg-[#f47000]' : 'bg-gray-400 group-hover:bg-[#f47000]'}`}></span>
                <span className="text-lg font-medium text-gray-800 flex-1">{faq.question}</span>
                <span className="text-gray-600">
                  {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>

              {activeIndex === index && (
                <div className="ml-9 mt-3 p-4 bg-white rounded-lg shadow border border-gray-200 text-gray-700 transition-all duration-300">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faqs;
