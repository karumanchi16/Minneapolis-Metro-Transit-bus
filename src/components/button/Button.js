import "./Button.css";

const Button = ({
  primary,
  backgroundColor,
  size,
  label,
  disabled,
  ...props
}) => {
  const mode = primary ? "button--primary" : "button--secondary";
  return (
    <button
      type="button"
      className={["button", `button--${size}`, mode].join(" ")}
      style={backgroundColor && { backgroundColor }}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
