import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useMemo } from "react";
import Navbar from "../components/Navbar";
import GlassCard from "../components/ui/GlassCard";
import PrimaryButton from "../components/ui/PrimaryButton";
import GradientHeading from "../components/ui/GradientHeading";
import AboutElections from "../components/ui/AboutElections";
import Starfield from "../components/ui/Starfield";
import { Shield, BarChart3, Users, Eye, CheckCircle, TrendingUp, Globe, Sparkles } from "lucide-react";

/**
 * Public Home Page - Cinematic Redesign
 * Features:
 * - Hero section with gradient animated background and illustration
 * - Animated stats counter
 * - Features section with glassmorphism cards (3D tilt)
 * - Scroll reveal animations
 * - Updates section
 * - Login check for "Report Now" button
 */
function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [statsStart, setStatsStart] = useState(false);

  // Trigger animations on mount
  useEffect(() => {
    setIsVisible(true);
    // Start stats counter after a delay
    setTimeout(() => setStatsStart(true), 500);
  }, []);

  // Animated stat values
  const stats = useMemo(() => [
    { value: 2847, label: "Total Reports", icon: Shield, color: "primary" },
    { value: 1234, label: "Resolved", icon: CheckCircle, color: "green" },
    { value: 98, label: "Accuracy %", icon: BarChart3, color: "accent", suffix: "%" },
  ], []);

  // Handle "Report Now" button click
  const handleReportClick = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login?role=citizen");
      return;
    }

    if (user.role === "citizen") {
      navigate("/citizen");
    } else {
      alert("Only citizens can submit reports.");
    }
  };

  // Features data with Lucide icons
  const features = [
    {
      icon: Shield,
      title: t('home.secureReporting'),
      description: t('home.secureReportingDesc'),
      color: 'amber',
    },
    {
      icon: BarChart3,
      title: t('home.realTimeAnalytics'),
      description: t('home.realTimeAnalyticsDesc'),
      color: 'blue',
    },
    {
      icon: Users,
      title: t('home.multiRoleAccess'),
      description: t('home.multiRoleAccessDesc'),
      color: 'purple',
    },
    {
      icon: Eye,
      title: t('home.transparentMonitoring'),
      description: t('home.transparentMonitoringDesc'),
      color: 'green',
    }
  ];

  // Updates data with translations
  const updates = [
    {
      date: "January 15, 2025",
      title: t('home.systemLaunch'),
      description: t('home.systemLaunchDesc')
    },
    {
      date: "January 20, 2025",
      title: t('home.newAnalyticsDashboard'),
      description: t('home.newAnalyticsDashboardDesc')
    },
    {
      date: "January 25, 2025",
      title: t('home.observerPortal'),
      description: t('home.observerPortalDesc')
    }
  ];

  // Format number with comma
  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section with Animated Gradient Background */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
{/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-accent-900/20 to-dark-900 animate-gradient-shift" />
        
        {/* Starfield Background */}
        <Starfield count={120} className="z-0" />
        
        {/* Galaxy Gradient Blobs - Indigo, Violet, Blue, Soft Pink */}
        <div 
          className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-500/15 rounded-full blur-[128px] animate-blob"
          style={{ transform: isVisible ? 'translate(0, 0)' : 'translateX(-50px)', opacity: isVisible ? 1 : 0, transition: 'all 1s ease' }}
        />
        <div 
          className="absolute top-1/3 -right-32 w-96 h-96 bg-violet-500/15 rounded-full blur-[128px] animate-blob animation-delay-2000"
          style={{ transform: isVisible ? 'translate(0, 0)' : 'translateX(50px)', opacity: isVisible ? 1 : 0, transition: 'all 1s ease 0.2s' }}
        />
        <div 
          className="absolute -bottom-32 left-1/3 w-96 h-96 bg-blue-500/15 rounded-full blur-[128px] animate-blob animation-delay-4000"
          style={{ transform: isVisible ? 'translate(0, 0)' : 'translateY(50px)', opacity: isVisible ? 1 : 0, transition: 'all 1s ease 0.4s' }}
        />
        {/* Soft pink accent blob */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[150px] animate-pulse-slow"
          style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 1s ease 0.6s' }}
        />
        
        {/* Radial gradient for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(15,23,42,0.8)_100%)]" />
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Text */}
            <div 
              className={`text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-gray-300">{t('home.secureReporting')}</span>
              </div>
              
<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                {t('home.title')}
                <span className="block mt-2 relative inline-flex items-center">
                  <span className="bg-gradient-to-r from-primary-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                    {t('home.subtitle')}
                  </span>
                  {/* Star sparkle effect */}
                  <Sparkles className="absolute -top-2 -right-6 w-5 h-5 text-amber-300/60 animate-sparkle" />
                  <Sparkles className="absolute -bottom-1 -left-4 w-3 h-3 text-primary-300/50 animate-sparkle" style={{ animationDelay: '1s' }} />
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0">
                {t('home.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <PrimaryButton 
                  onClick={handleReportClick}
                  size="lg"
                  icon={CheckCircle}
                >
                  {t('home.reportNow')}
                </PrimaryButton>
                
                {/* Auth Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <PrimaryButton 
                    variant="outline"
                    size="md"
                    onClick={() => navigate('/login')}
                    className="border-white/20 hover:border-white/40"
                  >
                    Login
                  </PrimaryButton>
                  <PrimaryButton 
                    size="md"
                    onClick={() => navigate('/signup')}
                  >
                    Sign Up
                  </PrimaryButton>
                </div>

                <PrimaryButton 
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/about')}
                  className="hidden lg:flex"
                >
                  Learn More
                </PrimaryButton>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex items-center justify-center lg:justify-start gap-8">
                <div className="flex items-center gap-2 text-gray-400">
                  <Globe className="w-5 h-5" />
                  <span className="text-sm">Global Coverage</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm">Real-time Updates</span>
                </div>
              </div>
            </div>

            {/* Hero Illustration */}
            <div 
              className={`relative hidden lg:block transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="relative">
                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-layered">
                  {/* Dashboard Preview */}
                  <div className="space-y-4">
                    {/* Stats Row with Animated Counters */}
                    <div className="grid grid-cols-3 gap-4">
                      {stats.map((stat, index) => (
                        <div 
                          key={index}
                          className="bg-dark-800/50 rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-all duration-300"
                        >
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                            stat.color === 'primary' ? 'bg-primary-500/20 text-primary-500' :
                            stat.color === 'green' ? 'bg-green-500/20 text-green-500' :
                            'bg-accent-500/20 text-accent-500'
                          }`}>
                            <stat.icon className="w-5 h-5" />
                          </div>
                          <p className="text-2xl font-bold text-white">
                            {statsStart ? formatNumber(stat.value) : '0'}
                            {stat.suffix || ''}
                          </p>
                          <p className="text-xs text-gray-400">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                    
                    {/* Chart Placeholder */}
                    <div className="bg-dark-800/50 rounded-2xl p-6 border border-white/5">
                      <div className="flex items-end gap-2 h-24">
                        {[40, 65, 45, 80, 55, 70, 90].map((height, i) => (
                          <div 
                            key={i}
                            className="flex-1 bg-gradient-to-t from-accent-600 to-accent-400 rounded-t-lg transition-all duration-500"
                            style={{ 
                              height: `${height}%`,
                              animationDelay: `${i * 100}ms`
                            }}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span>Mon</span>
                        <span>Tue</span>
                        <span>Wed</span>
                        <span>Thu</span>
                        <span>Fri</span>
                        <span>Sat</span>
                        <span>Sun</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements with Notifications */}
                <div 
                  className="absolute -top-4 -right-4 bg-dark-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 animate-float"
                  style={{ animationDelay: '0s' }}
                >
                  <div className="flex items-center gap-3 animate-notification-in">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">Report Verified</p>
                      <p className="text-xs text-gray-400">Just now</p>
                    </div>
                  </div>
                </div>

                <div 
                  className="absolute -bottom-4 -left-4 bg-dark-800/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 animate-float"
                  style={{ animationDelay: '2s' }}
                >
                  <div className="flex items-center gap-3 animate-notification-in" style={{ animationDelay: '0.2s' }}>
                    <div className="w-10 h-10 rounded-full bg-accent-500/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-accent-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">500+ Observers</p>
                      <p className="text-xs text-gray-400">Active now</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-gray-400 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* About Elections Section */}
      <AboutElections />

      {/* Features Section with Glassmorphism */}
      <section className="py-24 px-4 bg-dark-900/50 relative"> 
        {/* Background decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl">
          <div className="absolute inset-0 bg-gradient-to-b from-accent-500/5 to-transparent blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div 
            className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '0.2s' }}
          >
            <GradientHeading as="h2" gradient="indigo" className="mb-4">
              {t('home.keyFeatures')}
            </GradientHeading>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t('home.featuresSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
              >
                <GlassCard 
                  glowColor={feature.color}
                  className="p-6"
                  tilt={true}
                  shimmer={true}
                >
                  <div className={`
                    w-14 h-14 rounded-2xl flex items-center justify-center mb-4
                    ${feature.color === 'amber' ? 'bg-primary-500/20 text-primary-500' : ''}
                    ${feature.color === 'blue' ? 'bg-accent-500/20 text-accent-500' : ''}
                    ${feature.color === 'purple' ? 'bg-purple-500/20 text-purple-500' : ''}
                    ${feature.color === 'green' ? 'bg-green-500/20 text-green-500' : ''}
                  `}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 bg-dark-900/50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div 
            className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <GradientHeading as="h2" gradient="amber" className="mb-4">
              How It Works
            </GradientHeading>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection Line (desktop) */}
            <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-primary-500 via-accent-500 to-purple-500" />

            {[
              {
                step: '01',
                title: 'Create Account',
                description: 'Sign up as a citizen, observer, or analyst to access the platform.',
                icon: Users,
              },
              {
                step: '02',
                title: 'Submit Report',
                description: 'Document and submit election irregularities with photos and details.',
                icon: Shield,
              },
              {
                step: '03',
                title: 'Track Progress',
                description: 'Monitor your reports and see real-time updates on resolutions.',
                icon: BarChart3,
              }
            ].map((item, index) => (
              <div
                key={index}
                className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${0.2 + index * 0.15}s` }}
              >
                <GlassCard className="p-8 text-center" tilt={true} shimmer={index === 1}>
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="text-5xl font-bold text-primary-500/20">{item.step}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-primary-500" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Updates Section */}
      <section className="py-24 px-4 bg-dark-950 relative">
        <div className="max-w-7xl mx-auto">
          <div 
            className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '0.5s' }}
          >
            <GradientHeading as="h2" gradient="amber" className="mb-4">
              {t('home.recentUpdates')}
            </GradientHeading>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t('home.updatesSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {updates.map((update, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${0.6 + index * 0.1}s` }}
              >
                <GlassCard key={index} className="p-6" hover={true} tilt={true}>
                  <div className="flex items-center gap-2 text-primary-500 text-sm font-medium mb-3">
                    <span className="w-2 h-2 rounded-full bg-primary-500" />
                    {update.date}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {update.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {update.description}
                  </p>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-900/20 via-purple-900/20 to-primary-900/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />
        
        <div 
          className={`relative max-w-4xl mx-auto text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: '0.8s' }}
        >
          <GradientHeading as="h2" gradient="white" className="mb-6">
            Ready to Make a Difference?
          </GradientHeading>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of citizens and observers working together to ensure fair and transparent elections.
          </p>
          <PrimaryButton size="lg" onClick={handleReportClick}>
            {t('home.reportNow')}
          </PrimaryButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10 bg-dark-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-orange-500 flex items-center justify-center">
                <Shield className="w-5 h-5 text-gray-900" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">{t('common.appName')}</p>
                <p className="text-xs text-gray-400">Election Monitoring System</p>
              </div>
            </div>
            
            <div className="flex items-center gap-8 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>

            <p className="text-sm text-gray-500">
              {t('home.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
