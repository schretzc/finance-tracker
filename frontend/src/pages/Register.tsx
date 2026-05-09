import { useState } from "react";
import { register } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const data = await register(email, password);

			if (data.error) {
				setError(data.error);
				return;
			}

			navigate("/login");
		} catch (err) {
			setError("Something went wrong");
		}
	};

	return (
		<div
			style={{
				maxWidth: "400px",
				margin: "100px auto",
			}}
		>
			<h1>Register</h1>

			<form onSubmit={handleRegister}>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					style={{
						width: "100%",
						marginBottom: "10px",
						padding: "8px",
					}}
				/>

				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					style={{
						width: "100%",
						marginBottom: "10px",
						padding: "8px",
					}}
				/>

				<button type="submit">Register</button>
			</form>

			{error && <p style={{ color: "red" }}>{error}</p>}

			<p>
				Already have an account? <Link to="/login">Login</Link>
			</p>
		</div>
	);
}
