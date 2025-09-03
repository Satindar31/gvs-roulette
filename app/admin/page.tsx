import { auth } from "@/auth";
import { checkUserAdmin } from "@/hooks/user";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Page() {
    const session = await auth()

    if (!session) {
        redirect("/login")
    }
    const adminResult = await checkUserAdmin(session)

    if (!adminResult || !adminResult.isAdmin) {
        return (
            // Make a cool looking unauthorized page
            <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-lg shadow-md p-8 h-screen">
                <svg className="w-16 h-16 text-red-500 mb-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                    <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2" />
                    <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2" />
                </svg>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Unauthorized</h1>
                <p className="text-gray-600 mb-4 text-center">
                    You do not have permission to access this page.
                </p>
                <Link
                    href="/"
                    className="inline-block px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                    Go Home
                </Link>
            </div>
        )
    }

    return (
        <div>
            <h1>Admin Page</h1>
        </div>
    )
}