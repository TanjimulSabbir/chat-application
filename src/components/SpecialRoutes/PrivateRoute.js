import { useNavigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const auth = JSON.parse(localStorage.getItem("auth"));

    const navigate = useNavigate();

    if (auth && auth.accessToken && auth.user) {
        return children;
    } else {
        navigate("/");
        return null;
    }

}

export default PrivateRoute;
