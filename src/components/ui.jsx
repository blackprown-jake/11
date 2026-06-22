/*
 * Local re-implementation of the Wanted Design System components used by the
 * FLOFIL landing page (Button, Card, Tag, Divider, TextField, Icon, ImageSlot).
 * Faithfully reproduces the design-system look using the CSS variables defined
 * in src/index.css. No external UI dependency — fully self-contained for deploy.
 */
import { useState } from "react";
import ICONS from "./icon-data";

/* ----------------------------------------------------------------- Icon -- */
export function Icon({ name, size = 20, color, className, style, ...rest }) {
  const ic = ICONS[name];
  if (!ic) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox={ic.viewBox}
      fill="none"
      className={className}
      style={{ color, display: "inline-block", flexShrink: 0, verticalAlign: "middle", ...style }}
      dangerouslySetInnerHTML={{ __html: ic.body }}
      aria-hidden="true"
      {...rest}
    />
  );
}

/* --------------------------------------------------------------- Button -- */
const BTN_SIZES = {
  large: { h: 48, r: 12, px: 28, font: 16, gap: 6, icon: 20 },
  medium: { h: 40, r: 12, px: 20, font: 15, gap: 4, icon: 20 },
  small: { h: 32, r: 8, px: 14, font: 14, gap: 4, icon: 16 },
};

function btnFills(variant, color) {
  if (variant === "solid") {
    if (color === "primary") return { bg: "var(--wt-primary)", fg: "var(--wt-static-white)" };
    if (color === "negative") return { bg: "var(--wt-negative)", fg: "var(--wt-static-white)" };
    return { bg: "var(--wt-fill)", fg: "var(--wt-text)" }; // assistive
  }
  if (variant === "outlined") {
    if (color === "primary") return { bg: "transparent", fg: "var(--wt-primary)", border: "var(--wt-primary)" };
    if (color === "negative") return { bg: "transparent", fg: "var(--wt-negative)", border: "var(--wt-negative)" };
    return { bg: "transparent", fg: "var(--wt-text)", border: "var(--wt-border-solid)" }; // assistive
  }
  if (color === "primary") return { bg: "transparent", fg: "var(--wt-primary)" };
  if (color === "negative") return { bg: "transparent", fg: "var(--wt-negative)" };
  return { bg: "transparent", fg: "var(--wt-text-alt)" }; // text/assistive
}

export function Button({
  children,
  variant = "solid",
  color = "primary",
  size = "medium",
  iconLeft,
  iconRight,
  fullWidth = false,
  disabled = false,
  type = "button",
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const s = BTN_SIZES[size] || BTN_SIZES.medium;
  const f = btnFills(variant, color);
  const solid = variant === "solid" && (color === "primary" || color === "negative");

  let overlay = "transparent";
  if (!disabled) {
    const tone = solid ? "0,0,0" : "112,115,124";
    if (press) overlay = `rgba(${tone},0.12)`;
    else if (hover) overlay = `rgba(${tone},0.06)`;
  }
  const renderIcon = (ic) =>
    ic == null ? null : <Icon name={ic} size={s.icon} />;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: s.gap,
        height: s.h,
        width: fullWidth ? "100%" : undefined,
        padding: `0 ${s.px}px`,
        borderRadius: s.r,
        border: f.border ? `1px solid ${f.border}` : "none",
        background: f.bg,
        color: f.fg,
        fontFamily: "var(--font-sans)",
        fontSize: s.font,
        fontWeight: 600,
        lineHeight: 1.5,
        letterSpacing: "0.006em",
        whiteSpace: "nowrap",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background 120ms cubic-bezier(0.4,0,0.2,1)",
        boxSizing: "border-box",
        outline: "none",
        WebkitTapHighlightColor: "transparent",
        ...style,
      }}
      {...rest}
    >
      {renderIcon(iconLeft)}
      {children != null && <span>{children}</span>}
      {renderIcon(iconRight)}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: s.r,
          background: overlay,
          pointerEvents: "none",
          transition: "background 120ms cubic-bezier(0.4,0,0.2,1)",
        }}
      />
    </button>
  );
}

