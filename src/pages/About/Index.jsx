import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navsection from './Navsection';

const About = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const teamMembers = [
    {
      id: 1,
      name: "Sachin Pal",
      role: "Frontend Developer",
      image: "",
      bio: "Creative developer 1 year experience as inter and freelancer......",
      skills: ["React", "Node.js", "Javscript"]
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bio: "Full-stack developer passionate about creating elegant solutions.",
      skills: ["React", "Node.js", "Python"]
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "UX/UI Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      bio: "Creative designer focused on user-centered design principles.",
      skills: ["Figma", "UI Design", "Prototyping"]
    },
    {
      id: 4,
      name: "Deepanshu Varshnay",
      role: "Backend Engineer",
      image: "",
      bio: "Backend specialist ensuring robust and scalable infrastructure.",
      skills: ["API Design", "Databases", "Java"]
    },
    {
      id: 5,
      name: "Jessica Williams",
      role: "Frontend Developer",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
      bio: "Frontend expert crafting beautiful and responsive interfaces.",
      skills: ["CSS", "JavaScript", "Animation"]
    },
    {
      id: 6,
      name: "Alex Thompson",
      role: "DevOps Engineer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      bio: "DevOps guru maintaining seamless deployment and operations.",
      skills: ["Docker", "CI/CD", "AWS"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navsection/>
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="px-4 py-16 sm:py-24"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
          >
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Amazing Team</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
          >
            We're a passionate group of creators, developers, and innovators dedicated to building something extraordinary together.
          </motion.p>
        </div>
      </motion.div>

      {/* Team Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16 sm:pb-24">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              onHoverStart={() => setHoveredCard(member.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative group"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 shadow-2xl transition-all duration-300 hover:shadow-purple-500/50">
                {/* Image Container */}
                <div className="relative h-64 sm:h-72 overflow-hidden">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredCard === member.id ? 1.1 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-purple-400 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-300 text-sm mb-4">
                    {member.bio}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * index }}
                        className="px-3 py-1 bg-purple-500/30 text-purple-200 rounded-full text-xs font-medium border border-purple-400/30"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Hover Effect Border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-purple-500 opacity-0 pointer-events-none"
                  animate={{
                    opacity: hoveredCard === member.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA Section */}
      {/* <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto px-4 pb-16 sm:pb-24 text-center"
      >
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Want to Join Us?
          </h2>
          <p className="text-lg text-purple-100 mb-6">
            We're always looking for talented individuals to join our team.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get In Touch
          </motion.button>
        </div>
      </motion.div> */}
    </div>
  );
};

export default About;