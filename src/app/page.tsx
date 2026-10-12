
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BrainCircuit,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Our Team", href: "#team" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-[#070B17] text-white">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-48 left-1/2 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute right-[-200px] top-[30%] h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      </div>

      {/* Navbar */}
      <header className="relative z-20 border-b border-white/[0.08] bg-[#070B17]/75 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8 sm:py-4 lg:px-12">
          <a href="#" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <div className="relative h-12 w-16 shrink-0 sm:h-14 sm:w-20">
              <Image
                src="/mic-logo.png"
                alt="Machine Intelligence Club logo"
                fill
                sizes="(max-width: 640px) 64px, 80px"
                className="object-contain"
                priority
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold tracking-wide text-white sm:text-sm">
                MACHINE INTELLIGENCE
              </p>
              <p className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.2em] text-slate-400 sm:text-[10px] sm:tracking-[0.22em]">
                Club · SNIST
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-slate-300 transition-colors hover:text-cyan-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#register"
              className="mx-auto inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 py-2 text-xs font-bold text-[#07101D] transition-colors hover:bg-cyan-200"
            >
              Join MIC <ArrowRight className="ml-1 inline h-4 w-4" />
            </a>
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="ml-3 shrink-0 rounded-lg border border-white/10 p-2 text-slate-200 transition-colors hover:bg-white/5 md:hidden"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-white/10 bg-[#0B1120] px-5 py-5 md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-slate-300 transition-colors hover:text-cyan-300"
                >
                  {link.label}
                </a>
              ))}
              
              <div className="flex justify-center">
                <a
                  href="#register"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex w-auto items-center justify-center gap-1 rounded-full bg-cyan-300 px-5 py-2 text-xs font-bold text-[#07101D] transition-colors hover:bg-cyan-200"
                >
                  Join MIC <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>

            </div>
          </div>
        )}
      </header>

      
{/* Hero */}
<section className="relative z-10 mx-auto grid min-h-[calc(100svh-64px)] max-w-7xl items-center gap-8 overflow-hidden px-5 py-10 sm:gap-10 sm:px-8 sm:py-16 md:py-20 lg:min-h-[calc(100svh-76px)] lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:px-12 lg:py-16">

  {/* Hero text */}
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: "easeOut" }}
    className="relative z-10"
  >
    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-3.5 py-2 text-xs font-medium text-cyan-200 sm:mb-8 sm:px-4 sm:text-sm">
      <Sparkles size={15} />
      <span>Explore. Build. Innovate.</span>
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
    </div>

    <div className="mb-4 space-y-2 sm:mb-5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-300 sm:text-sm sm:tracking-[0.2em]">
        Sreenidhi Institute of Science and Technology
      </p>
      <p className="text-xs font-medium leading-6 text-slate-300 sm:text-sm">
        Department of Artificial Intelligence &amp; Machine Learning
      </p>
    </div>

    <h1 className="max-w-4xl text-[2.65rem] font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
      Machine
      <br className="sm:hidden" /> Intelligence
      <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200 bg-clip-text text-transparent">
        Club.
      </span>
    </h1>

    <p className="mt-5 text-lg font-semibold text-slate-200 sm:mt-6 sm:text-xl">
      Think Beyond. Build Intelligence.
    </p>

    <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400 sm:mt-6 sm:text-lg sm:leading-8">
      A community of curious minds exploring Artificial Intelligence,
      Machine Learning, and new ideas through hands-on projects,
      technical sessions, and collaboration.
    </p>

    <div className="mt-6 flex flex-col items-center gap-3 sm:mt-9 sm:flex-row sm:items-start sm:gap-4">
      <a
        href="#register"
        className="group inline-flex min-h-9 w-fit min-w-[180px] items-center justify-center gap-2 rounded-full bg-cyan-300 px-4 py-2 text-xs font-bold text-[#07101D] transition-all hover:bg-cyan-200 hover:shadow-[0_0_35px_rgba(103,232,249,0.2)] sm:min-h-12 sm:min-w-0 sm:px-7 sm:py-3.5 sm:text-sm"
      >
        Join Our Community
        <ArrowRight
          size={17}
          className="transition-transform group-hover:translate-x-1"
        />
      </a>

      <a
        href="#events"
        className="inline-flex min-h-9 w-fit min-w-[180px] items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-cyan-300/40 hover:bg-white/[0.06] sm:min-h-12 sm:min-w-0 sm:px-7 sm:py-3.5 sm:text-sm"
      >
        Explore Events
      </a>
    </div>

    <a
      href="#about"
      className="mt-8 inline-flex items-center gap-2 text-xs text-slate-500 transition-colors hover:text-cyan-300 sm:mt-12 sm:text-sm"
    >
      Discover what we do
      <ArrowDown size={15} />
    </a>
  </motion.div>

  {/* Animated MIC hologram */}
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.9, ease: "easeOut" }}
    className="relative mx-auto flex aspect-square w-full max-w-[320px] items-center justify-center sm:max-w-[420px] lg:max-w-none"
  >
    {/* Ambient glow */}
    <div className="absolute h-[60%] w-[60%] rounded-full bg-cyan-400/30 blur-[75px]" />
    <div className="absolute h-[45%] w-[45%] rounded-full bg-blue-500/25 blur-[60px]" />

    {/* Outer rotating ring */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
      className="absolute aspect-square w-[96%] rounded-full border border-cyan-300/30"
    />

    {/* Dashed ring */}
    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      className="absolute aspect-square w-[80%] rounded-full border border-dashed border-blue-400/40"
    />

    {/* Bright rotating arcs */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      className="absolute aspect-square w-[66%] rounded-full border-[3px] border-transparent border-t-cyan-300 border-r-blue-400/80 drop-shadow-[0_0_12px_rgba(34,211,238,0.9)]"
    />

    <motion.div
      animate={{ rotate: -360 }}
      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      className="absolute aspect-square w-[88%] rounded-full border-[4px] border-transparent border-t-cyan-200 border-l-blue-400/80 drop-shadow-[0_0_14px_rgba(34,211,238,0.9)]"
    />

    {/* Orbiting particles */}
    {[0, 120, 240].map((angle) => (
      <motion.div
        key={angle}
        animate={{ rotate: [angle, angle + 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-[7%] rounded-full"
      >
        <div className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-cyan-200 shadow-[0_0_18px_5px_rgba(34,211,238,0.75)]" />
      </motion.div>
    ))}

    {/* Secondary moving particles */}
    {[
      { left: "17%", top: "28%", delay: 0 },
      { left: "78%", top: "35%", delay: 0.8 },
      { left: "28%", top: "78%", delay: 1.4 },
      { left: "72%", top: "73%", delay: 0.5 },
    ].map((particle, index) => (
      <motion.div
        key={index}
        animate={{ opacity: [0.25, 1, 0.25], scale: [0.7, 1.3, 0.7] }}
        transition={{
          duration: 2.5,
          delay: particle.delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ left: particle.left, top: particle.top }}
        className="absolute z-10 h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_15px_4px_rgba(34,211,238,0.55)]"
      />
    ))}

    {/* Scanning light behind logo */}
    <motion.div
      aria-hidden="true"
      animate={{ y: ["-120%", "120%"], opacity: [0, 0.85, 0] }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: "linear",
        repeatDelay: 0.5,
      }}
      className="pointer-events-none absolute left-[22%] right-[22%] top-1/2 z-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-200 to-transparent shadow-[0_0_18px_rgba(103,232,249,0.9)]"
    />

    {/* MIC logo */}
    <div className="relative z-10 flex aspect-square w-full items-center justify-center">
      <Image
        src="/mic-watermark.png"
        alt="Machine Intelligence Club logo"
        width={620}
        height={620}
        priority
        className="h-auto w-[88%] object-contain drop-shadow-[0_0_25px_rgba(103,232,249,0.45)] sm:w-[90%]"
      />
    </div>

    {/* Neural Networks label */}
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute left-[-1%] top-[22%] z-20 rounded-xl border border-cyan-200/20 bg-[#0D1527]/95 px-3 py-2 shadow-xl backdrop-blur-xl sm:left-[-4%] sm:px-4 sm:py-3"
    >
      <p className="text-[8px] uppercase tracking-widest text-slate-500 sm:text-[10px]">
        Learn
      </p>
      <p className="mt-1 text-[10px] font-semibold text-cyan-200 sm:text-sm">
        Neural Networks
      </p>
    </motion.div>

    {/* Deep Learning label */}
    <motion.div
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-[20%] right-[-1%] z-20 rounded-xl border border-blue-300/20 bg-[#0D1527]/95 px-3 py-2 shadow-xl backdrop-blur-xl sm:right-[-4%] sm:px-4 sm:py-3"
    >
      <p className="text-[8px] uppercase tracking-widest text-slate-500 sm:text-[10px]">
        Create
      </p>
      <p className="mt-1 text-[10px] font-semibold text-blue-200 sm:text-sm">
        Deep Learning
      </p>
    </motion.div>
  </motion.div>
</section>

      
      {/* About MIC */}
      <section
        id="about"
        className="relative z-10 border-t border-white/[0.06] bg-[#090F1E]/80 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200 sm:text-sm">
              <Sparkles size={14} />
              About MIC
            </span>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Curiosity into{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200 bg-clip-text text-transparent">
                innovation.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
              The Machine Intelligence Club at Sreenidhi Institute of Science and
              Technology brings together students who are curious about Artificial
              Intelligence and Machine Learning. We create opportunities to learn,
              experiment, share ideas, and turn knowledge into meaningful projects.
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-3 sm:gap-5 lg:gap-6">
            {[
              {
                number: "01",
                title: "Learn",
                description:
                  "Build strong foundations through technical sessions, peer learning, and exploration of emerging AI and ML concepts.",
                icon: "learn",
              },
              {
                number: "02",
                title: "Build",
                description:
                  "Turn ideas into practical projects, experiment with tools, and solve real problems through hands-on development.",
                icon: "build",
              },
              {
                number: "03",
                title: "Collaborate",
                description:
                  "Connect with fellow learners, exchange ideas, participate in events, and grow together as a technical community.",
                icon: "collaborate",
              },
            ].map((feature, index) => (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 transition-colors duration-300 hover:border-cyan-300/25 hover:bg-cyan-300/[0.035] sm:p-7"
              >
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/[0.06] blur-3xl transition-colors group-hover:bg-cyan-400/[0.12]" />

                <div className="relative flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-200">
                    {feature.icon === "learn" && <BrainCircuit size={23} />}
                    {feature.icon === "build" && <Sparkles size={23} />}
                    {feature.icon === "collaborate" && <ArrowRight size={23} />}
                  </div>

                  <span className="text-sm font-medium tracking-widest text-slate-600">
                    {feature.number}
                  </span>
                </div>

                <h3 className="relative mt-6 text-xl font-semibold text-white sm:text-2xl">
                  {feature.title}
                </h3>

                <p className="relative mt-3 text-sm leading-7 text-slate-400">
                  {feature.description}
                </p>

                <div className="relative mt-6 h-px w-full bg-gradient-to-r from-cyan-300/30 via-blue-400/10 to-transparent" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
