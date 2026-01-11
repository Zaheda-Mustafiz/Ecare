import React, { useState, useEffect } from 'react';
import { BookingForm } from '../BookingForm';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { View } from '../../types';
import { 
  Smartphone, Battery, ShieldCheck, Star, 
  MapPin, Phone, Mail, Lock, 
  Menu, X, Instagram, Facebook, Twitter,
  Tablet, Clock, Briefcase, ChevronRight, Camera, Cpu, Droplets, Zap
} from 'lucide-react';

interface LandingViewProps {
  onNavigate: (view: View) => void;
}

const REVIEWS = [
  {
    name: "Sarah Johnson",
    rating: 5,
    text: "Amazing service! The technician arrived on time and fixed my iPhone screen in under 30 minutes. Highly recommended!",
    device: "iPhone 13 Pro"
  },
  {
    name: "Michael Chen",
    rating: 5,
    text: "My laptop battery was dead, and they replaced it at my office. Super convenient and professional.",
    device: "MacBook Air"
  },
  {
    name: "Emily Davis",
    rating: 4,
    text: "Good experience. The pricing was transparent and much cheaper than the authorized center. Will use again.",
    device: "Samsung S22"
  },
  {
    name: "James Wilson",
    rating: 5,
    text: "Thought my phone was a goner after dropping it in the pool. They brought it back to life! Saved all my photos.",
    device: "Google Pixel 7"
  },
  {
    name: "Anita Roy",
    rating: 5,
    text: "Best price in the city. The technician explained everything clearly before starting the repair.",
    device: "OnePlus 9"
  },
  {
    name: "Robert Fox",
    rating: 5,
    text: "Very professional. They came to my home, fixed the charging port in 20 mins. Superb service.",
    device: "iPad Air"
  }
];

