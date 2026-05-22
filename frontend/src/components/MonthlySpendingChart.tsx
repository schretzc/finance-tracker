import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	CartesianGrid,
} from "recharts";

interface Props {
	data: {
		month: string;
		total: number;
	}[];
}

export default function MonthlySpendingChart({ data }: Props) {
	if (data.length === 0) {
		return <p style={{ color: "#777" }}>No monthly data</p>;
	}

	return (
		<div
			style={{
				width: "100%",
				height: 300,
				marginBottom: "30px",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<h3>Monthly Spending</h3>

			<ResponsiveContainer>
				<LineChart data={data}>
					<CartesianGrid strokeDasharray="3 3" />

					<XAxis dataKey="month" />

					<YAxis />

					<Tooltip />

					<Line
						type="monotone"
						dataKey="total"
						stroke="#8884d8"
						strokeWidth={3}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
