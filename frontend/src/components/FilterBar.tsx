import { useState } from "react";
import { categories } from "../constants/categories";

interface Props {
	search: string;
	setSearch: (value: string) => void;

	startDate: string;
	setStartDate: (value: string) => void;

	endDate: string;
	setEndDate: (value: string) => void;

	filterCategory: string;
	setFilterCategory: (value: string) => void;
}

export default function FilterBar({
	search,
	setSearch,
	startDate,
	setStartDate,
	endDate,
	setEndDate,
	filterCategory,
	setFilterCategory,
}: Props) {
	const [open, setOpen] = useState(false);

	return (
		<div style={{ marginBottom: "20px" }}>
			<button
				onClick={() => setOpen(!open)}
				style={{
					marginBottom: "10px",
					padding: "8px 12px",
					borderRadius: "6px",
					border: "1px solid #ccc",
					backgroundColor: "#cccccc80",
					cursor: "pointer",
					fontWeight: "bold",
				}}
			>
				Filters {open ? "▲" : "▼"}
			</button>

			{open && (
				<div>
					{/* SEARCH */}
					<input
						placeholder="Search expenses..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						style={{ width: "100%", marginBottom: "10px" }}
					/>

					{/* DATE RANGE */}
					<input
						type="date"
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
						style={{ width: "100%", marginBottom: "10px" }}
					/>

					<input
						type="date"
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
						style={{ width: "100%", marginBottom: "10px" }}
					/>

					{/* CATEGORY */}
					<select
						value={filterCategory}
						onChange={(e) => setFilterCategory(e.target.value)}
						style={{ width: "100%" }}
					>
						<option value="">All Categories</option>
						{categories.map((cat) => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>
				</div>
			)}
		</div>
	);
}
