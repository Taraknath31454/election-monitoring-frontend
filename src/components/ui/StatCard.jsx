/**
 * StatCard Component
 * Displays a statistic with an icon, label, and value
 * @param {string} label - The label for the statistic
 * @param {number|string} value - The value to display
 * @param {string} icon - The icon component to display
 * @param {string} color - The color theme (blue, amber, red, green, purple)
 * @param {string} trend - Optional trend indicator
 */
function StatCard({ label, value, icon: Icon, color = 'blue', trend }) {
  const colorClasses = {
    blue: {
      bg: 'bg-accent-500/20',
      text: 'text-accent-500',
      gradient: 'from-accent-500/20 to-transparent',
      glow: 'shadow-glow-blue',
      ring: 'ring-1 ring-accent-500/30',
      gradientBg: 'bg-gradient-to-br from-accent-500/10'
    },
    amber: {
      bg: 'bg-primary-500/20',
      text: 'text-primary-500',
      gradient: 'from-primary-500/20 to-transparent',
      glow: 'shadow-glow-amber',
      ring: 'ring-1 ring-primary-500/30',
      gradientBg: 'bg-gradient-to-br from-primary-500/10'
    },
    red: {
      bg: 'bg-red-500/20',
      text: 'text-red-500',
      gradient: 'from-red-500/20 to-transparent',
      glow: 'shadow-red-500/20',
      ring: 'ring-1 ring-red-500/30',
      gradientBg: 'bg-gradient-to-br from-red-500/10'
    },
    green: {
      bg: 'bg-green-500/20',
      text: 'text-green-500',
      gradient: 'from-green-500/20 to-transparent',
      glow: 'shadow-glow-green',
      ring: 'ring-1 ring-green-500/30',
      gradientBg: 'bg-gradient-to-br from-green-500/10'
    },
    purple: {
      bg: 'bg-purple-500/20',
      text: 'text-purple-500',
      gradient: 'from-purple-500/20 to-transparent',
      glow: 'shadow-glow-purple',
      ring: 'ring-1 ring-purple-500/30',
      gradientBg: 'bg-gradient-to-br from-purple-500/10'
    }
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div className={`
      relative overflow-hidden 
      bg-dark-800/50 backdrop-blur-sm
      p-6 rounded-2xl 
      border border-white/10 
      hover:border-white/20
      transition-all duration-300 group
      hover:scale-[1.02]
      ${colors.glow}
    `}>
      {/* Background gradient effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      {/* Decorative circle */}
      <div className={`absolute -top-8 -right-8 w-24 h-24 ${colors.bg} rounded-full blur-2xl opacity-50`} />
      
      <div className="relative flex items-center gap-4">
        <div className={`
          p-3.5 rounded-2xl 
          ${colors.bg} ${colors.text}
          transition-transform duration-300 
          group-hover:scale-110
          ${colors.ring}
        `}>
          {Icon && <Icon className="w-6 h-6" />}
        </div>
        <div>
          <p className="text-gray-400 text-sm font-medium">{label}</p>
          <div className="flex items-center gap-2">
            <p className="text-3xl font-bold text-white">{value}</p>
            {trend && (
              <span className={`text-xs font-medium ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatCard;
