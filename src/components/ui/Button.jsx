import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import PropTypes from 'prop-types';

export default function Button({ children, to, variant = 'primary', className, ...props }) {
    const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/30 border border-transparent",
        secondary: "bg-white text-dark hover:bg-gray-100 shadow-md border border-transparent",
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
        ghost: "text-neutral-300 hover:text-primary hover:bg-white/5",
        dark: "bg-dark-lighter text-white hover:bg-dark-darker border border-neutral-800",
    };

    if (to) {
        return (
            <Link
                to={to}
                className={cn(baseStyles, variants[variant], className)}
                {...props}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            className={cn(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    to: PropTypes.string,
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'dark']),
    className: PropTypes.string,
};
