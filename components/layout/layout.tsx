import { Link } from "@heroui/link";
import { Navbar } from "../navbar";
import { TwitterIcon } from "../icons";
import { siteConfig } from "@/config/site";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex flex-col h-screen bg-gray-100">
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                {children}
            </main>
            <footer className="w-full flex flex-col items-center justify-center py-3">
                <Link
                    isExternal
                    className="flex items-center gap-1 text-current"
                    href="https://heroui.com?utm_source=next-app-template"
                    title="heroui.com homepage"
                >
                    <span className="text-default-600">Powered by</span>
                    <p className="text-primary">Autóctonos</p>
                </Link>
                <div className="flex items-center">
                <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
                    <TwitterIcon className="text-default-500" />
                </Link>
                </div>
            </footer>
        </div>
    );
}