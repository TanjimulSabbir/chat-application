import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
    const auth = JSON.parse(localStorage?.getItem("auth"));

    if (auth?.user && auth?.accessToken) {
        return <Navigate to="/inbox" />
    } else {
        return children;
    }
}

export default PublicRoute;