import React, { useEffect, useState } from "react";
import HabitCard from "../Components/HabitCard";
import Loading from "../Components/Loading";
import ErrorPage from "../Components/ErrorPage";

const Habits = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 🔍 Search & Filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // ✅ Fetch all habits
    useEffect(() => {
        fetch("http://localhost:3000/habits")
            .then((response) => {
                if (!response.ok) throw new Error("Network response was not ok");
                return response.json();
            })
            .then((data) => {
                setData(data);
                setFilteredData(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // ✅ Dynamic Filter + Search Logic
    useEffect(() => {
        let filtered = data;

        // Category Filter
        if (selectedCategory !== "All") {
            filtered = filtered.filter(
                (habit) =>
                    habit.category &&
                    habit.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        // Search Filter
        if (searchTerm.trim() !== "") {
            filtered = filtered.filter(
                (habit) =>
                    habit.habitTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    habit.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredData(filtered);
    }, [searchTerm, selectedCategory, data]);

    // ✅ UI States
    if (loading)
        return (
            <Loading></Loading>
        );

    if (error)
        return (
            <ErrorPage></ErrorPage>
        );

    return (
        <section className="py-15">
            <div className="container mx-auto px-4">


                {/* 🔹 Search + Filter Controls */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
                    {/* 🔹 Small device layout: title first */}
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#096B68] relative inline-block order-1 md:order-2">
                        All Habits
                        <span className="block w-24 md:w-28 h-1 bg-gradient-to-r from-[#096B68] to-[#129990] rounded-full mt-3 md:mt-4 mx-auto"></span>
                    </h2>

                    {/* 🔹 Search Bar */}
                    <input
                        type="text"
                        placeholder="🔍 Search by title or keyword..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:-mb-12 mb-0 md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#129990] order-2 md:order-1"
                    />

                    {/* 🔹 Category Dropdown */}
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full  md:-mb-12 mb-0 md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f47000] order-3 md:order-3"
                    >
                        <option value="All">All Categories</option>
                        <option value="Morning">Morning</option>
                        <option value="Work">Work</option>
                        <option value="Fitness">Fitness</option>
                        <option value="Evening">Evening</option>
                        <option value="Study">Study</option>
                    </select>
                </div>


                {/* 🔹 Habits Grid */}
                {filteredData.length === 0 ? (
                    <p className="text-center text-gray-600">No habits found.</p>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filteredData.map((habit) => (
                            <HabitCard key={habit._id} habit={habit} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Habits;




// import React, { useEffect, useState } from "react";
// import HabitCard from "../Components/HabitCard";

// const Habits = () => {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     useEffect(() => {
//         fetch("http://localhost:3000/habits")
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error("Network response was not ok");
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 setData(data);
//                 setLoading(false);
//             })
//             .catch((err) => {
//                 setError(err.message);
//                 setLoading(false);
//             });
//     }, []);

//     if (loading)
//         return (
//             <div className="text-center py-20 text-[#364436] text-lg font-semibold">
//                 Loading  Habits...
//             </div>
//         );

//     if (error)
//         return (
//             <div className="text-center py-20 text-red-500 text-lg font-semibold">
//                 Error: {error}
//             </div>
//         );

//     return (
//         <section className="py-15 ">
//             <div className="container mx-auto px-4">
//                 <div className="text-center mb-12">
//                     <h2 className="text-3xl md:text-3xl font-extrabold text-[#096B68] relative inline-block">
//                         All Habits
//                         <span className="block w-28 h-1 bg-gradient-to-r from-[#096B68] to-[#129990] rounded-full mt-4 mx-auto"></span>
//                     </h2>

//                     <p className="text-[#096B68]/80 mt-4 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
//                         Explore all the habits created by our users. Build streaks, stay
//                         consistent, and boost your productivity every day!
//                     </p>
//                 </div>

//                 <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//                     {data.map((habit) => (
//                         <HabitCard key={habit._id} habit={habit} />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Habits;