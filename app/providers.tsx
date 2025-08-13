"use client";

import * as React from "react";
import { HeroUIProvider } from "@heroui/react";
import { useRouter } from "next/navigation";
import AuthProvider from "@/components/session/sessionProvider";
import { CartProvider } from '@/contexts/cart-context';
import { ToastProvider } from "@heroui/react";

export interface ProvidersProps {
  children: React.ReactNode;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children }: ProvidersProps) {
  const router = useRouter();

  return (
    <AuthProvider>
      <HeroUIProvider navigate={router.push}>
      <ToastProvider />
        <CartProvider>
          {children}</CartProvider>
      </HeroUIProvider>
    </AuthProvider>
  );
}
