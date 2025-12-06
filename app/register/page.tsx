'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Video,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  ArrowLeft,
  Mail,
  User,
  Phone,
  Globe
} from 'lucide-react';
import Link from 'next/link';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  timezone: string;
  experience: string;
}

const upcomingSessions = [
  {
    id: 1,
    title: "Introduction to BG Wealth Sharing",
    date: "December 7, 2024",
    time: "7:00 PM HST",
    spots: 47,
    host: "Lee Meadows",
  },
  {
    id: 2,
    title: "Live Trading Signals Walkthrough",
    date: "December 10, 2024",
    time: "7:00 PM HST",
    spots: 32,
    host: "Lee Meadows",
  },
  {
    id: 3,
    title: "Member Q&A Session",
    date: "December 14, 2024",
    time: "6:00 PM HST",
    spots: 85,
    host: "Lee Meadows",
  },
];

const benefits = [
  "Learn directly from successful members",
  "See live trading signal demonstrations",
  "Get all your questions answered",
  "Exclusive bonuses for live attendees",
  "Network with like-minded investors",
];

const timezones = [
  "HST (Hawaii)",
  "PST (Pacific)",
  "MST (Mountain)",
  "CST (Central)",
  "EST (Eastern)",
  "GMT (London)",
  "CET (Europe)",
  "Other",
];

export default function RegisterPage() {
  const [selectedSession, setSelectedSession] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    timezone: '',
    experience: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In production, integrate with your email service or Zoom API
    console.log('Registration submitted:', { ...formData, sessionId: selectedSession });

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.email &&
    formData.timezone &&
    selectedSession;

  return (
    <main className="min-h-screen bg-[#0a0a14]">
      {/* Header */}
      <header className="border-b border-navy-light/30 bg-navy/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <div className="text-white font-bold">BG Wealth Sharing</div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {!isSubmitted ? (
          <>
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-2 mb-4">
                <Video className="w-4 h-4 text-gold" />
                <span className="text-gold text-sm font-medium">Live Zoom Sessions</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Join Our <span className="gold-gradient">Free Live Training</span>
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                Register for an upcoming live session to learn how our members are building wealth
                through the BG Wealth Sharing opportunity.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-8">
              {/* Session Selection & Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-3"
              >
                {/* Select Session */}
                <div className="bg-navy/50 backdrop-blur-sm border border-navy-light/30 rounded-2xl p-6 mb-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gold" />
                    Select a Session
                  </h2>
                  <div className="space-y-3">
                    {upcomingSessions.map((session) => (
                      <button
                        key={session.id}
                        onClick={() => setSelectedSession(session.id)}
                        className={`w-full p-4 rounded-xl border transition-all duration-300 text-left ${
                          selectedSession === session.id
                            ? 'border-gold bg-gold/10'
                            : 'border-navy-light/30 bg-navy-dark/30 hover:border-gold/50'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-white mb-1">{session.title}</h3>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {session.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {session.time}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">Hosted by {session.host}</p>
                          </div>
                          <div className="text-right">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              selectedSession === session.id
                                ? 'border-gold bg-gold'
                                : 'border-gray-500'
                            }`}>
                              {selectedSession === session.id && (
                                <CheckCircle2 className="w-4 h-4 text-navy-dark" />
                              )}
                            </div>
                            <p className="text-xs text-gold mt-2">{session.spots} spots left</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="bg-navy/50 backdrop-blur-sm border border-navy-light/30 rounded-2xl p-6">
                  <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-gold" />
                    Your Information
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">First Name *</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-navy-dark/50 border border-navy-light/30 rounded-xl text-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors"
                          placeholder="John"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-navy-dark/50 border border-navy-light/30 rounded-xl text-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-400 text-sm mb-2">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 bg-navy-dark/50 border border-navy-light/30 rounded-xl text-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Phone (Optional)</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-navy-dark/50 border border-navy-light/30 rounded-xl text-white placeholder-gray-500 focus:border-gold focus:outline-none transition-colors"
                          placeholder="(808) 555-0123"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-2">Your Timezone *</label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <select
                          name="timezone"
                          value={formData.timezone}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 bg-navy-dark/50 border border-navy-light/30 rounded-xl text-white focus:border-gold focus:outline-none transition-colors appearance-none cursor-pointer"
                        >
                          <option value="">Select timezone</option>
                          {timezones.map((tz) => (
                            <option key={tz} value={tz}>{tz}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-400 text-sm mb-2">Investment Experience</label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-navy-dark/50 border border-navy-light/30 rounded-xl text-white focus:border-gold focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select your experience level</option>
                      <option value="beginner">Beginner - New to investing</option>
                      <option value="some">Some Experience - Have invested before</option>
                      <option value="experienced">Experienced - Active investor</option>
                      <option value="professional">Professional - Work in finance</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                      isFormValid && !isSubmitting
                        ? 'bg-gradient-to-r from-gold to-gold-light text-navy-dark hover:shadow-lg hover:shadow-gold/30'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Registering...
                      </span>
                    ) : (
                      'Reserve My Spot'
                    )}
                  </button>

                  <p className="text-gray-500 text-sm text-center mt-4">
                    By registering, you agree to receive emails about this event and related opportunities.
                  </p>
                </form>
              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:col-span-2"
              >
                {/* What You'll Learn */}
                <div className="bg-navy/50 backdrop-blur-sm border border-navy-light/30 rounded-2xl p-6 mb-6">
                  <h3 className="text-lg font-bold text-white mb-4">What You&apos;ll Get</h3>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Live Attendees */}
                <div className="bg-gradient-to-br from-gold/20 to-gold-light/10 border border-gold/30 rounded-2xl p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-8 h-8 text-gold" />
                    <div>
                      <p className="text-gold text-2xl font-bold">2,847+</p>
                      <p className="text-gray-400 text-sm">Have attended our live sessions</p>
                    </div>
                  </div>
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-navy-dark border-2 border-gold/50 flex items-center justify-center text-gold font-bold text-sm"
                      >
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full bg-gold/20 border-2 border-gold/50 flex items-center justify-center text-gold text-xs font-medium">
                      +99
                    </div>
                  </div>
                </div>

                {/* Host Info */}
                <div className="bg-navy/50 backdrop-blur-sm border border-navy-light/30 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Your Host</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-navy-dark text-2xl font-bold">
                      LM
                    </div>
                    <div>
                      <p className="text-white font-semibold">Lee Meadows</p>
                      <p className="text-gray-400 text-sm">Team Leader</p>
                      <p className="text-gold text-sm">500+ members mentored</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        ) : (
          /* Success State */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center py-20"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              You&apos;re Registered!
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              Check your email ({formData.email}) for the Zoom link and calendar invite.
              We can&apos;t wait to see you there!
            </p>
            <div className="bg-navy/50 border border-navy-light/30 rounded-2xl p-6 mb-8">
              <h3 className="text-gold font-semibold mb-2">Your Session:</h3>
              <p className="text-white text-lg">
                {upcomingSessions.find(s => s.id === selectedSession)?.title}
              </p>
              <p className="text-gray-400">
                {upcomingSessions.find(s => s.id === selectedSession)?.date} at{' '}
                {upcomingSessions.find(s => s.id === selectedSession)?.time}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-6 py-3 border border-gold/30 text-gold font-medium rounded-xl hover:bg-gold/10 transition-all"
              >
                Return Home
              </Link>
              <Link
                href="/dashboard"
                className="px-6 py-3 bg-gradient-to-r from-gold to-gold-light text-navy-dark font-bold rounded-xl hover:shadow-lg hover:shadow-gold/30 transition-all"
              >
                Explore Member Area
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
