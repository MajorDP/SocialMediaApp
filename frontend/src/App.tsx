import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./components/AppLayout";
import Explore from "./pages/Explore";
import Account from "./pages/Account";
import Auth from "./pages/Auth";
import PostPage from "./pages/Post";
import { AuthProvider } from "./context/UserContext";
import Create from "./pages/CreateEdit";
import User from "./pages/User";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/user" element={<Account />} />
              <Route path="/user/:id" element={<User />} />
              <Route path="/create" element={<Create />} />
              <Route path="/create/:pid" element={<Create />} />
              <Route path="/post/:pid" element={<PostPage />} />
              <Route path="/explore" element={<Explore />} />
            </Route>
          </Route>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
