import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return <button onClick={handleLogout}>Logout</button>;
}
