import React, { useEffect, useState } from "react";
import HabitCard from "../HabitCard";
import Loading from "../Loading";


const Featured = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://habit-tracker-server-tau.vercel.app/habits/featured")
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
            <Loading></Loading>
        );

    if (error)
        return (
            <p className="text-center text-red-500">Somthigs is wrong</p>
        );

    return (
        <section className="py-20 ">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#096b68]">
                     Featured Habits
                </h2>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {data.slice(0, 6).map((habit) => (
                        <HabitCard key={habit._id} habit={habit} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Featured;

