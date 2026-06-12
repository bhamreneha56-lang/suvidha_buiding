import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const DemoCard = ({
  to,
  title,
  subtitle,
  icon: Icon,
  iconBgClass = 'bg-blue-500',
  leftBadge,
  rightBadge,
  leftBadgeColor = 'bg-green-500',
  rightBadgeColor = 'bg-blue-500',
  features = [],
  bgImage,
}) => {
  const cardStyle = bgImage
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(30, 41, 59, 0.45) 0%, #0b0f19 100%), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};

  return (
    <Link 
      to={to} 
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 min-h-[300px] border border-gray-700/50 hover:border-[var(--color-primary)]"
    >
      <div className="demo-card" style={cardStyle}>
        {/* Top badges */}
        <div className="demo-card-badges">
          {leftBadge && (
            <span className="demo-card-badge">
              <span className={`demo-card-badge-dot ${leftBadgeColor}`} />
              {leftBadge}
            </span>
          )}
          {rightBadge && (
            <span className="demo-card-badge">
              <span className={`demo-card-badge-dot ${rightBadgeColor}`} />
              {rightBadge}
            </span>
          )}
        </div>

        {/* Center Icon Box */}
        <div className={`demo-card-icon-container ${iconBgClass}`}>
          <Icon className="demo-card-icon" size={32} />
        </div>

        {/* Card Body */}
        <div className="demo-card-body">
          <p className="demo-card-subtitle">{subtitle}</p>
          <h3 className="demo-card-title">{title}</h3>
        </div>

        {/* Footer features */}
        {features.length > 0 && (
          <div className="demo-card-footer">
            <div className="demo-card-features">
              {features.map((feature, idx) => (
                <span key={idx} className="demo-card-feature-item">
                  {feature}
                  {idx < features.length - 1 && <span className="demo-card-feature-sep">•</span>}
                </span>
              ))}
            </div>
            <div className="demo-card-arrow-circle">
              <ArrowUpRight size={16} className="demo-card-arrow" />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default DemoCard;
