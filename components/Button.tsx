import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium transition-colors duration-200 focus-ring whitespace-nowrap";

const variants = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  secondary:
    "bg-white/[0.04] text-fg border border-border-strong hover:bg-white/[0.08] hover:border-white/20",
};

type ButtonVariant = keyof typeof variants;

type ButtonAsButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  as?: "button";
};

type ButtonAsAnchor = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant;
  as: "a";
};

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export default function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (props.as === "a") {
    const { as, ...anchorProps } = props;
    void as;
    return <a className={classes} {...anchorProps} />;
  }

  const { as, ...buttonProps } = props as ButtonAsButton;
  void as;
  return <button className={classes} {...buttonProps} />;
}
