"use client"
import LogoutButton from "@/components/auth/logoutButton";
import { useSession } from "next-auth/react";

export default function DashboardPage() {

    const { data: session } = useSession();

    return (
        <div>
            <h1>Protected Page</h1>
            <p>You can view this page because you are signed in.</p>
            <h1>Hello World {session?.expires}</h1>
            <LogoutButton />
        </div>
    );
}