const DeviceCategoryCard = ({ title, image, repairTypes }: { title: string, image: string, repairTypes: string[] }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="group relative overflow-hidden rounded-xl bg-white shadow-md border border-slate-100 h-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Highlight Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br from-brand-400/20 to-transparent pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
      
      <div className="h-36 w-full overflow-hidden relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transform group-hover:scale-120 transition-transform duration-700" 
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent opacity-90 group-hover:opacity-95 transition-all duration-300 ${isHovered ? 'from-slate-900 to-slate-900/50' : ''}`}></div>
        <h3 className="absolute bottom-3 left-3 text-lg font-bold text-white tracking-wide transform group-hover:translate-x-1 transition-transform duration-300">{title}</h3>
      </div>
      <div className="p-3">
        <ul className="space-y-1.5">
          {repairTypes.map((type, i) => (
            <li 
              key={i} 
              className={`flex items-center text-xs font-medium text-slate-600 transform transition-all duration-300 ${isHovered ? 'text-brand-600 translate-x-1' : ''}`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className={`w-1 h-1 rounded-full mr-2 transition-all duration-300 ${isHovered ? 'bg-brand-500 scale-150' : 'bg-brand-500'}`}></div>
              {type}
            </li>
          ))}
        </ul>
        <button className="mt-3 w-full py-1.5 rounded-lg border border-brand-100 text-brand-600 text-xs font-bold hover:bg-brand-50 transition-all duration-300 flex items-center justify-center gap-1 group-hover:gap-2 group-hover:bg-brand-500 group-hover:text-white group-hover:border-brand-500 transform group-hover:scale-105">
          View Repairs <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

const ServiceCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-3 hover:bg-white hover:shadow-lg transition-all duration-300 group transform hover:scale-110 hover:-translate-y-1 cursor-pointer">
    <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center flex-shrink-0 text-brand-600 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
      <Icon size={20} />
    </div>
    <div>
      <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-brand-600 transition-colors">{title}</h4>
      <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors">{desc}</p>
    </div>
  </div>
);

const ReviewCard = ({ name, rating, text, device }: { name: string, rating: number, text: string, device: string }) => (
  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 relative h-full flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:border-brand-200 bg-white/50 backdrop-blur-sm transform hover:-translate-y-2 hover:scale-105">
    <div>
      <div className="flex gap-1 mb-4 text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} fill={i < rating ? "currentColor" : "none"} className="transform hover:scale-125 hover:rotate-12 transition-all duration-300" style={{ transitionDelay: `${i * 50}ms` }} />
        ))}
      </div>
      <p className="text-slate-700 mb-6 italic leading-relaxed">"{text}"</p>
    </div>
    <div className="flex items-center gap-3 mt-auto">
      <div className="w-10 h-10 bg-gradient-to-br from-brand-100 to-brand-200 text-brand-700 rounded-full flex items-center justify-center font-bold text-sm shadow-inner group-hover:scale-110 transition-transform">
        {name.charAt(0)}
      </div>
      <div>
        <p className="font-bold text-slate-900 text-sm">{name}</p>
        <p className="text-slate-500 text-xs flex items-center gap-1">
          <Smartphone size={10} />
          {device}
        </p>
      </div>
    </div>
  </div>
);

export const LandingView: React.FC<LandingViewProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [visibleDevices, setVisibleDevices] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const deviceCards = document.querySelectorAll('[data-device-index]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt((entry.target as HTMLElement).getAttribute('data-device-index') || '0');
            setVisibleDevices((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    deviceCards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const openBookingModal = () => {
    setMobileMenuOpen(false);
    setIsBookingModalOpen(true);
  };

  useEffect(() => {
    if (isBookingModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isBookingModalOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsBookingModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(var(--brand-rgb), 0.3); }
          50% { box-shadow: 0 0 40px rgba(var(--brand-rgb), 0.6); }
        }
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-glow { animation: glow 3s ease-in-out infinite; }
        .animate-pulse-scale { animation: pulse-scale 2s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.6s ease-out; }
        .animate-slide-down { animation: slide-down 0.6s ease-out; }
        .animate-rotate-slow { animation: rotate-slow 20s linear infinite; }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      
      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-100 transform transition-all duration-300" style={{ boxShadow: scrollY > 50 ? '0 10px 30px rgba(0,0,0,0.1)' : 'none' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Enhanced Logo with More Glow */}
<div className="flex items-center gap-2.5 cursor-pointer group animate-slide-down" onClick={() => scrollToSection('hero')}>
  {/* ⭐ MORE GLOWY VERSION */}
  <div className="relative">
    {/* Glow layer behind */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    {/* Main logo container */}
    <div className="relative bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600 text-white p-2.5 rounded-xl shadow-2xl shadow-blue-500/60 group-hover:shadow-blue-400/80 group-hover:animate-glow transition-all duration-300 transform group-hover:scale-110">
      <Smartphone className="w-6 h-6" strokeWidth={2.5} />
    </div>
  </div>
  
  {/* Logo text */}
  <span className="text-2xl font-extrabold text-slate-900 tracking-tighter group-hover:text-blue-600 transition-colors duration-300">
    E<span className="text-blue-600">care</span>
  </span>
</div>

            <div className="hidden md:flex space-x-8">
              {['Services', 'Why Us', 'Reviews'].map((item, i) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="text-slate-600 hover:text-brand-600 font-medium transition-all duration-300 relative group animate-slide-down"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-600 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
              <button 
                onClick={() => onNavigate('about')}
                className="text-slate-600 hover:text-brand-600 font-medium transition-colors relative group animate-slide-down"
                style={{ animationDelay: '300ms' }}
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-600 group-hover:w-full transition-all duration-300"></span>
              </button>
            </div>

            <div className="hidden md:flex animate-slide-down" style={{ animationDelay: '400ms' }}>
              <Button onClick={openBookingModal} size="sm">Book Repair</Button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-900 transition-transform duration-300 hover:scale-110">
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 absolute w-full animate-slide-down">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {['Services', 'Why Us', 'Reviews'].map((item, i) => (
                <button 
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="block w-full text-left px-3 py-3 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition-all duration-300 transform hover:translate-x-2 animate-slide-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  {item}
                </button>
              ))}
              <button 
                onClick={() => { setMobileMenuOpen(false); onNavigate('about'); }}
                className="block w-full text-left px-3 py-3 text-slate-600 font-medium hover:bg-slate-50 rounded-lg transition-all duration-300 transform hover:translate-x-2 animate-slide-up"
                style={{ animationDelay: '150ms' }}
              >
                About
              </button>
              <div className="pt-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
                <Button onClick={openBookingModal} className="w-full">Book Repair</Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 animate-slide-down" role="dialog" aria-modal="true">
          <div 
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity animate-fade-in"
            onClick={() => setIsBookingModalOpen(false)}
          ></div>
          <div className="relative bg-white w-full sm:max-w-2xl max-h-[85dvh] rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden mt-auto sm:mt-0 transform transition-all duration-300 animate-slide-up">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 shrink-0 bg-white z-10">
              <h3 className="text-lg font-bold text-slate-900">Book Your Repair</h3>
              <button 
                onClick={() => setIsBookingModalOpen(false)}
                className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 transition-all duration-300 transform hover:scale-110 hover:rotate-90"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="overflow-y-auto overscroll-contain p-0">
              <BookingForm className="!shadow-none !border-none !p-4 sm:!p-8" />
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div id="hero" className="relative pt-20 pb-32 overflow-hidden bg-slate-50">
        <div className="absolute inset-0">
          <img 
           src="/images/hero/Hero.avif"
            alt="Mobile Repair Background" 
            className="w-full h-full object-cover" 
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-slate-50/90 backdrop-blur-[1px]"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-brand-50 text-brand-700 text-sm font-bold mb-6 border border-brand-200 shadow-sm animate-pulse animate-slide-down">
            #1 Trusted Mobile Repair Service
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-8 drop-shadow-sm animate-slide-up" style={{ animationDelay: '200ms' }}>
            Broken Device? <br/>
            <span className="bg-gradient-to-r from-blue-300 via-blue-600 to-slate-600 bg-clip-text text-transparent font-['DM_Sans'] font-extrabold tracking-tighter drop-shadow-lg inline-block">We Fix It Fast.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-700 mb-10 max-w-3xl mx-auto font-medium leading-relaxed font-['Inter'] animate-slide-up" style={{ animationDelay: '400ms' }}>
  Walk in broken. Walk out fixed. <span className="text-slate-900 font-semibold">Genuine parts</span>, <span className="text-slate-900 font-semibold">certified technicians</span>, and <span className="text-slate-900 font-semibold">guaranteed results in hours</span>.
</p>
        </div>
      </div>

      {/* Services Section */}
      <Section id="services" title="Our Expertise" subtitle="We specialize in repairing all major devices with precision and care.">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {[
            {
              title: "Smartphones",
              image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              repairTypes: ["Screen Replacement", "Battery Change", "Charging Port", "Water Damage"]
            },
            {
              title: "Tablets",
              image: "https://images.unsplash.com/photo-1691580438368-a21706a4058a?q=80&w=715&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              repairTypes: ["Display Repair", "Battery Issues", "Button Fixes", "Software"]
            },
            {
              title: "Laptops",
              image: "https://images.unsplash.com/photo-1575024357670-2b5164f470c3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              repairTypes: ["Screen/Hinge", "Keyboard/Trackpad", "Battery/Charging", "Motherboard"]
            },
            {
              title: "Accessories",
              image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              repairTypes: ["Headphone Jack", "Wearables", "Speaker Issues", "Mic Repair"]
            }
          ].map((device, idx) => (
            <div
              key={idx}
              data-device-index={idx}
              className={`transform transition-all duration-700 ${
                visibleDevices.includes(idx)
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-75'
              }`}
              style={{
                transitionDelay: `${visibleDevices.includes(idx) ? idx * 150 : 0}ms`,
              }}
            >
              <DeviceCategoryCard
                title={device.title}
                image={device.image}
                repairTypes={device.repairTypes}
              />
            </div>
          ))}
        </div>

        <div className="text-center mb-10 animate-slide-up">
           <h3 className="text-2xl font-bold text-slate-900 mb-2">Common Repairs</h3>
           <p className="text-slate-600">Everything you need to get back online.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[0, 1, 2, 3, 4, 5].map((idx) => (
            <div key={idx} style={{ animation: `slide-up 0.6s ease-out ${idx * 100 + 400}ms forwards`, opacity: 0 }}>
              {idx === 0 && <ServiceCard icon={Smartphone} title="Screen" desc="Cracked glass & LCD" />}
              {idx === 1 && <ServiceCard icon={Battery} title="Battery" desc="Drainage & Swelling" />}
              {idx === 2 && <ServiceCard icon={Droplets} title="Water" desc="Liquid Damage Fix" />}
              {idx === 3 && <ServiceCard icon={Zap} title="Charging" desc="Port Replacement" />}
              {idx === 4 && <ServiceCard icon={Cpu} title="Software" desc="Unlocking & Bugs" />}
              {idx === 5 && <ServiceCard icon={Camera} title="Camera" desc="Lens & Focus" />}
            </div>
          ))}
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section id="why-us" light title="Why Choose Ecare?" subtitle="We don't just repair; we restore. Here is why thousands trust us.">
        <div className="grid md:grid-cols-4 gap-8">
          {[
            { icon: Clock, title: "Fast Turnaround", desc: "Most repairs completed within 60 minutes at your doorstep." },
            { icon: ShieldCheck, title: "6-Month Warranty", desc: "We stand by our quality with a comprehensive warranty on parts." },
            { icon: Briefcase, title: "Expert Techs", desc: "Certified professionals with years of experience in hardware repair." },
            { icon: Lock, title: "Data Safe", desc: "Your privacy is our priority. We ensure your data remains secure." },
          ].map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-center border border-slate-100 transform hover:scale-105 hover:-translate-y-2 animate-slide-up" style={{ animationDelay: `${i * 150}ms` }}>
              <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-125 transition-transform">
                <feature.icon size={32} className="group-hover:animate-rotate-slow" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-brand-600 transition-colors">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Customer Reviews */}
      <Section id="reviews" title="Customer Stories" subtitle="See what our happy customers have to say.">
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex gap-8 w-max animate-marquee py-4">
            {REVIEWS.map((review, i) => (
              <div key={`r1-${i}`} className="w-[300px] md:w-[400px] flex-shrink-0">
                <ReviewCard {...review} />
              </div>
            ))}
            {REVIEWS.map((review, i) => (
              <div key={`r2-${i}`} className="w-[300px] md:w-[400px] flex-shrink-0">
                <ReviewCard {...review} />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-brand-50 to-brand-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 animate-slide-up">Ready to Fix Your Device?</h2>
          <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
            Don't let a broken device slow you down. Book a repair now and get it fixed today.
          </p>
          <div className="animate-slide-up" style={{ animationDelay: '400ms' }}>
            <Button 
              onClick={openBookingModal}
              size="lg" 
              className="!bg-slate-700 !text-white hover:!bg-slate-800 shadow-lg shadow-slate-600/30 transform hover:scale-110 transition-all duration-300"
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1 animate-slide-up">
              {/* Footer Logo - Same Enhanced Effect as Navbar */}
<div className="flex items-center gap-2.5 mb-6 group">
  {/* ⭐ SAME GLOWY VERSION AS NAVBAR */}
  <div className="relative">
    {/* Glow layer behind */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    {/* Main logo container */}
    <div className="relative bg-gradient-to-br from-blue-400 via-cyan-500 to-blue-600 text-white p-2 rounded-lg shadow-2xl shadow-blue-500/60 group-hover:shadow-blue-400/80 group-hover:animate-glow transition-all duration-300 transform group-hover:scale-110">
      <Smartphone size={20} strokeWidth={2.5} />
    </div>
  </div>
  
  {/* Logo text */}
  <span className="text-xl font-extrabold text-white tracking-tighter group-hover:text-blue-300 transition-colors duration-300">
    E<span className="text-blue-300">care</span>
  </span>
</div>
              <p className="text-sm leading-relaxed mb-6">
                Your trusted partner for mobile and laptop repairs. Fast, reliable, and secure service at your doorstep.
              </p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white transition-all duration-300 transform hover:scale-125 hover:rotate-12"><Instagram size={20} /></a>
                <a href="#" className="hover:text-white transition-all duration-300 transform hover:scale-125 hover:rotate-12"><Facebook size={20} /></a>
                <a href="#" className="hover:text-white transition-all duration-300 transform hover:scale-125 hover:rotate-12"><Twitter size={20} /></a>
              </div>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><button onClick={() => scrollToSection('hero')} className="hover:text-white transition-all duration-300 transform hover:translate-x-2">Home</button></li>
                <li><button onClick={() => onNavigate('about')} className="hover:text-white transition-all duration-300 transform hover:translate-x-2">About Us</button></li>
                <li><button onClick={() => onNavigate('careers')} className="hover:text-white transition-all duration-300 transform hover:translate-x-2">Careers</button></li>
                <li><button onClick={() => onNavigate('privacy')} className="hover:text-white transition-all duration-300 transform hover:translate-x-2">Privacy Policy</button></li>
              </ul>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <h4 className="text-white font-bold mb-6">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                  <Phone size={16} className="mt-1 shrink-0" />
                  <span>+91 (555) 123-4567</span>
                </li>
                <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                  <Mail size={16} className="mt-1 shrink-0" />
                  <span>support@ecare.com</span>
                </li>
                <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                  <MapPin size={16} className="mt-1 shrink-0" />
                  <span>Saheed Nagar, Bhubaneswar, CA 94025</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">&copy; {new Date().getFullYear()} Ecare. All rights reserved.</p>
            <button 
              onClick={() => onNavigate('admin')}
              className="text-xs text-slate-600 hover:text-slate-400 transition-all duration-300 transform hover:scale-110"
            >
              Admin Login
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};