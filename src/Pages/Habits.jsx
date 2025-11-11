
import React, { useEffect, useState } from "react";
import HabitCard from "../Components/HabitCard";

const Habits = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch("http://localhost:3000/habits")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading)
        return (
            <div className="text-center py-20 text-[#364436] text-lg font-semibold">
                Loading Featured Habits...
            </div>
        );

    if (error)
        return (
            <div className="text-center py-20 text-red-500 text-lg font-semibold">
                Error: {error}
            </div>
        );

    return (
        <section className="py-20 ">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#364436]">
                     All Habits
                </h2>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {data.map((habit) => (
                        <HabitCard key={habit._id} habit={habit} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Habits;