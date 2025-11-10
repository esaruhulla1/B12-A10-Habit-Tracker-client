import React from 'react';
import Banner from '../Components/Home/Banner';
import WhyBuildHabits from '../Components/Home/WhyBuildHabits';
import TrackProgress from '../Components/Home/TrackProgress';
import FeaturedTestimonials from '../Components/Home/FeaturedTestimonials';
import AppFeatures from '../Components/Home/AppFeatures';
import Faqs from '../Components/Home/Faqs';


const Home = () => {
    return (
        <div className='max-w-[1820px]  mx-auto'>
            <Banner></Banner>
            <WhyBuildHabits></WhyBuildHabits>
            <FeaturedTestimonials></FeaturedTestimonials>
            <TrackProgress></TrackProgress>
            <AppFeatures></AppFeatures>
            <Faqs></Faqs>
            
        </div>
    );
};

export default Home;