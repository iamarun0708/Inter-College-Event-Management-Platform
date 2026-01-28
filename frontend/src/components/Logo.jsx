import logo from "../assets/Logos.png";

export default function Logo({ size = "small", onClick }) {
  return (
    <div
      className={`logo-container ${size}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <img src={logo} alt="EVEMAN Logo" />
    </div>
  );
}
