import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  items: { label: string; path?: string }[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <div className="flex items-center gap-2 text-sm text-white/60">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.path ? (
            <Link
              to={item.path}
              className="hover:text-[#00FF88] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-white/90">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <ChevronRight size={16} className="text-white/40" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Breadcrumb;
