import React from 'react';
import { motion } from 'framer-motion';
import Banner from '../Components/Home/Banner';
import WhyBuildHabits from '../Components/Home/WhyBuildHabits';
import TrackProgress from '../Components/Home/TrackProgress';
import FeaturedTestimonials from '../Components/Home/FeaturedTestimonials';
import AppFeatures from '../Components/Home/AppFeatures';
import Faqs from '../Components/Home/Faqs';
import Featured from '../Components/Home/Featured';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  },
};

const Home = () => {
  return (
    <div className='max-w-[1820px] mx-auto'>
      {/* Banner - we can animate if desired */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <Banner />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Featured />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <WhyBuildHabits />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <FeaturedTestimonials />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <TrackProgress />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <AppFeatures />
      </motion.div>

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Faqs />
      </motion.div>
    </div>
  );
};

export default Home;
