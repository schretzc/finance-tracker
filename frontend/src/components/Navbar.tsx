import LogoutButton from "./LogoutButton";
import { getUserFromToken } from "../services/authService";

export default function Navbar() {
	const user = getUserFromToken();

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				marginBottom: "20px",
				paddingBottom: "10px",
				borderBottom: "1px solid #ddd",
			}}
		>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<h1 style={{ margin: 0 }}>Finance Tracker</h1>
				<LogoutButton />
			</div>

			{user && (
				<p style={{ margin: "5px 0 0 0", color: "#666" }}>
					Logged in as: {user.email ?? `User #${user.userId}`}
				</p>
			)}
		</div>
	);
}
