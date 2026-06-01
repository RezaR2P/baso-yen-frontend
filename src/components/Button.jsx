const Button = ({ children, variant = 'primary', onClick, className = '' }) => {
  const baseStyle =
    'px-6 py-3 font-bold border-2 border-black shadow-nb hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-nb-sm transition-all duration-150 cursor-pointer';

  const variants = {
    primary: 'bg-primary text-black',
    secondary: 'bg-white text-black',
  };
  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
