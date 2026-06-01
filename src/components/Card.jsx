const Card = ({ children, className }) => {
  const baseStyle = 'bg-white border-2 border-black shadow-nb rounded-lg';
  return <div className={`${baseStyle} ${className}`}>{children}</div>;
};

export default Card;
