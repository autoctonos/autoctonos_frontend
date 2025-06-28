import { Link } from "@heroui/link";
import { NavbarPayments } from "@/components/payment_gateway/navbar-payment";

export default function PaymentsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative flex flex-col h-screen">
            <NavbarPayments/>
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
            </footer>
        </div>
    );
}