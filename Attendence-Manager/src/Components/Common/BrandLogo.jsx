import logoWide from "../../assets/attendease-logo-wide.png";
import logoEmblem from "../../assets/attendease-logo-emblem.png";

export default function BrandLogo({
  variant = "emblem",
  className = "",
  alt = "AttendEase logo",
  decorative = false,
}) {
  const src = variant === "wide" ? logoWide : logoEmblem;

  return (
    <img
      src={src}
      alt={decorative ? "" : alt}
      aria-hidden={decorative ? "true" : undefined}
      className={["brand-logo-image", `brand-logo-image-${variant}`, className].filter(Boolean).join(" ")}
    />
  );
}
