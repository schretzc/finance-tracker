import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { secondaryButtonStyle } from "../constants/styles";

export default function LogoutButton() {
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<button onClick={handleLogout} style={secondaryButtonStyle}>
			Logout
		</button>
	);
}
