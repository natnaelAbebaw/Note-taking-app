export default function Icon({ icon, className, style }) {
  return (
    <svg className={`icon ${className}`} style={style}>
      <use href={`${icon}`}></use>
    </svg>
  );
}
