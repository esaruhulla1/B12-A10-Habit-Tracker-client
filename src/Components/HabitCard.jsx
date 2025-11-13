import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router";

const HabitCard = ({ habit }) => {
  const {
    habitTitle,
    description,
    category,
    reminderTime,
    image,
    userName,
    userEmail,
    createdDate,
    completionHistory = [],
  } = habit;

  // Calculate current streak
  const calculateStreak = () => {
    if (!completionHistory.length) return 0;
    const dates = completionHistory
      .map(d => new Date(d.split("-").reverse().join("-")))
      .sort((a, b) => b - a);

    let streak = 0;
    let currentDate = new Date();
    for (let date of dates) {
      const diff = (currentDate - date) / (1000 * 60 * 60 * 24);
      if (diff <= 1) {
        streak++;
        currentDate = new Date(date);
        currentDate.setDate(currentDate.getDate() - 1);
      } else break;
    }
    return streak;
  };

  const streak = calculateStreak();

  return (
    <div className="relative rounded-md shadow-lg hover:shadow-2xl transform transition-all duration-300 overflow-hidden border border-[#90D1CA]/50">

      {/* Optional: Image */}
      {/* <div className="overflow-hidden">
        <img
          src={image}
          alt={habitTitle}
          className="w-full h-52 object-cover transition-transform duration-500 ease-in-out hover:scale-110"
        />
      </div> */}

      {/* Streak Badge */}
      {streak > 0 && (
        <div
          className="absolute top-3 right-3 px-3 py-1 rounded-lg text-white font-semibold text-sm"
          style={{ backgroundColor: "#89e223" }}
        >
          🏆 {streak} Day{streak > 1 ? "s" : ""}
        </div>
      )}

      <div className="p-6 space-y-4">
        {/* Habit Title */}
        <h3 className="text-2xl font-bold text-[#096B68]">{habitTitle}</h3>

        {/* Description */}
        <p className="text-gray-700 text-sm">
          {description.length > 100 ? description.slice(0, 100) + "..." : description}
        </p>

        {/* Category and Reminder */}
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 rounded-full text-[#096B68] font-semibold bg-[#90D1CA]/30">
            {category}
          </span>
          <span className="text-[#129990] font-medium">⏰ {reminderTime}</span>
        </div>

        {/* Creator Info */}
        <div className="flex items-center gap-3 pt-3 border-t border-[#90D1CA]/40">
          <FaUserCircle className="text-3xl text-[#129990]" />
          <div>
            <p className="font-semibold text-[#096B68]">{userName}</p>
            <p className="text-xs text-gray-500">{userEmail}</p>
          </div>
        </div>

        {/* Footer with Created Date and View Button */}
        <div className="flex justify-between items-center pt-4">
          <p className="text-xs text-gray-400">📅 {createdDate}</p>
          <Link
            to={`/habit-details/${habit._id}`}
            className="px-5 py-2 hover:underline text-[#096b68] underline-offset-3 hover:text-[#30c38d] font-semibold text-sm transition-all duration-300"
          >
             View Details...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
