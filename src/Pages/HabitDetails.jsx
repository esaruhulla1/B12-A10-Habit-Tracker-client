import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import Loading from "../Components/Loading";

const HabitDetails = () => {
  const { id } = useParams();
  const [habit, setHabit] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch habit details
  const fetchHabit = async () => {
    try {
      const res = await fetch(`http://localhost:3000/habit/${id}`);
      const data = await res.json();
      setHabit(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabit();
  }, [id,]);

  // 🔹 Format date (DD-MM-YYYY)
  const getFormattedDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // 🔹 Calculate current streak (continuous days only)
  const calculateCurrentStreak = () => {
    if (!habit?.completionHistory || habit.completionHistory.length === 0)
      return 0;

    const sortedDates = [...habit.completionHistory]
      .map((d) => {
        const [day, month, year] = d.split("-");
        return new Date(`${year}-${month}-${day}`);
      })
      .sort((a, b) => b - a); // latest first

    let streak = 1;
    for (let i = 1; i < sortedDates.length; i++) {
      const diffDays =
        (sortedDates[i - 1] - sortedDates[i]) / (1000 * 60 * 60 * 24);
      if (diffDays === 1) streak++;
      else break; // break যদি একদিন মিস হয়
    }
    return streak;
  };

  // 🔹 Calculate 30-day progress (missed days ignored)
  const calculateProgressLast30Days = () => {
    if (!habit?.completionHistory || habit.completionHistory.length === 0)
      return 0;

    const today = new Date();
    const past30 = new Date();
    past30.setDate(today.getDate() - 29); // last 30 days

    const completedDates = habit.completionHistory.map((d) => {
      const [day, month, year] = d.split("-");
      return new Date(`${year}-${month}-${day}`);
    });

    const completedInLast30 = completedDates.filter(
      (d) => d >= past30 && d <= today
    );

    const uniqueDays = new Set(completedInLast30.map((d) => d.toDateString()));
    const progressPercent = (uniqueDays.size / 30) * 100;

    return Math.min(progressPercent, 100);
  };

  // 🔹 Badge system
  const getBadge = (streak) => {
    if (streak >= 30)
      return { label: "⏰ Time Master Badge", color: "#7b1fa2" };
    if (streak >= 20) return { label: "🏅 On 20 Badge", color: "#1565c0" };
    if (streak >= 10) return { label: "🥇 On 10 Badge", color: "#f57c00" };
    if (streak >= 1) return { label: "🟢 Start Badge", color: "#2e7d32" };
    return { label: "⭐ Keep Going!", color: "#90A4AE" };
  };

  // 🔹 Handle mark complete
  const handleMarkComplete = async () => {
    const today = getFormattedDate();

    if (habit.completionHistory.includes(today)) {
      Swal.fire({
        icon: "info",
        title: "Already Completed!",
        text: "You’ve already marked this habit complete today.",
      });
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3000/habits/complete/${habit._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date: today }),
        }
      );

      const result = await res.json();

      if (result.success) {
        await fetchHabit();
        Swal.fire({
          icon: "success",
          title: "Marked Complete! ✅",
          text: "Great job! Keep it up!",
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "Already Done!",
          text: "You’ve already marked this habit complete today.",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Could not update completion history.",
      });
    }
  };

  if (loading)
    return <Loading></Loading>
  if (!habit)
    return <p className="text-center text-red-500 mt-10">Habit not found!</p>;

  const streak = calculateCurrentStreak();
  const progress = calculateProgressLast30Days();
  const badge = getBadge(streak);

  return (
    <div className="min-h-screen  py-10 px-5">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10 border border-gray-200">
        {/* 🖼️ Image */}
        <img
          src={habit.image}
          alt="Habit"
          className="w-full h-64 object-cover rounded-xl mb-6"
        />

        {/* 🏷️ Title + Category */}
        <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
          <h1 className="text-3xl font-bold text-[#096B68]">
            {habit.habitTitle}
          </h1>
          <span className="px-3 py-1 bg-[#90D1CA] text-[#096B68] rounded-full font-semibold">
            {habit.category}
          </span>
        </div>

        {/* 📘 Description */}
        <p className="text-gray-700 mb-6">{habit.description}</p>

        {/* 📊 Progress */}
        <div className="mb-6">
          <p className="font-semibold text-gray-700 mb-2">
            Progress (Last 30 Days): {progress.toFixed(0)}%
          </p>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="h-4 rounded-full transition-all duration-700 ease-in-out"
              style={{
                width: `${progress}%`,
                background:
                  "linear-gradient(90deg, #096B68, #129990, #f47000)",
              }}
            ></div>
          </div>
        </div>

        {/* 🔥 Streak */}
        <div className="mb-4 flex items-center gap-2">
          <span className="text-xl">🔥</span>
          <span className="font-bold text-[#f47000] text-lg">
            {streak} Day{streak > 1 ? "s" : ""} Streak
          </span>
        </div>

        {/* 🏅 Badge */}
        <div className="mb-6">
          <p
            className="font-bold text-lg px-4 py-2 rounded-xl inline-block"
            style={{
              backgroundColor: `${badge.color}20`,
              color: badge.color,
            }}
          >
            {badge.label}
          </p>
        </div>

        {/* 👤 Creator Info */}
        <div className="mb-6 text-sm text-gray-600">
          <p>
            <span className="font-semibold">Created by:</span>{" "}
            {habit.userName}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {habit.userEmail}
          </p>
        </div>

        {/* ✅ Mark Complete */}
        <button
          onClick={handleMarkComplete}
          className="w-full bg-[#096B68] hover:bg-[#129990] text-white py-3 rounded-xl font-bold text-lg transition duration-300"
        >
          Mark Complete
        </button>
      </div>
    </div>
  );
};

export default HabitDetails;
