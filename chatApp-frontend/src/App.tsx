import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WebSocketProvider } from "./components/webSocketServer";
import { Dashboard } from "./pages/dashboard";
import { RoomCreation } from "./pages/roomCreation";

function App() {
  return (
    <WebSocketProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RoomCreation />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </WebSocketProvider>
  );
}

export default App;
