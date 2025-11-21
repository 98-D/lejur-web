import { authClient } from "@/lib/auth-client";

export function GoogleSignInButton() {
    const handleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
        });
    };

    return (
        <button
            onClick={handleSignIn}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
        >
            Sign in with Google
        </button>
    );
}