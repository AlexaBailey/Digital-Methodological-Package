import { useRouter } from "next/router";
import React, { useEffect } from "react";
const Logout = () => {
    const router = useRouter()

    useEffect(() => {
        localStorage.removeItem("token");
        router.push("/");
    }, []);
    return null;
};

export default Logout;