import { useState } from "react";
import { register } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { primaryButtonStyle, inputStyle } from "../constants/styles";

export default function Register() {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();

		setError("");

		// VALIDATION FIRST (before loading)
		if (!email || !password || !confirmPassword) {
			setError("All fields are required");
			return;
		}

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
			setError("All fields are required");
			return;
		}

		setLoading(true);

		try {
			const data = await register(email, password);

			if (data.error) {
				setError(data.error);
				return;
			}

			navigate("/login");
		} catch {
			setError("Something went wrong");
		} finally {
			setLoading(false);
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
					style={inputStyle}
				/>

				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					style={inputStyle}
				/>
				<input
					type="password"
					placeholder="Confirm Password"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					style={inputStyle}
				/>

				<button type="submit" disabled={loading} style={primaryButtonStyle}>
					{loading ? "Creating account..." : "Register"}
				</button>
			</form>

			{error && <p style={{ color: "red" }}>{error}</p>}

			<p>
				Already have an account? <Link to="/login">Login</Link>
			</p>
		</div>
	);
}
