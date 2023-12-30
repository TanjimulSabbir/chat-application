import { useNavigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const auth = JSON.parse(localStorage?.getItem("auth"));
    const navigate = useNavigate();
    
    if (auth.accessToken && auth.user) {
        return children;
    } else {
       navigate("/")
    }

}

export default PrivateRoute;