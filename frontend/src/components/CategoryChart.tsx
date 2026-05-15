import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	CartesianGrid,
} from "recharts";

type Props = {
	data: {
		category: string;
		total: number;
	}[];
};

export default function CategoryChart({ data }: Props) {
	return (
		<div
			style={{
				background: "#fff",
				padding: "16px",
				borderRadius: "12px",
				boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
				marginBottom: "24px",
			}}
		>
			<h3 style={{ marginBottom: "16px" }}>Spending by Category</h3>

			<ResponsiveContainer width="100%" height={300}>
				<BarChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />

					<XAxis dataKey="category" />

					<YAxis />

					<Tooltip />

					<Bar dataKey="total" radius={[6, 6, 0, 0]} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
