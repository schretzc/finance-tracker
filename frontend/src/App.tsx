import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import FinanceApp from "./FinanceApp";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";

function App() {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />

			<Route
				path="/"
				element={
					<ProtectedRoute>
						<FinanceApp />
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
}

export default App;
