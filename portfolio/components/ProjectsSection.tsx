"use client";

import { forwardRef, useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import { projects, highlightedProjects } from "@/lib/data";

const ProjectsSection = forwardRef<HTMLElement>((props, ref) => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const otherProjectsRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState(0);

  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const isFeaturedInView = useInView(featuredRef, {
    once: false,
    amount: 0.2,
    margin: "-100px 0px",
  });
  const isOtherInView = useInView(otherProjectsRef, {
    once: false,
    amount: 0.2,
    margin: "-100px 0px",
  });

  // Calculate the height based on the number of other projects
  useEffect(() => {
    if (otherProjectsRef.current) {
      // Set the height to be enough for the horizontal scroll effect
      // This creates enough scrolling space for the animation to complete
      const otherProjectsCount = projects.filter(
        (p) => !p.isHighlighted
      ).length;
      setSectionHeight(window.innerHeight * 1.5);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: otherProjectsRef,
    offset: ["start start", "end end"],
  });

  // Transform the vertical scroll into horizontal movement (right to left)
  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1], // Input range (scroll progress)
    ["100%", "50%", "0%"] // Output range (horizontal translation)
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <section ref={ref} id="projects" className="py-20 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={containerRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
              Featured Projects
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            A showcase of my best work, featuring web applications, mobile apps,
            and more.
          </motion.p>
        </motion.div>

        <motion.div
          ref={featuredRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isFeaturedInView ? "visible" : "hidden"}
        >
          {highlightedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={() => setSelectedProject(project.id)}
              className="cursor-pointer"
            >
              <ProjectCard project={project} isHighlighted colorIndex={index} />
            </motion.div>
          ))}
        </motion.div>

        <motion.h3
          className="text-3xl font-bold mt-24 mb-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isOtherInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Other Projects
          </span>
        </motion.h3>

        {/* Sticky Other Projects Section */}
        {/* <div
          ref={otherProjectsRef}
          style={{ height: `${sectionHeight}px` }}
          className="relative"
        >
          <div className="sticky top-0 h-screen flex items-center overflow-hidden">
            <motion.div
              className="flex flex-nowrap gap-8 px-4 md:px-12 w-fit"
              style={{ x }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isOtherInView ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {projects
                .filter((p) => !p.isHighlighted)
                .map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="min-w-[300px] sm:min-w-[350px] md:min-w-[400px] h-[500px] md:h-[600px] flex-shrink-0 cursor-pointer"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    whileHover={{
                      y: -20,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      },
                    }}
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <ProjectCard project={project} colorIndex={index + 3} />
                  </motion.div>
                ))}
            </motion.div>
          </div>
        </div> */}
      </div>

      {selectedProject !== null && (
        <ProjectModal
          project={projects.find((p) => p.id === selectedProject)!}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
});

ProjectsSection.displayName = "ProjectsSection";
export default ProjectsSection;
