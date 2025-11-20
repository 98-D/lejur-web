import { signIn } from "@/lib/auth-client"; // your authClient file from earlier
import {Button} from 'react-aria-components';
import { FcGoogle } from "react-icons/fc";
import {useState} from "react"; // optional icon

export function GoogleSignInButton() {
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            await signIn.social({
                provider: "google",
                // Optional: redirect back to a specific page after login
                callbackURL: "/dashboard",
            });
            // No need to do anything here — Better-Auth will redirect to Google
            // and then back to your app where the cookie will be set automatically
        } catch (error) {
            console.error("Google sign-in failed", error);
            // Optional: show toast/error message
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            onClick={handleGoogleSignIn}
            isDisabled={isLoading}
            className="w-full flex items-center justify-center gap-3"
        >
            {isLoading ? (
                <div className="animate-spin h-5 w-5 border-2 border-gray-300 border-t-transparent rounded-full" />
            ) : (
                <FcGoogle className="w-5 h-5" />
            )}
            {isLoading ? "Redirecting..." : "Continue with Google"}
        </Button>
    );
}