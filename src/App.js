import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Conversation from "./pages/Conversation";
import Inbox from "./pages/Inbox";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import useAuthCheck from "./hooks/useAuthCheck";
import PrivateRoute from "./components/SpecialRoutes/PrivateRoute";
import PublicRoute from "./components/SpecialRoutes/PublicRoute";


function App() {
    const authChecked = useAuthCheck();
    return (
        authChecked ? <Router>
            <Routes>
                <Route path="/" element={<PublicRoute> <Login /></PublicRoute>} />
                <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
                <Route path="/inbox" element={<PrivateRoute><Conversation /></PrivateRoute>} />
                <Route path="/inbox/:id" element={<PrivateRoute><Inbox /></PrivateRoute>} />
            </Routes>
            <Toaster />
        </Router> : <div className="flex items-center justify-center text-green-500 text-2xl min-h-screen">User Authorization checking...</div>
    );
}

export default App;
