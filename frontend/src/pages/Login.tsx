import { useState } from "react";
import { login } from "../services/authService";
export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		const res = await login(email, password);

		if (!res.token) {
			setError(res.error || "Login failed");
			return;
		}

		window.location.href = "/";
	};

	return (
		<div style={{ maxWidth: 400, margin: "100px auto" }}>
			<h2>Login</h2>

			<form onSubmit={handleSubmit}>
				<input
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					style={{ width: "100%", padding: 8, marginBottom: 10 }}
				/>

				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					style={{ width: "100%", padding: 8, marginBottom: 10 }}
				/>

				<button type="submit" style={{ width: "100%" }}>
					Login
				</button>
			</form>

			{error && <p style={{ color: "red" }}>{error}</p>}
		</div>
	);
}
