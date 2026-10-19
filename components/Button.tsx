import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-full text-[0.9375rem] font-medium tracking-[-0.01em] whitespace-nowrap focus-ring transition-[background-color,border-color,color,transform] duration-200 ease-out active:scale-[0.98]";

const variants = {
  // White on charcoal. Violet stays an accent, not a button fill.
  primary: "bg-fg text-bg hover:bg-white",
  secondary: "border border-line-strong text-fg hover:border-line-hover hover:bg-white/[0.03]",
  ghost: "text-fg-muted hover:text-fg",
};

const sizes = {
  md: "h-12 px-6",
  sm: "h-10 px-4 text-sm",
};

type ButtonVariant = keyof typeof variants;
type ButtonSize = keyof typeof sizes;

type Common = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  arrow?: boolean;
  children?: ReactNode;
};

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & Common & { as?: "button" };
type ButtonAsAnchor = AnchorHTMLAttributes<HTMLAnchorElement> & Common & { as: "a" };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`arrow-nudge ${className}`}
    >
      <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Button({
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const content = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  );

  if (props.as === "a") {
    const { as, ...anchorProps } = props;
    void as;
    return (
      <a className={classes} {...anchorProps}>
        {content}
      </a>
    );
  }

  const { as, ...buttonProps } = props as ButtonAsButton;
  void as;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
