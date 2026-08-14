"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { trackCtaClick } from "@/lib/analytics";

type AuditModalContextValue = {
  isOpen: boolean;
  openModal: (location: string) => void;
  closeModal: () => void;
};

const AuditModalContext = createContext<AuditModalContextValue | null>(null);

export function AuditModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback((location: string) => {
    trackCtaClick(location);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, openModal, closeModal }), [isOpen, openModal, closeModal]);

  return <AuditModalContext.Provider value={value}>{children}</AuditModalContext.Provider>;
}

export function useAuditModal() {
  const ctx = useContext(AuditModalContext);
  if (!ctx) {
    throw new Error("useAuditModal must be used within AuditModalProvider");
  }
  return ctx;
}
