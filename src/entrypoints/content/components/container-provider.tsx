import React, { createContext, useContext } from "react";

interface ContainerContextType {
  container: HTMLElement;
}

const ContainerContext = createContext<ContainerContextType | null>(null);

interface ContainerProviderProps {
  container: HTMLElement;
  children: React.ReactNode;
}

export function ContainerProvider({ container, children }: ContainerProviderProps) {
  return <ContainerContext.Provider value={{ container }}>{children}</ContainerContext.Provider>;
}

export function useContainer() {
  const context = useContext(ContainerContext);
  if (!context) {
    throw new Error("useContainer must be used within a ContainerProvider");
  }
  return context.container;
}
