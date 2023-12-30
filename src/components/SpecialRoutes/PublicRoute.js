import { useNavigate } from "react-router-dom";

function PublicRoute({ children }) {
    const auth = JSON.parse(localStorage?.getItem("auth"));

    const navigate = useNavigate();
    if (auth?.accessToken && auth?.user) {
        return navigate("/inbox")
    } else {
        return navigate("/");
    }
}

export default PublicRoute;