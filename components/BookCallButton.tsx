"use client";

import Button from "./Button";
import { useCallModal } from "./CallModalContext";
import { PRIMARY_CTA } from "@/lib/nav";

/** Every booking CTA opens the same intake form, which posts to the Google Sheet. */
export default function BookCallButton({
  location,
  label = PRIMARY_CTA,
  size = "md",
  variant = "primary",
  className = "",
}: {
  location: string;
  label?: string;
  size?: "md" | "sm";
  variant?: "primary" | "secondary";
  className?: string;
}) {
  const { openModal } = useCallModal();
  return (
    <Button variant={variant} size={size} arrow className={className} onClick={() => openModal(location)}>
      {label}
    </Button>
  );
}
