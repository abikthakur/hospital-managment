import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Activity, Calendar, Clock, Database, FileText, Heart,
  Shield, Star, Stethoscope, Users, User, ArrowRight, Menu, X, CheckCircle2
} from 'lucide-react';

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden selection:bg-blue-500 selection:text-white">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                <Activity className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-600">
                MedCare
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Home</a>
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Features</a>
              <a href="#about" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#testimonials" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Testimonials</a>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                Log in
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-md hover:shadow-lg transition-all"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-600 hover:text-blue-600"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-slate-100"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
              <a href="#home" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-md">Home</a>
              <a href="#features" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-md">Features</a>
              <a href="#about" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-md">About</a>
              <a href="#testimonials" className="block px-3 py-2 text-base font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50 rounded-md">Testimonials</a>
              <div className="border-t border-slate-100 mt-4 pt-4 flex flex-col gap-3">
                <Link to="/login" className="block w-full text-center px-4 py-2 border border-blue-600 rounded-lg text-blue-600 font-medium">
                  Log in
                </Link>
                <Link to="/register" className="block w-full text-center px-4 py-2 bg-blue-600 rounded-lg text-white font-medium">
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-cyan-200/30 blur-[80px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-200/30 blur-[100px]" />
          <div className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-purple-200/20 blur-[60px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-6">
                <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
                v2.0 is now live
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
                Smart <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Hospital</span><br />
                Management System
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
                Manage patients, appointments, doctors, reports, and hospital operations efficiently with our modern, secure, and user-friendly platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="inline-flex justify-center items-center gap-2 px-8 py-3.5 rounded-full text-white bg-blue-600 hover:bg-blue-700 font-semibold shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/login"
                  className="inline-flex justify-center items-center gap-2 px-8 py-3.5 rounded-full text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 font-semibold shadow-sm transition-all hover:-translate-y-0.5"
                >
                  Login
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-4 text-sm text-slate-500 font-medium">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <img key={i} className="w-8 h-8 rounded-full border-2 border-white" src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                  ))}
                </div>
                <p>Trusted by 10,000+ healthcare professionals</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:h-[600px] flex justify-center items-center"
            >
              {/* Dashboard mockup / Illustration */}
              <div className="relative w-full max-w-lg">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-3xl transform rotate-3 scale-105 opacity-20 blur-xl"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 p-2 overflow-hidden">
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <div className="h-6 w-24 bg-slate-200 rounded-full"></div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="w-1/3 h-24 bg-blue-50 rounded-xl border border-blue-100 p-4">
                          <Activity className="w-6 h-6 text-blue-500 mb-2" />
                          <div className="h-2 w-12 bg-blue-200 rounded mb-2"></div>
                          <div className="h-4 w-16 bg-blue-600 rounded"></div>
                        </div>
                        <div className="w-1/3 h-24 bg-cyan-50 rounded-xl border border-cyan-100 p-4">
                          <Users className="w-6 h-6 text-cyan-500 mb-2" />
                          <div className="h-2 w-12 bg-cyan-200 rounded mb-2"></div>
                          <div className="h-4 w-16 bg-cyan-600 rounded"></div>
                        </div>
                        <div className="w-1/3 h-24 bg-purple-50 rounded-xl border border-purple-100 p-4">
                          <Calendar className="w-6 h-6 text-purple-500 mb-2" />
                          <div className="h-2 w-12 bg-purple-200 rounded mb-2"></div>
                          <div className="h-4 w-16 bg-purple-600 rounded"></div>
                        </div>
                      </div>

                      <div className="h-40 bg-white rounded-xl border border-slate-100 p-4">
                        <div className="h-4 w-32 bg-slate-200 rounded mb-4"></div>
                        <div className="flex items-end gap-2 h-24">
                          {[40, 70, 45, 90, 65, 85, 55].map((h, i) => (
                            <motion.div
                              key={i}
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                              className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-md"
                            ></motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Icons */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100"
                >
                  <Heart className="w-8 h-8 text-red-500" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-8 -left-8 w-20 h-20 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-100"
                >
                  <Stethoscope className="w-10 h-10 text-blue-600" />
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-1/2 -right-10 w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-slate-100"
                >
                  <Shield className="w-6 h-6 text-green-500" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 bg-white border-y border-slate-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
            {[
              { label: 'Patients', value: '5000+' },
              { label: 'Doctors', value: '120+' },
              { label: 'Support', value: '24/7' },
              { label: 'Secure', value: '99.9%' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3">Core Features</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need to run your hospital</h3>
            <p className="text-lg text-slate-600">A comprehensive suite of tools designed specifically for modern healthcare facilities to streamline operations and improve patient care.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Patient Management', desc: 'Easily track patient history, vitals, and treatment plans in one secure place.', icon: <Users className="w-6 h-6 text-blue-600" />, color: 'from-blue-500/20 to-blue-500/5' },
              { title: 'Doctor Scheduling', desc: 'Optimize doctor availability with smart calendar scheduling and shift management.', icon: <Calendar className="w-6 h-6 text-purple-600" />, color: 'from-purple-500/20 to-purple-500/5' },
              { title: 'Appointment Booking', desc: 'Seamless online appointment booking system for patients with automated reminders.', icon: <Clock className="w-6 h-6 text-cyan-600" />, color: 'from-cyan-500/20 to-cyan-500/5' },
              { title: 'Medical Reports', desc: 'Generate, store, and share lab results and medical reports securely.', icon: <FileText className="w-6 h-6 text-indigo-600" />, color: 'from-indigo-500/20 to-indigo-500/5' },
              { title: 'Emergency Support', desc: 'Quick access dashboard for emergency cases and ambulance tracking.', icon: <Activity className="w-6 h-6 text-red-600" />, color: 'from-red-500/20 to-red-500/5' },
              { title: 'Secure Database', desc: 'HIPAA compliant data storage ensuring complete privacy of medical records.', icon: <Database className="w-6 h-6 text-emerald-600" />, color: 'from-emerald-500/20 to-emerald-500/5' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl border border-slate-100 transition-all group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-cyan-50 rounded-3xl transform -rotate-3 scale-105"></div>
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Modern Hospital"
                  className="relative rounded-3xl shadow-xl object-cover h-[500px] w-full"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <img key={i} className="w-10 h-10 rounded-full border-2 border-white" src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="Doctor" />
                      ))}
                    </div>
                    <div className="text-sm font-bold">120+ Doctors</div>
                  </div>
                  <p className="text-sm text-slate-500">Ready to assist you 24/7</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-3">About MedCare</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Simplifying Healthcare Operations</h3>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                MedCare is a next-generation hospital management system designed to reduce administrative burden and allow healthcare professionals to focus on what matters most: patient care.
                <br /><br />
                Our integrated platform connects every department, from front desk to pharmacy, creating a seamless workflow that improves efficiency, reduces errors, and enhances the overall patient experience.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  'Cloud-based architecture for anywhere access',
                  'Intuitive interface requiring minimal training',
                  'Real-time analytics and reporting dashboard',
                  'Automated billing and insurance claims'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors"
              >
                Learn more about our mission <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>




      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white">
                  <Activity className="w-5 h-5" />
                </div>
                <span className="text-2xl font-bold text-white">
                  MedCare
                </span>
              </div>
              <p className="text-slate-400 mb-6">Providing intelligent management solutions for modern healthcare facilities worldwide.</p>
              <div className="flex space-x-4">
                {/* Social Icons Placeholder */}
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
                  <span className="sr-only">GitHub</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Product</h4>
              <ul className="space-y-4">
                <li><a href="#features" className="hover:text-blue-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Updates</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Company</h4>
              <ul className="space-y-4">
                <li><a href="#about" className="hover:text-blue-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Legal</h4>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© 2026 MedCare Hospital Management System. All rights reserved.</p>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for Healthcare</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
