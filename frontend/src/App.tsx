import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./components/AppLayout";
import Explore from "./pages/Explore";
import Account from "./pages/Account";
import Auth from "./pages/Auth";
import PostPage from "./pages/Post";
import { AuthProvider } from "./context/UserContext";
import Create from "./components/CreateEdit";
import User from "./pages/User";
import ProtectedRoute from "./components/ProtectedRoute";
import Intro from "./pages/Intro";
import LanguageSelector from "./components/LanguageSelector";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageSelector />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/user" element={<Account />} />
              <Route path="/user/:id" element={<User />} />
              <Route path="/edit/:pid" element={<Create />} />
              <Route path="/post/:pid" element={<PostPage />} />
              <Route path="/explore" element={<Explore />} />
            </Route>
          </Route>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Intro />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
