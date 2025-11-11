import React, { useEffect, useState } from 'react';
import HabitCard from '../HabitCard';

const Featured = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/habits/featured")
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Featured Habits</h2>
            <ul>
                {data.map((habit) => <HabitCard habit={habit} key={habit._id}></HabitCard>)}
            </ul>
        </div>
    );
};

export default Featured;