/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, 
  PhoneCall, 
  MessageSquare, 
  Smartphone, 
  UserCheck, 
  ArrowRight, 
  CheckCircle2, 
  ChevronDown,
  Send,
  Zap,
  TrendingUp,
  Clock,
  ShieldCheck,
  Info,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types & Constants ---

type Language = 'en' | 'hi' | 'bn' | 'mr';

const TRANSLATIONS = {
  en: {
    hero: "Book your next adventure",
    search: "Search Flights",
    from: "From",
    to: "To",
    departure: "Departure",
    travellers: "Travellers",
    label: "Localized for Tier-2 users"
  },
  hi: {
    hero: "अपनी अगली यात्रा बुक करें",
    search: "उड़ानें खोजें",
    from: "कहाँ से",
    to: "कहाँ तक",
    departure: "प्रस्थान",
    travellers: "यात्री",
    label: "टियर-2 उपयोगकर्ताओं के लिए स्थानीयकृत"
  },
  bn: {
    hero: "আপনার পরবর্তী অ্যাডভেঞ্চার বুক করুন",
    search: "ফ্লাইট খুঁজুন",
    from: "কোথা থেকে",
    to: "কোথায়",
    departure: "যাত্রা",
    travellers: "যাত্রী",
    label: "টায়ার-২ ব্যবহারকারীদের জন্য স্থানীয়করণ করা হয়েছে"
  },
  mr: {
    hero: "तुमचे पुढचे साहस बुक करा",
    search: "विमाने शोधा",
    from: "कोठून",
    to: "कोठे",
    departure: "प्रस्थान",
    travellers: "प्रवासी",
    label: "टियर-२ वापरकर्त्यांसाठी स्थानिकीकृत"
  }
};

const IMPACT_METRICS = [
  { label: "Support Cost", value: "-40%", icon: TrendingUp, color: "text-green-600" },
  { label: "Resolution Time", value: "2x Faster", icon: Clock, color: "text-blue-600" },
  { label: "User Retention", value: "+25%", icon: ShieldCheck, color: "text-orange-600" },
];

// --- Components ---

