const BASE_URL = "http://localhost:3000";

export const login = async (email: string, password: string) => {
	const res = await fetch(`${BASE_URL}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});

	const data = await res.json();

	if (data.token) {
		localStorage.setItem("token", data.token);
	}

	return data;
};

export const register = async (email: string, password: string) => {
	const res = await fetch(`${BASE_URL}/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});

	return res.json();
};

export const getToken = () => localStorage.getItem("token");

export const logout = () => {
	localStorage.removeItem("token");
};

export const getUserFromToken = () => {
	const token = localStorage.getItem("token");
	if (!token) return null;

	try {
		const payload = token.split(".")[1];
		return JSON.parse(atob(payload));
	} catch {
		return null;
	}
};
