
"use client";

import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BrainCircuit,
  Menu,
  X,
  Sparkles,
  UserRound,
  GraduationCap,
  CalendarDays,
  Clock3,
  MapPin,
  ExternalLink,
  Mail,
  Phone,
} from "lucide-react";
import Image from "next/image";

import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

import {
  FiMail,
  FiPhone,
} from "react-icons/fi";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Our Team", href: "#team" },
  { label: "Events", href: "#events" },
  { label: "Contact", href: "#contact" },
];


type BoardMember = {
  id: string;
  name: string;
  role: string;
  photo_url: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  instagram_url: string | null;
  display_order: number;
};

type Event = {
  id: string;
  title: string;
  description: string;
  poster_url: string | null;
  date: string;
  start_time: string | null;
  end_time: string | null;
  venue: string | null;
  registration_url: string | null;
};

type SocialLink = {
  id: string;
  platform: string;
  url: string;
  display_order: number;
};

type ContactDetails = {
  id: number;
  president_name: string;
  president_phone: string;
  vice_president_name: string;
  vice_president_phone: string;
  email: string;
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);
  const [selectedPosterTitle, setSelectedPosterTitle] = useState("");

  // Board Members
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([]);
  const [boardMembersLoading, setBoardMembersLoading] = useState(true);
  const [boardMembersError, setBoardMembersError] = useState(false);

  useEffect(() => {
    async function fetchBoardMembers() {
      const supabase = createClient();

      try {
        const { data, error } = await supabase
          .from("board_members")
          .select(
            "id, name, role, photo_url, linkedin_url, github_url, instagram_url, display_order"
          )
          .order("display_order", { ascending: true });

        if (error) {
          console.error("Error fetching board members:", error);
          setBoardMembersError(true);
        } else {
          setBoardMembers(data ?? []);
        }
      } catch (error) {
        console.error("Unexpected error fetching board members:", error);
        setBoardMembersError(true);
      } finally {
        setBoardMembersLoading(false);
      }
    }

    fetchBoardMembers();
  }, []);

  // Events
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState(false);

  useEffect(() => {
    async function fetchEvents() {
      const supabase = createClient();

      try {
        const today = new Date().toLocaleDateString("en-CA");

        const { data, error } = await supabase
          .from("events")
          .select(
            "id, title, description, poster_url, date, start_time, end_time, venue, registration_url"
          )
          .gte("date", today)
          .order("date", { ascending: true });

        if (error) {
          console.error("Error fetching events:", error);
          setEventsError(true);
        } else {
          setEvents(data ?? []);
        }
      } catch (error) {
        console.error("Unexpected error fetching events:", error);
        setEventsError(true);
      } finally {
        setEventsLoading(false);
      }
    }

    fetchEvents();
  }, []);

  // Social Links
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [socialLinksLoading, setSocialLinksLoading] = useState(true);
  const [socialLinksError, setSocialLinksError] = useState(false);

  useEffect(() => {
    async function fetchSocialLinks() {
      const supabase = createClient();

      try {
        const { data, error } = await supabase
          .from("social_links")
          .select("id, platform, url, display_order")
          .order("display_order", { ascending: true });

        if (error) {
          console.error("Error fetching social links:", error);
          setSocialLinksError(true);
        } else {
          setSocialLinks(data ?? []);
        }
      } catch (error) {
        console.error("Unexpected error fetching social links:", error);
        setSocialLinksError(true);
      } finally {
        setSocialLinksLoading(false);
      }
    }

    fetchSocialLinks();
  }, []);

  // Contact Details
  const [contact, setContact] = useState<ContactDetails | null>(null);
  const [contactLoading, setContactLoading] = useState(true);
  const [contactError, setContactError] = useState(false);

  useEffect(() => {
    async function fetchContact() {
      const supabase = createClient();

      try {
        const { data, error } = await supabase
          .from("contact_details")
          .select(
            "id, president_name, president_phone, vice_president_name, vice_president_phone, email"
          )
          .eq("id", 1)
          .maybeSingle();

        if (error) {
          console.error("Error fetching contact details:", error);
          setContactError(true);
        } else {
          setContact(data);
        }
      } catch (error) {
        console.error("Unexpected error fetching contact details:", error);
        setContactError(true);
      } finally {
        setContactLoading(false);
      }
    }

    fetchContact();
  }, []);

  return (
    <><main className="min-h-screen overflow-hidden bg-[#070B17] text-white">
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
                priority />
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
                href="https://forms.gle/VHKmpc2hDLTS6QAt8"
                target="_blank"
                rel="noopener noreferrer"
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
            className="absolute aspect-square w-[96%] rounded-full border border-cyan-300/30" />

          {/* Dashed ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="absolute aspect-square w-[80%] rounded-full border border-dashed border-blue-400/40" />

          {/* Bright rotating arcs */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute aspect-square w-[66%] rounded-full border-[3px] border-transparent border-t-cyan-300 border-r-blue-400/80 drop-shadow-[0_0_12px_rgba(34,211,238,0.9)]" />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute aspect-square w-[88%] rounded-full border-[4px] border-transparent border-t-cyan-200 border-l-blue-400/80 drop-shadow-[0_0_14px_rgba(34,211,238,0.9)]" />

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
              className="absolute z-10 h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_15px_4px_rgba(34,211,238,0.55)]" />
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
            className="pointer-events-none absolute left-[22%] right-[22%] top-1/2 z-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-200 to-transparent shadow-[0_0_18px_rgba(103,232,249,0.9)]" />

          {/* MIC logo */}
          <div className="relative z-10 flex aspect-square w-full items-center justify-center">
            <Image
              src="/mic-watermark.png"
              alt="Machine Intelligence Club logo"
              width={620}
              height={620}
              priority
              className="h-auto w-[88%] object-contain drop-shadow-[0_0_25px_rgba(103,232,249,0.45)] sm:w-[90%]" />
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
                description: "Build strong foundations through technical sessions, peer learning, and exploration of emerging AI and ML concepts.",
                icon: "learn",
              },
              {
                number: "02",
                title: "Build",
                description: "Turn ideas into practical projects, experiment with tools, and solve real problems through hands-on development.",
                icon: "build",
              },
              {
                number: "03",
                title: "Collaborate",
                description: "Connect with fellow learners, exchange ideas, participate in events, and grow together as a technical community.",
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

      {/* Upcoming Events */}
      <section
        id="events"
        className="relative z-10 border-t border-white/[0.06] bg-[#090F1E]/70 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7 }}
          >
            {/* Section heading */}
            <div className="mb-10 text-center sm:mb-14">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
                <CalendarDays size={15} />
                What's happening
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Upcoming{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200 bg-clip-text text-transparent">
                  Events
                </span>
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Explore MIC workshops, technical sessions, and opportunities
                to learn, build, and connect.
              </p>
            </div>

            {/* Loading state */}
            {eventsLoading ? (
              <p className="py-12 text-center text-slate-400">
                Loading events...
              </p>
            ) : eventsError ? (
              /* Error state */
              <p className="py-12 text-center text-slate-400">
                Unable to load events. Please try again later.
              </p>
            ) : events.length === 0 ? (
              /* Empty state */
              <div className="rounded-2xl border border-white/10 bg-[#0d1424] px-6 py-12 text-center">
                <CalendarDays
                  size={42}
                  strokeWidth={1.3}
                  className="mx-auto text-cyan-200" />
                <h3 className="mt-4 text-lg font-semibold text-white">
                  No upcoming events yet
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Check back soon for MIC workshops, sessions, and events.
                </p>
              </div>
            ) : (
              /* Event cards */
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event, index) => (
                  <motion.article
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.45,
                      delay: (index % 3) * 0.1,
                    }}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1424] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-[#101b2e]"
                  >
                    {/* Event poster */}
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-white/[0.06] bg-gradient-to-br from-cyan-300/[0.10] to-blue-500/[0.05]">
                      {event.poster_url ? (
                        
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPoster(event.poster_url);
                          setSelectedPosterTitle(event.title);
                        }}
                        className="absolute inset-0 block h-full w-full cursor-zoom-in"
                        aria-label={`View full poster for ${event.title}`}
                      >
                        <img
                          src={event.poster_url}
                          alt={`${event.title} poster`}
                          className="h-full w-full object-contain transition-transform duration-300 hover:scale-[1.02]"
                        />
                      </button>

                      ) : (
                        <div className="flex h-full flex-col items-center justify-center gap-3">
                          <BrainCircuit
                            size={48}
                            strokeWidth={1.2}
                            className="text-cyan-200" />
                          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                            MIC Event
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Event details */}
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <h3 className="text-xl font-bold leading-snug text-white">
                        {event.title}
                      </h3>

                      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-400">
                        {event.description}
                      </p>

                      <div className="mt-5 space-y-3">
                        <div className="flex items-start gap-3 text-sm text-slate-300">
                          <CalendarDays
                            size={17}
                            className="mt-0.5 shrink-0 text-cyan-300" />
                          <span>
                            {new Date(
                              `${event.date}T00:00:00`
                            ).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>

                        {(event.start_time || event.end_time) && (
                          <div className="flex items-start gap-3 text-sm text-slate-300">
                            <Clock3
                              size={17}
                              className="mt-0.5 shrink-0 text-cyan-300" />
                            <span>
                              {event.start_time
                                ? event.start_time.slice(0, 5)
                                : ""}
                              {event.start_time && event.end_time
                                ? " – "
                                : ""}
                              {event.end_time
                                ? event.end_time.slice(0, 5)
                                : ""}
                            </span>
                          </div>
                        )}

                        {event.venue && (
                          <div className="flex items-start gap-3 text-sm text-slate-300">
                            <MapPin
                              size={17}
                              className="mt-0.5 shrink-0 text-cyan-300" />
                            <span>{event.venue}</span>
                          </div>
                        )}
                      </div>

                      {/* Registration button */}
                      <div className="mt-auto pt-6">
                        {event.registration_url ? (
                          <a
                            href={event.registration_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-cyan-300 px-5 py-3 text-sm font-bold text-[#07101D] transition-colors hover:bg-cyan-200"
                          >
                            Register Now
                            <ExternalLink size={16} />
                          </a>
                        ) : (
                          <span className="inline-flex w-full items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-slate-500">
                            Registration link unavailable
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Registration CTA */}
      <section
        id="register"
        className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-cyan-400/[0.10] via-[#0D1527] to-blue-500/[0.08] px-6 py-10 text-center shadow-[0_0_60px_rgba(34,211,238,0.06)] sm:px-10 sm:py-14 lg:px-16 lg:py-16"
        >
          {/* Decorative glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[70px]" />

          {/* Decorative corner accents */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border border-cyan-300/10 sm:h-56 sm:w-56" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -left-12 h-40 w-40 rounded-full border border-blue-300/10 sm:h-56 sm:w-56" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
              <Sparkles size={14} />
              Be part of MIC
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Your next idea starts{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200 bg-clip-text text-transparent">
                here.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
              Explore Artificial Intelligence, work on exciting projects,
              learn with fellow students, and turn your curiosity into
              something meaningful with the Machine Intelligence Club.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://forms.gle/VHKmpc2hDLTS6QAt8"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="inline-flex w-auto items-center justify-center gap-1 rounded-full bg-cyan-300 px-5 py-2 text-xs font-bold text-[#07101D] transition-colors hover:bg-cyan-200"
              >
                Register <ArrowRight className="h-3.5 w-3.5" />
              </a>
              <a
                href="#events"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan-300/40 hover:bg-white/[0.06]"
              >
                Explore Events
              </a>
            </div>

            <p className="mt-5 text-xs text-slate-500">
              Learn together. Build together. Grow together.
            </p>
          </div>
        </motion.div>
      </section>


      {/* HOD Section */}
      <section
        id="hod"
        className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          {/* Section heading */}
          <div className="mb-10 text-center sm:mb-14">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
              <Sparkles size={14} />
              Faculty Leadership
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Meet our{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200 bg-clip-text text-transparent">
                HOD
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Academic leadership supporting innovation, learning, and
              excellence in Artificial Intelligence and Machine Learning.
            </p>
          </div>

          {/* HOD profile card */}
          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#101a2d] to-[#0a1020] transition-colors hover:border-cyan-300/25">
            <div className="grid items-center gap-0 md:grid-cols-[0.8fr_1.2fr]">
              {/* Photo placeholder */}
              <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden bg-cyan-400/[0.04] p-8 sm:min-h-[320px]">
                <div className="absolute h-48 w-48 rounded-full bg-cyan-400/10 blur-[60px]" />

                <div className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-2xl border border-cyan-300/20 bg-[#0d192b] sm:h-52 sm:w-52">
                  <UserRound size={56} color="#67e8f9" strokeWidth={1.5} />
                </div>

                <div className="absolute bottom-5 left-5 rounded-full border border-cyan-300/20 bg-[#0b1424]/90 px-3 py-1.5 text-xs font-medium text-cyan-200">
                  Head of Department
                </div>
              </div>

              {/* HOD details */}
              <div className="p-6 sm:p-9 lg:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                  Department of AI &amp; ML
                </p>

                <h3 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl">
                  Dr. Thota Venkat Narayana Rao
                </h3>

                <p className="mt-3 text-sm font-medium text-slate-300 sm:text-base">
                  Head of the Department, CSE - AI &amp; ML
                </p>

                <div className="my-6 h-px w-full bg-gradient-to-r from-cyan-300/40 to-transparent" />

                <p className="text-sm leading-7 text-slate-400 sm:text-base">
                  Providing academic leadership and encouraging students
                  to explore Artificial Intelligence, Machine Learning,
                  research, and practical innovation.
                </p>

                <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-200">
                  <GraduationCap size={20} className="text-cyan-200" />
                  <span>Sreenidhi Institute of Science and Technology</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Faculty Coordinators */}
      <section
        id="faculty-coordinators"
        className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          {/* Heading */}
          <div className="mb-10 text-center sm:mb-14">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
              <GraduationCap size={15} />
              Faculty Mentorship
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Faculty{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200 bg-clip-text text-transparent">
                Coordinators
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Meet the faculty guiding MIC activities, supporting student
              initiatives, and encouraging technical growth.
            </p>
          </div>

          {/* Coordinator cards */}
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            {[
              {
                name: "Mr. K. Siva Kumar Gowda",
                role: "Faculty Coordinator",
                designation: "Assistant Professor",
                description: "Supporting MIC initiatives, encouraging collaboration, and helping students develop practical technical skills.",
              },
              {
                name: "Mrs. S. Bhavana",
                role: "Faculty Coordinator",
                designation: "Assistant Professor",
                description: "Guiding students in technical learning, project development, and exploring new opportunities in AI and Machine Learning.",
              },
            ].map((faculty, index) => (
              <motion.article
                key={faculty.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1424] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-[#101b2e] sm:p-8"
              >
                {/* Decorative glow */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-cyan-400/[0.06] blur-3xl transition-colors group-hover:bg-cyan-400/[0.12]" />

                <div className="relative flex items-center gap-5">
                  {/* Photo placeholder */}
                  <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/[0.08] sm:h-32 sm:w-32 lg:h-36 lg:w-36">
                    <UserRound
                      size={64}
                      strokeWidth={1.4}
                      className="text-cyan-200" />
                  </div>

                  {/* Details */}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                      Faculty Coordinator
                    </p>

                    <h3 className="mt-2 text-lg font-bold leading-snug text-white sm:text-xl">
                      {faculty.name}
                    </h3>
                    <p className="mt-2 text-sm text-slate-400">
                      {faculty.designation}
                    </p>

                    <p className="mt-2 text-sm text-slate-400">
                      Department of AI &amp; ML
                    </p>
                  </div>
                </div>

                <div className="relative mt-6 h-px w-full bg-gradient-to-r from-cyan-300/30 via-blue-400/10 to-transparent" />

                <p className="relative mt-5 text-sm leading-7 text-slate-400">
                  {faculty.description}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>



      {/* Board Members */}
      <section
        id="team"
        className="relative z-10 border-t border-white/[0.06] bg-[#090F1E]/70 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ duration: 0.7 }}
          >
            {/* Section heading */}
            <div className="mb-10 text-center sm:mb-14">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
                <BrainCircuit size={15} />
                Student Leadership
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Meet our{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200 bg-clip-text text-transparent">
                  Board Members
                </span>
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Meet the student team driving MIC initiatives, building
                projects, and creating opportunities for our community.
              </p>
            </div>

            {/* Loading state */}
            {boardMembersLoading ? (
              <p className="py-12 text-center text-slate-400">
                Loading board members...
              </p>
            ) : boardMembersError ? (
              /* Error state */
              <p className="py-12 text-center text-slate-400">
                Unable to load board members. Please try again later.
              </p>
            ) : boardMembers.length === 0 ? (
              /* Empty state */
              <div className="rounded-2xl border border-white/10 bg-[#0d1424] px-6 py-12 text-center">
                <UserRound
                  size={42}
                  strokeWidth={1.3}
                  className="mx-auto text-cyan-200" />
                <h3 className="mt-4 text-lg font-semibold text-white">
                  Our team is coming soon
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Board member profiles will appear here once they are added.
                </p>
              </div>
            ) : (
              /* Board member cards */
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {boardMembers.map((member, index) => (
                  <motion.article
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.45, delay: (index % 3) * 0.1 }}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d1424] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-[#101b2e] sm:p-7"
                  >
                    {/* Decorative glow */}
                    <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-cyan-400/[0.06] blur-3xl transition-colors group-hover:bg-cyan-400/[0.12]" />

                    {/* Member photo */}
                    <div className="relative mx-auto flex aspect-square w-full max-w-[220px] items-center justify-center overflow-hidden rounded-2xl border border-cyan-300/25 bg-gradient-to-br from-cyan-300/[0.10] to-blue-500/[0.05] sm:max-w-[240px]">
                        
                        {member.photo_url ? (
                          <img
                            src={member.photo_url}
                            alt={`${member.name} - ${member.role}`}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        ) : (
                        <UserRound
                          size={90}
                          strokeWidth={1.2}
                          className="text-cyan-200" />
                      )}
                    </div>

                    {/* Member details */}
                    <div className="relative mt-6 text-center">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
                        {member.role}
                      </p>

                      <h3 className="mt-2 break-words text-xl font-bold text-white">
                        {member.name}
                      </h3>
                    </div>

                    {/* Social links */}
                    <div className="relative mt-5 flex flex-wrap items-center justify-center gap-3">
                      {member.linkedin_url && (
                        <a
                          href={member.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name}'s LinkedIn profile`}
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300 transition-colors hover:border-cyan-300/30 hover:text-cyan-200"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                            <FaLinkedin size={19} />
                          </div>
                          LinkedIn
                        </a>
                      )}

                      {member.github_url && (
                        <a
                          href={member.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name}'s GitHub profile`}
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300 transition-colors hover:border-cyan-300/30 hover:text-cyan-200"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                            <FaGithub size={19} />
                          </div>
                          GitHub
                        </a>
                      )}

                      {member.instagram_url && (
                        <a
                          href={member.instagram_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name}'s Instagram profile`}
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300 transition-colors hover:border-cyan-300/30 hover:text-cyan-200"
                        >
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                            <FaInstagram size={19} />
                          </div>
                          Instagram
                        </a>
                      )}
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>


      {/* Social Links */}
      <section
        id="social-links"
        className="relative z-10 border-t border-white/[0.06] bg-[#070B17] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
                <Sparkles size={15} />
                Stay Connected
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Follow{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200 bg-clip-text text-transparent">
                  MIC
                </span>
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Stay updated with our activities, events, projects, and
                opportunities.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {socialLinksLoading ? (
                <p className="py-6 text-sm text-slate-400">
                  Loading social links...
                </p>
              ) : socialLinksError ? (
                <p className="py-6 text-sm text-slate-400">
                  Unable to load social links.
                </p>
              ) : socialLinks.length === 0 ? (
                <p className="py-6 text-sm text-slate-400">
                  Our social links will be available soon.
                </p>
              ) : (
                socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-xl border border-white/10 bg-[#0d1424] px-5 py-4 text-sm font-semibold text-slate-200 transition-all hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-[#101b2e] hover:text-cyan-200"
                  >
                    
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                      {social.platform.toLowerCase() === "instagram" ? (
                        <FaInstagram size={19} />
                      ) : social.platform.toLowerCase() === "linkedin" ? (
                        <FaLinkedin size={19} />
                      ) : social.platform.toLowerCase() === "github" ? (
                        <FaGithub size={19} />
                      ) : null}
                    </div>

                    <span>{social.platform}</span>
                    <ArrowRight
                      size={16}
                      className="text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-cyan-200" />
                  </a>
                ))
              )}
            </div>
          </motion.div>
        </div>
      </section>


      {/* Contact */}
      <section
        id="contact"
        className="relative z-10 border-t border-white/[0.06] bg-[#090F1E]/80 px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
          >
            {/* Heading */}
            <div className="text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-200">
                <Sparkles size={15} />
                Get in Touch
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Contact{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200 bg-clip-text text-transparent">
                  MIC
                </span>
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
                Have a question or want to collaborate? Reach out to our team.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-4xl">
              {contactLoading ? (
                <p className="py-10 text-center text-slate-400">
                  Loading contact details...
                </p>
              ) : contactError ? (
                <p className="py-10 text-center text-slate-400">
                  Unable to load contact details. Please try again later.
                </p>
              ) : !contact ? (
                <div className="rounded-2xl border border-white/10 bg-[#0d1424] px-6 py-10 text-center">
                  <p className="text-slate-300">
                    Contact information will be available soon.
                  </p>
                </div>
              ) : (
                <div className="grid gap-5 md:grid-cols-2">
                  {/* President */}
                  <div className="rounded-2xl border border-white/10 bg-[#0d1424] p-6 transition-colors hover:border-cyan-300/25 sm:p-8">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-200">
                        <Phone size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                          President
                        </p>
                        <h3 className="mt-1 text-lg font-bold text-white">
                          {contact.president_name}
                        </h3>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-white/10 pt-5">
                      <p className="text-sm text-slate-400">Phone</p>
                      <a
                        href={`tel:${contact.president_phone}`}
                        className="mt-1 inline-block break-all text-sm font-medium text-slate-200 transition-colors hover:text-cyan-200"
                      >
                        {contact.president_phone}
                      </a>
                    </div>
                  </div>

                  {/* Vice President */}
                  
                  <div className="rounded-2xl border border-white/10 bg-[#0d1424] p-6 transition-colors hover:border-cyan-300/25 sm:p-8">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-200">
                        <Phone size={24} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                          Vice President
                        </p>
                        <h3 className="mt-1 text-lg font-bold text-white">
                          {contact.vice_president_name}
                        </h3>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-white/10 pt-5">
                      <p className="text-sm text-slate-400">Phone</p>
                      <a
                        href={`tel:${contact.vice_president_phone}`}
                        className="mt-1 inline-block break-all text-sm font-medium text-slate-200 transition-colors hover:text-cyan-200"
                      >
                        {contact.vice_president_phone}
                      </a>
                    </div>
                  </div>


                  {/* Club email */}
                  <div className="rounded-2xl border border-white/10 bg-[#0d1424] p-6 md:col-span-2 sm:p-8">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-300/[0.08] text-cyan-200">
                        <Mail size={24} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">
                          Email
                        </p>
                        <a
                          href={`mailto:${contact.email}`}
                          className="mt-1 block break-all text-base font-semibold text-white transition-colors hover:text-cyan-200 sm:text-lg"
                        >
                          {contact.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>


    </main>
    
{selectedPoster && (
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
    onClick={() => setSelectedPoster(null)}
  >
    <button
      type="button"
      onClick={() => setSelectedPoster(null)}
      className="absolute right-4 top-4 z-10 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
      aria-label="Close poster viewer"
    >
      Close ✕
    </button>

    <div
      className="flex max-h-[90vh] max-w-[95vw] flex-col items-center gap-3"
      onClick={(e) => e.stopPropagation()}
    >
      <p className="text-center text-sm font-medium text-white">
        {selectedPosterTitle}
      </p>

      <img
        src={selectedPoster}
        alt={`${selectedPosterTitle} full poster`}
        className="max-h-[82vh] max-w-full cursor-zoom-in object-contain"
        onClick={(e) => {
          const img = e.currentTarget;
          img.classList.toggle("scale-150");
          img.classList.toggle("cursor-zoom-in");
          img.classList.toggle("cursor-zoom-out");
        }}
      />

      <p className="text-xs text-slate-300">
        Click the poster to zoom · Click outside to close
      </p>
    </div>
  </div>
)}

    
    <footer className="relative overflow-hidden border-t border-cyan-400/15 bg-[#050B18] px-6 py-12 text-white sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Club information */}
          <div>
            <a href="#home" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-400/10">
                <BrainCircuit className="h-6 w-6 text-cyan-300" />
              </div>
              <div>
                <p className="text-lg font-bold tracking-wide">MIC</p>
                <p className="text-xs text-cyan-300">
                  Machine Intelligence Club
                </p>
              </div>
            </a>

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
              A student community exploring Artificial Intelligence, Machine
              Learning, and the future of technology.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-5 font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a href="#home" className="transition hover:text-cyan-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="transition hover:text-cyan-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#events" className="transition hover:text-cyan-300">
                  Events
                </a>
              </li>
              <li>
                <a href="#team" className="transition hover:text-cyan-300">
                  Board Members
                </a>
              </li>
              <li>
                <a href="#contact" className="transition hover:text-cyan-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Department */}
          <div>
            <h3 className="mb-5 font-semibold text-white">Our Department</h3>
            <p className="text-sm leading-7 text-slate-400">
              Department of Artificial Intelligence &amp; Machine Learning
            </p>
            <p className="mt-3 text-sm text-slate-400">
              Sreenidhi Institute of Science and Technology
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 font-semibold text-white">Get in Touch</h3>
            <p className="text-sm leading-7 text-slate-400">
              Interested in AI/ML, collaborating with us, or joining our
              activities? Connect with the MIC community.
            </p>
            <a
              href="#contact"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
            >
              Contact the Team
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Machine Intelligence Club. All rights
            reserved.
          </p>
          <a href="#home" className="transition hover:text-cyan-300">
            Back to top ↑
          </a>
        </div>
      </footer></> 
  );
}
