import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuctionDetailPage from "./pages/AuctionDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateAuctionPage from "./pages/CreateAuction";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/detail/:auctionId" element={<AuctionDetailPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/create" element={<CreateAuctionPage />} />
          <Route path="/update/:auctionId" element={<CreateAuctionPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