/* ----------------------------------------------------------------- Card -- */
export function Card({ variant = "elevated", interactive = false, onClick, style, children, ...rest }) {
  const [hover, setHover] = useState(false);
  const base = {
    background: "var(--wt-bg-elevated)",
    borderRadius: 16,
    padding: 24,
    boxSizing: "border-box",
    transition: "box-shadow 160ms cubic-bezier(0.4,0,0.2,1), transform 160ms cubic-bezier(0.4,0,0.2,1)",
  };
  const variantStyle =
    variant === "outlined"
      ? { border: "1px solid var(--wt-border)" }
      : { boxShadow: "0 1px 2px rgba(23,23,25,0.06), 0 8px 24px rgba(23,23,25,0.06)" };
  const hoverStyle =
    interactive && hover
      ? variant === "outlined"
        ? { boxShadow: "0 8px 24px rgba(23,23,25,0.08)" }
        : { boxShadow: "0 2px 4px rgba(23,23,25,0.08), 0 12px 32px rgba(23,23,25,0.10)" }
      : {};
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...base,
        ...variantStyle,
        ...hoverStyle,
        cursor: interactive ? "pointer" : "default",
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ Tag -- */
const TAG_TONES = {
  neutral: { fg: "var(--wt-text-alt)", bg: "var(--wt-fill)" },
  primary: { fg: "var(--wt-primary)", bg: "var(--wt-primary-bg)" },
  violet: { fg: "var(--wt-accent-violet)", bg: "var(--wt-accent-violet-bg)" },
  cyan: { fg: "var(--wt-accent-cyan)", bg: "var(--wt-accent-cyan-bg)" },
};

export function Tag({ children, label, tone = "neutral", style, ...rest }) {
  const t = TAG_TONES[tone] || TAG_TONES.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: 24,
        padding: "0 7px",
        borderRadius: 6,
        boxSizing: "border-box",
        fontFamily: "var(--font-sans)",
        fontSize: 12,
        fontWeight: 600,
        lineHeight: 1,
        whiteSpace: "nowrap",
        background: t.bg,
        color: t.fg,
        ...style,
      }}
      {...rest}
    >
      {label != null ? label : children}
    </span>
  );
}

/* -------------------------------------------------------------- Divider -- */
export function Divider({ thick = false, style }) {
  return (
    <div
      role="separator"
      style={{
        height: thick ? 8 : 1,
        background: thick ? "var(--wt-fill)" : "var(--wt-border)",
        border: "none",
        width: "100%",
        ...style,
      }}
    />
  );
}

/* ------------------------------------------------------------ TextField -- */
const TF_SIZES = { large: 48, medium: 40 };

export function TextField({
  label,
  value,
  placeholder,
  error,
  size = "large",
  leadingIcon,
  disabled = false,
  type = "text",
  onChange,
  style,
  ...rest
}) {
  const [focus, setFocus] = useState(false);
  const h = TF_SIZES[size] || TF_SIZES.large;
  const borderColor = error ? "var(--wt-negative)" : focus ? "var(--wt-primary)" : "var(--wt-border-solid)";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, fontFamily: "var(--font-sans)", ...style }}>
      {label != null && (
        <label style={{ fontSize: 14, fontWeight: 600, color: "var(--wt-text)" }}>{label}</label>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          height: h,
          padding: "0 14px",
          borderRadius: 12,
          boxSizing: "border-box",
          background: disabled ? "var(--wt-bg-alt)" : "var(--wt-static-white)",
          border: `1.5px solid ${borderColor}`,
          transition: "border-color 120ms cubic-bezier(0.4,0,0.2,1)",
          opacity: disabled ? 0.6 : 1,
        }}
      >
        {leadingIcon && (
          <span style={{ color: "var(--wt-text-assistive)", display: "inline-flex" }}>
            <Icon name={leadingIcon} size={20} />
          </span>
        )}
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1,
            minWidth: 0,
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "var(--font-sans)",
            fontSize: 15,
            color: "var(--wt-text)",
          }}
          {...rest}
        />
      </div>
      {error && (
        <span style={{ fontSize: 13, color: "var(--wt-negative)" }}>{error}</span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------ ImageSlot -- */
/*
 * Lightweight image placeholder. Pass `src` to show a real image (object-fit
 * cover); otherwise renders a dashed placeholder with caption. Swap these for
 * your own <img> / CMS images in production.
 */
export function ImageSlot({ src, alt = "", placeholder = "이미지", fit = "cover", className = "", style }) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={className}
        style={{
          width: "100%",
          height: "100%",
          objectFit: fit,
          objectPosition: "center",
          display: "block",
          ...style,
        }}
      />
    );
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        background: "var(--wt-bg-alt)",
        color: "var(--wt-text-assistive)",
        ...style,
      }}
    >
      <Icon name="document" size={28} />
      <span style={{ fontFamily: "var(--font-sans)", fontSize: 13 }}>{placeholder}</span>
    </div>
  );
}
