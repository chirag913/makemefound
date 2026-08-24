"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { trackCtaClick } from "@/lib/analytics";

type CallModalContextValue = {
  isOpen: boolean;
  openModal: (location: string) => void;
  closeModal: () => void;
};

const CallModalContext = createContext<CallModalContextValue | null>(null);

export function CallModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback((location: string) => {
    trackCtaClick(location);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, openModal, closeModal }), [isOpen, openModal, closeModal]);

  return <CallModalContext.Provider value={value}>{children}</CallModalContext.Provider>;
}

export function useCallModal() {
  const ctx = useContext(CallModalContext);
  if (!ctx) {
    throw new Error("useCallModal must be used within CallModalProvider");
  }
  return ctx;
}
