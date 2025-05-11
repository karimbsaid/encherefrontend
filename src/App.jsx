import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuctionDetailPage from "./pages/AuctionDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateAuctionPage from "./pages/CreateAuction";
import { AuthProvider } from "./context/authContext";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./pages/ProtectedRoute";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/auctions/:auctionId"
                element={<AuctionDetailPage />}
              />
              <Route path="/auctions/create" element={<CreateAuctionPage />} />
              <Route
                path="/auctions/update/:auctionId"
                element={<CreateAuctionPage />}
              />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
