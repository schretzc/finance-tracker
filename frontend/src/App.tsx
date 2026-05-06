import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import FinanceApp from "./FinanceApp";

function App() {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/" element={<FinanceApp />} />
		</Routes>
	);
}

export default App;
