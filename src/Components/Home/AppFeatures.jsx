import React from "react";
import { FaRegCheckCircle, FaClock, FaChartLine, FaUsers, FaBell } from "react-icons/fa";

const AppFeatures = () => {
  const features = [
    {
      icon: <FaRegCheckCircle className="text-blue-500" />,
      title: "Track Daily Habits",
      desc: "Easily add and track your daily habits to build consistent routines.",
    },
    {
      icon: <FaClock className="text-green-500" />,
      title: "Set Reminders",
      desc: "Never miss a habit! Get timely reminders to stay on track.",
    },
    {
      icon: <FaChartLine className="text-purple-500" />,
      title: "Analyze Progress",
      desc: "Visualize your streaks and monitor progress over time.",
    },
    {
      icon: <FaUsers className="text-orange-500" />,
      title: "Community Support",
      desc: "Join a supportive community to stay motivated and accountable.",
    },
    {
      icon: <FaBell className="text-red-500" />,
      title: "Smart Notifications",
      desc: "Receive personalized notifications to improve habit consistency.",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
        
        {/* Left Side Image */}
        <div className="lg:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1613732563096-1a00a46da7d4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170" 
            alt="App Illustration"
            className="w-full  shadow-lg"
          />
        </div>

        {/* Right Side AI Tree */}
        <div className="lg:w-1/2 relative border-l-2 border-gray-300 pl-8">
          {features.map((feature, index) => (
            <div key={index} className="mb-10 relative">
              <span className="absolute -left-5 top-0 w-10 h-10 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full shadow">
                {feature.icon}
              </span>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 mt-1">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AppFeatures;
