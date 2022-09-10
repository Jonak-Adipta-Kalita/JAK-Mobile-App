import { useState } from "react";
import { useAuthState as useAuthState_ } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

const useAuthState = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null | undefined>(null);
    const [user, userLoading, userError] = useAuthState_(auth);

    setIsLoading(userLoading);
    setError(userError);

    return { user, isLoading, error };
};

export { useAuthState };
