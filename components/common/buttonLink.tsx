import Link from "next/link";

interface ButtonLinkProps {
  type?: "button" | "submit" | "reset";
  className?: string;
  href: string;
  children: React.ReactNode;
}

export default function buttonLink({
  className,
  href,
  children,
}: ButtonLinkProps) {
  return (
    <Link href={href} className={`flex ${className}`}>
      {children}
    </Link>
  );
}
