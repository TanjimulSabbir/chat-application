import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

function useAuthCheck() {
    const [authChecked, setAuthChecked] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        const auth = JSON.parse(localStorage?.getItem("auth"));
        console.log(auth, "auth from localstorage in useAuthCheck")
        if (auth?.accessToken && auth?.user) {
            dispatch(userLoggedIn(auth))

        }

        setAuthChecked(true)

    }, [dispatch])

    return authChecked;
}

export default useAuthCheck;