const SectionHeader = ({ title, icon: Icon, label }: { title: string, icon: any, label?: string }) => (
  <div className="flex flex-col mb-6">
    <div className="flex items-center gap-2 mb-1">
      <div className="p-2 bg-orange-100 rounded-lg">
        <Icon className="w-5 h-5 text-orange-600" />
      </div>
      <h2 className="text-xl font-headline font-bold text-zinc-800">{title}</h2>
    </div>
    {label && (
      <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest bg-orange-50 w-fit px-2 py-0.5 rounded">
        {label}
      </span>
    )}
  </div>
);

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [ivrStep, setIvrStep] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { text: "Hi! How can I help you today?", isBot: true }
  ]);
  const [device, setDevice] = useState<'iOS' | 'Android'>('Android');
  const [userType, setUserType] = useState<'Sensitive' | 'Premium'>('Sensitive');
  const [showLogic, setShowLogic] = useState(false);

  // --- Logic Simulations ---

  const getPrice = () => {
    if (device === 'Android' && userType === 'Sensitive') return "₹4,250";
    if (device === 'Android' && userType === 'Premium') return "₹5,100";
    if (device === 'iOS' && userType === 'Sensitive') return "₹5,100";
    return "₹6,400";
  };

  const handleChat = (text: string) => {
    setChatMessages(prev => [...prev, { text, isBot: false }]);
    setTimeout(() => {
      let reply = "I'm checking that for you...";
      if (text.toLowerCase().includes('booking')) {
        reply = "Your booking for DEL-BOM (24 Oct) is CONFIRMED! ✈️";
      } else if (text.toLowerCase().includes('refund')) {
        reply = "Your refund of ₹4,250 is being processed. Should reach you in 2 days.";
      }
      setChatMessages(prev => [...prev, { text: reply, isBot: true }]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 pb-20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h1 className="font-headline font-extrabold text-lg text-zinc-800 tracking-tight">
            Goibibo <span className="text-orange-600">Tier-2 Tech</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 rounded-full text-sm font-medium border border-zinc-200 hover:bg-zinc-100 transition-colors">
              <Globe className="w-4 h-4 text-zinc-500" />
              {lang.toUpperCase()}
              <ChevronDown className="w-3 h-3" />
            </button>
            <div className="absolute right-0 mt-2 w-32 bg-white border border-zinc-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              {(['en', 'hi', 'bn', 'mr'] as Language[]).map(l => (
                <button 
                  key={l}
                  onClick={() => setLang(l)}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors first:rounded-t-xl last:rounded-b-xl"
                >
                  {l === 'en' ? 'English' : l === 'hi' ? 'हिन्दी' : l === 'bn' ? 'বাংলা' : 'मराठी'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-12 space-y-16">
        {/* Impact Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {IMPACT_METRICS.map((m, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100 flex items-center gap-4"
            >
              <div className={`p-3 rounded-xl bg-white shadow-sm ${m.color}`}>
                <m.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{m.label}</p>
                <p className="text-2xl font-black text-zinc-800">{m.value}</p>
              </div>
            </motion.div>
          ))}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 1. Multilingual Homepage Simulation */}
          <section className="space-y-6">
            <SectionHeader 
              title="Multilingual Experience" 
              icon={Globe} 
              label={TRANSLATIONS[lang].label} 
            />
            <div className="bg-white rounded-3xl border-2 border-zinc-100 p-8 shadow-sm space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
              
              <h3 className="text-3xl font-headline font-extrabold text-zinc-800 leading-tight">
                {TRANSLATIONS[lang].hero}
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <p className="text-[10px] font-bold text-orange-600 uppercase mb-1">{TRANSLATIONS[lang].from}</p>
                    <p className="font-bold">New Delhi (DEL)</p>
                  </div>
                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <p className="text-[10px] font-bold text-orange-600 uppercase mb-1">{TRANSLATIONS[lang].to}</p>
                    <p className="font-bold">Mumbai (BOM)</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <p className="text-[10px] font-bold text-orange-600 uppercase mb-1">{TRANSLATIONS[lang].departure}</p>
                    <p className="font-bold">24 Oct'25</p>
                  </div>
                  <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                    <p className="text-[10px] font-bold text-orange-600 uppercase mb-1">{TRANSLATIONS[lang].travellers}</p>
                    <p className="font-bold">1 Person</p>
                  </div>
                </div>
              </div>

              <button className="w-full py-4 bg-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-600/20 hover:bg-orange-700 transition-colors">
                {TRANSLATIONS[lang].search}
              </button>
            </div>
          </section>

          {/* 2. IVR System Simulation */}
          <section className="space-y-6">
            <SectionHeader title="Smart IVR Flow" icon={PhoneCall} label="Faster Resolution" />
            <div className="bg-zinc-900 rounded-3xl p-8 text-white min-h-[400px] flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center animate-pulse">
                  <PhoneCall className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Customer Support</p>
                  <p className="font-bold">Automated Call Flow</p>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8">
                <AnimatePresence mode="wait">
                  {ivrStep === 0 && (
                    <motion.div 
                      key="step0"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      className="space-y-6"
                    >
                      <p className="text-xl font-medium text-white/80 italic">"Welcome to Goibibo. Please select your preferred language."</p>
                      <div className="flex gap-4 justify-center">
                        <button onClick={() => setIvrStep(1)} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 transition-colors">Press 1 for English</button>
                        <button onClick={() => setIvrStep(1)} className="px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded-xl transition-colors">Press 2 for Hindi</button>
                      </div>
                    </motion.div>
                  )}

                  {ivrStep === 1 && (
                    <motion.div 
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <p className="text-xl font-medium text-white/80 italic">"How can we help you today?"</p>
                      <div className="grid grid-cols-1 gap-3">
                        <button onClick={() => setIvrStep(2)} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 text-left flex justify-between items-center">
                          1. Booking Status <ArrowRight className="w-4 h-4" />
                        </button>
                        <button onClick={() => setIvrStep(2)} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl border border-white/10 text-left flex justify-between items-center">
                          2. Refund Inquiry <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {ivrStep === 2 && (
                    <motion.div 
                      key="step2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                      </div>
                      <p className="text-xl font-bold">Connecting to Expert...</p>
                      <p className="text-sm text-white/50">Estimated wait time: &lt; 30 seconds</p>
                      <button onClick={() => setIvrStep(0)} className="text-orange-400 text-sm font-bold uppercase tracking-widest hover:text-orange-300">Restart Simulation</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </section>

          {/* 3. WhatsApp AI Support Demo */}
          <section className="space-y-6">
            <SectionHeader title="WhatsApp AI Support" icon={MessageSquare} label="AI-powered WhatsApp Support" />
            <div className="bg-[#E5DDD5] rounded-3xl overflow-hidden border border-zinc-200 shadow-lg flex flex-col h-[500px]">
              <div className="bg-[#075E54] p-4 flex items-center gap-3 text-white">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <p className="font-bold">Goibibo AI Assistant</p>
                  <p className="text-[10px] text-white/70">Online</p>
                </div>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-4 no-scrollbar">
                {chatMessages.map((msg, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: msg.isBot ? -10 : 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${msg.isBot ? 'bg-white text-zinc-800 rounded-tl-none' : 'bg-[#DCF8C6] text-zinc-800 rounded-tr-none'}`}>
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-4 bg-[#F0F0F0] flex gap-2">
                <input 
                  type="text" 
                  placeholder="Type a message..."
                  className="flex-1 bg-white rounded-full px-4 py-2 text-sm border-none focus:ring-2 focus:ring-orange-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleChat(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <button className="w-10 h-10 bg-[#075E54] text-white rounded-full flex items-center justify-center shadow-md">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>

          {/* 4. Smart Pricing / User Segmentation */}
          <section className="space-y-6">
            <SectionHeader title="Dynamic Segmentation" icon={Smartphone} label="Dynamic pricing based on user behavior" />
            <div className="bg-white rounded-3xl border-2 border-zinc-100 p-8 shadow-sm space-y-10">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-zinc-400" />
                    <span className="font-bold text-zinc-700">Device Type</span>
                  </div>
                  <div className="flex bg-zinc-100 p-1 rounded-xl">
                    <button 
                      onClick={() => setDevice('Android')}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${device === 'Android' ? 'bg-white text-orange-600 shadow-sm' : 'text-zinc-500'}`}
                    >
                      Android
                    </button>
                    <button 
                      onClick={() => setDevice('iOS')}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${device === 'iOS' ? 'bg-white text-orange-600 shadow-sm' : 'text-zinc-500'}`}
                    >
                      iOS
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-5 h-5 text-zinc-400" />
                    <span className="font-bold text-zinc-700">User Profile</span>
                  </div>
                  <div className="flex bg-zinc-100 p-1 rounded-xl">
                    <button 
                      onClick={() => setUserType('Sensitive')}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${userType === 'Sensitive' ? 'bg-white text-orange-600 shadow-sm' : 'text-zinc-500'}`}
                    >
                      Price Sensitive
                    </button>
                    <button 
                      onClick={() => setUserType('Premium')}
                      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${userType === 'Premium' ? 'bg-white text-orange-600 shadow-sm' : 'text-zinc-500'}`}
                    >
                      Premium
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-zinc-100 flex flex-col items-center text-center space-y-4">
                <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Optimized Price for User</p>
                <motion.div 
                  key={getPrice()}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-5xl font-black text-orange-600"
                >
                  {getPrice()}
                </motion.div>
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-bold">
                  <TrendingUp className="w-3 h-3" />
                  {userType === 'Sensitive' ? 'Maximized Conversion' : 'Optimized Yield'}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Reveal Logic Button */}
        <div className="flex justify-center pb-20">
          <button 
            onClick={() => setShowLogic(true)}
            className="group flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-orange-600 transition-all shadow-2xl shadow-zinc-900/20"
          >
            <Info className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Reveal System Logic
          </button>
        </div>
      </main>

      {/* Logic Overlay */}
      <AnimatePresence>
        {showLogic && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl overflow-y-auto p-6 md:p-12"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-3xl font-headline font-black text-zinc-900">System Architecture Logic</h2>
                <button 
                  onClick={() => setShowLogic(false)}
                  className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
                >
                  <X className="w-8 h-8 text-zinc-400" />
                </button>
              </div>

              <div className="space-y-20">
                {/* Flow 1: Pricing */}
                <div className="space-y-8">
                  <h3 className="text-lg font-bold text-orange-600 uppercase tracking-widest border-l-4 border-orange-600 pl-4">Dynamic Pricing Engine</h3>
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <LogicBox icon={Smartphone} title="Device Detection" desc="iOS vs Android" />
                    <ArrowRight className="w-6 h-6 text-zinc-300 hidden md:block" />
                    <LogicBox icon={UserCheck} title="Behavior Analysis" desc="Price Sensitivity" />
                    <ArrowRight className="w-6 h-6 text-zinc-300 hidden md:block" />
                    <LogicBox icon={Zap} title="Pricing Engine" desc="ML-based Optimization" highlight />
                    <ArrowRight className="w-6 h-6 text-zinc-300 hidden md:block" />
                    <LogicBox icon={TrendingUp} title="Final Price" desc="Personalized Offer" />
                  </div>
                </div>

                {/* Flow 2: IVR */}
                <div className="space-y-8">
                  <h3 className="text-lg font-bold text-blue-600 uppercase tracking-widest border-l-4 border-blue-600 pl-4">Smart IVR Routing</h3>
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <LogicBox icon={Globe} title="Language Detection" desc="Region-based" />
                    <ArrowRight className="w-6 h-6 text-zinc-300 hidden md:block" />
                    <LogicBox icon={PhoneCall} title="IVR Routing" desc="Intent Prediction" highlight />
                    <ArrowRight className="w-6 h-6 text-zinc-300 hidden md:block" />
                    <LogicBox icon={Clock} title="Faster Resolution" desc="Direct Expert Connect" />
                  </div>
                </div>

                {/* Flow 3: WhatsApp */}
                <div className="space-y-8">
                  <h3 className="text-lg font-bold text-green-600 uppercase tracking-widest border-l-4 border-green-600 pl-4">AI WhatsApp Support</h3>
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    <LogicBox icon={MessageSquare} title="User Query" desc="Natural Language" />
                    <ArrowRight className="w-6 h-6 text-zinc-300 hidden md:block" />
                    <LogicBox icon={Zap} title="NLP Bot" desc="Instant Context Lookup" highlight />
                    <ArrowRight className="w-6 h-6 text-zinc-300 hidden md:block" />
                    <LogicBox icon={CheckCircle2} title="Ticket Resolved" desc="Zero Human Intervention" />
                  </div>
                </div>
              </div>

              <div className="mt-20 p-8 bg-zinc-50 rounded-3xl border border-zinc-100 text-center">
                <p className="text-zinc-500 font-medium max-w-2xl mx-auto">
                  This prototype demonstrates how Goibibo uses technology to bridge the gap for Tier-2 users, 
                  improving unit economics through automation and personalized experiences.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const LogicBox = ({ icon: Icon, title, desc, highlight }: { icon: any, title: string, desc: string, highlight?: boolean }) => (
  <div className={`w-full md:w-48 p-4 rounded-2xl border transition-all ${highlight ? 'bg-orange-600 border-orange-600 text-white shadow-xl shadow-orange-600/20' : 'bg-white border-zinc-100 text-zinc-800 shadow-sm'}`}>
    <Icon className={`w-6 h-6 mb-3 ${highlight ? 'text-white' : 'text-orange-600'}`} />
    <p className="font-bold text-sm mb-1">{title}</p>
    <p className={`text-[10px] ${highlight ? 'text-white/70' : 'text-zinc-400'}`}>{desc}</p>
  </div>
);
