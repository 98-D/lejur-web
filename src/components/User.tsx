import { authClient } from "@/lib/auth-client" // import the auth client

export function User(){

    // @ts-ignore
    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession()

    return (
        //...
    )
}