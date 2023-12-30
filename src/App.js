import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Conversation from "./pages/Conversation";
import Inbox from "./pages/Inbox";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import useAuthCheck from "./hooks/useAuthCheck";

function App() {
    const authChecked = useAuthCheck();
    return (
        authChecked ? <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/inbox" element={<Conversation />} />
                <Route path="/inbox/:id" element={<Inbox />} />
            </Routes>
            <Toaster />
        </Router> : <div className="flex items-center justify-center text-green-500 text-2xl min-h-screen">User Authorization checking...</div>
    );
}

export default App;
