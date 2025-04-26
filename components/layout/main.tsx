import { Link } from "@heroui/link";
import { Navbar } from "../navbar";
import { TwitterIcon } from "../icons";
import { siteConfig } from "@/config/site";
import { Suspense } from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen bg-opacity-10">
            <Suspense fallback={<p className="text-custom-medium-green">Cargando...</p>}>
                <Navbar />
            </Suspense>
            <main className="container mx-auto max-w-7xl px-6 flex-grow">
                {children}
            </main>
            <footer className="w-full flex flex-col items-center justify-center py-3 bg-custom-dark-green text-custom-cream">
                <Link
                    isExternal
                    className="flex items-center gap-1 text-current"
                    href="https://heroui.com?utm_source=next-app-template"
                    title="heroui.com homepage"
                >
                    <span className="text-custom-cream">Powered by</span>
                    <p className="text-custom-light-green">Autóctonos</p>
                </Link>
                <div className="flex items-center gap-1">
                    <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
                        <TwitterIcon className="text-custom-light-green hover:text-custom-cream" />
                    </Link>
                </div>
            </footer>
        </div>
    );
}