import React from 'react';
import { useTranslation } from 'react-i18next';
import { useScrollRevealGroup } from '../../hooks';
import GlassCard from './GlassCard';
import PrimaryButton from './PrimaryButton';
import { Calendar, ShieldCheck, Zap, Globe, ArrowRight, Heart } from 'lucide-react';
import GradientHeading from './GradientHeading';
import SectionWrapper from './SectionWrapper';

/**
 * AboutElections Component
 * Informative section about Indian elections with 3 cards + image gallery
 * Responsive grid layout with glassmorphism cards matching app theme
 */
function AboutElections() {
  const { t } = useTranslation();
  
  const electionCards = [
    {
      title: 'First General Election (1951–52)',
      description: "India's first post-independence election saw 14 million voters across 489 constituencies, marking the birth of world's largest democracy with 1735 candidates contesting.",
      icon: Calendar,
      glowColor: 'amber',
      image: 'https://images.unsplash.com/photo-1565182587-bff7a965393b?w=400&h=250&fit=crop&crop=center&auto=format',
      badge: 'History'
    },
    {
      title: 'Election Commission of India',
      description: 'Autonomous body est. 1950 under Article 324. Manages elections for Parliament, State Assemblies, President & VP with 1.5M+ personnel.',
      icon: ShieldCheck,
      glowColor: 'blue',
      image: 'https://images.unsplash.com/photo-1564725858899-5b1d4a1e7f0a?w=400&h=250&fit=crop&auto=format',
      badge: 'Authority'
    },
    {
      title: 'Electronic Voting Machines (EVM & VVPAT)',
      description: 'Introduced 1982, nationwide 2004. VVPAT (2013) provides paper trail verification. 100% VVPAT coverage since 2019.',
      icon: Zap,
      glowColor: 'green',
      image: 'https://images.unsplash.com/photo-1614161356719-9fd78b79e1ab?w=400&h=250&fit=crop&auto=format',
      badge: 'Technology'
    },
    {
      title: 'Largest Democracy in the World',
      description: '1.4B population, 968M eligible voters (2024). Conducts elections in 7 phases across 1M+ polling stations in 44 days.',
      icon: Globe,
      glowColor: 'purple',
      image: 'https://images.unsplash.com/photo-1541768311558-63fdfd1a91fe?w=400&h=250&fit=crop&auto=format',
      badge: 'Process'
    },
    {
      title: 'Voting Process in India',
      description: 'Voter ID → Polling Station → EVM/VVPAT → Verification → Secure transmission → Counting → Results. 100% auditable.',
      icon: ArrowRight,
      glowColor: 'indigo',
      image: 'https://images.unsplash.com/photo-1576091160399-1b4a2633bd8e?w=400&h=250&fit=crop&auto=format',
      badge: 'Impact'
    },
    {
      title: 'Importance of Voting',
      description: 'Civic duty strengthens democracy, ensures representation and accountability. Every vote shapes the future of the nation.',
      icon: Heart,
      glowColor: 'pink',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&auto=format',
      badge: 'Impact'
    }
  ];

  const { refs, visibleItems } = useScrollRevealGroup(electionCards.length, 150);

  return (
    <SectionWrapper id="about-elections">
      <div className="text-center mb-16">
        <GradientHeading as="h2" gradient="indigo" className="mb-4 text-4xl md:text-5xl">
          About Elections in India
        </GradientHeading>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Discover the cornerstone of India's vibrant democracy - a remarkable journey of 
          <span className="text-primary-400 font-semibold"> participation, transparency, and technological innovation</span>.
        </p>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">

        {electionCards.map((card, index) => {
          const isVisible = visibleItems.includes(index);
          return (
            <div 
              key={index} 
              ref={refs[index]} 
              className={`
                opacity-0 translate-y-8 transition-all duration-700 ease-out
                ${isVisible ? 'opacity-100 translate-y-0' : ''}
              `}
            >
              <GlassCard
                glowColor={card.glowColor}
                tilt={true}
                shimmer={true}
                className={`overflow-hidden group h-full hover:-translate-y-2 hover:shadow-2xl hover:ring-2 ring-offset-2 ring-offset-dark-900 transition-all duration-300 
                  ${card.glowColor === 'amber' ? 'hover:ring-amber-500/30 ring-amber-400/20' : 
                    card.glowColor === 'blue' ? 'hover:ring-blue-500/30 ring-blue-400/20' : 
                    card.glowColor === 'green' ? 'hover:ring-green-500/30 ring-green-400/20' : 
                    card.glowColor === 'purple' ? 'hover:ring-purple-500/30 ring-purple-400/20' : 
                    card.glowColor === 'indigo' ? 'hover:ring-indigo-500/30 ring-indigo-400/20' : 
                    'hover:ring-pink-500/30 ring-pink-400/20'}`}
              >
                {/* Image */}
                <div className="relative mb-6 aspect-video overflow-hidden rounded-xl group-hover:scale-110 transition-all duration-300 ease-out">
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=250&fit=crop&auto=format';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 ease-out group-hover:opacity-100" />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-primary-500 to-accent-500/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg opacity-100 translate-y-0 group-hover:-translate-y-1 transition-all duration-300">
                    {card.badge}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    card.glowColor === 'amber' ? 'bg-primary-500/20 text-primary-500' :
                    card.glowColor === 'blue' ? 'bg-accent-500/20 text-accent-500' :
                    'bg-green-500/20 text-green-500'
                  }`}>
                    <card.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 leading-tight">{card.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{card.description}</p>
                </div>
              </GlassCard>
            </div>
          );
        })}
      </div>

      {/* CTA Section */}
      <div className="text-center pt-16 pb-8">
        <GradientHeading as="h3" gradient="amber" className="mb-6 text-3xl md:text-4xl">
          Why Your Vote Matters
        </GradientHeading>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          Every vote shapes the future of democracy
        </p>
        <a
          href="https://en.wikipedia.org/wiki/Elections_in_India"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline"
        >
          <PrimaryButton size="lg" className="group">
            Explore More
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </PrimaryButton>
        </a>
      </div>
    </SectionWrapper>
  );
}

export default AboutElections;
