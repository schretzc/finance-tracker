import { useState } from "react";
import { categories } from "../constants/categories";
import { primaryButtonStyle, inputStyle } from "../constants/styles";

interface Props {
	search: string;
	setSearch: (value: string) => void;

	startDate: string;
	setStartDate: (value: string) => void;

	endDate: string;
	setEndDate: (value: string) => void;

	filterCategory: string;
	setFilterCategory: (value: string) => void;

	clearFilters: () => void;
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
	clearFilters,
}: Props) {
	const [open, setOpen] = useState(false);

	return (
		<div style={{ marginBottom: "20px" }}>
			<div style={{ marginBottom: "12px" }}>
				<button
					type="button"
					onClick={() => setOpen(!open)}
					style={primaryButtonStyle}
				>
					Filters {open ? "▲" : "▼"}
				</button>
			</div>

			{open && (
				<div>
					{/* SEARCH */}
					<div style={{ marginBottom: "12px" }}>
						<input
							placeholder="Search expenses..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							style={inputStyle}
						/>
					</div>
					{/* DATE RANGE */}
					<div style={{ marginBottom: "12px" }}>
						<input
							type="date"
							value={startDate}
							onChange={(e) => setStartDate(e.target.value)}
							style={inputStyle}
						/>
					</div>
					<div style={{ marginBottom: "12px" }}>
						<input
							type="date"
							value={endDate}
							onChange={(e) => setEndDate(e.target.value)}
							style={inputStyle}
						/>
					</div>
					{/* CATEGORY */}
					<div style={{ marginBottom: "12px" }}>
						<select
							value={filterCategory}
							onChange={(e) => setFilterCategory(e.target.value)}
							style={inputStyle}
						>
							<option value="">All Categories</option>
							{categories.map((cat) => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</select>
						<div style={{ marginTop: "12px" }}>
							<button
								type="button"
								onClick={clearFilters}
								style={primaryButtonStyle}
							>
								Clear Filters
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
