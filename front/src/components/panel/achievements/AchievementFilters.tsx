import type React from 'react';
import { useState } from 'react';

interface AchievementFiltersProps {
	onFilterChange: (filters: { status: string; searchTerm: string }) => void;
}

export default function AchievementFilters({
	onFilterChange,
}: AchievementFiltersProps) {
	const [status, setStatus] = useState('all');
	const [searchTerm, setSearchTerm] = useState('');

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newStatus = e.target.value;
		setStatus(newStatus);
		onFilterChange({ status: newStatus, searchTerm });
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newSearchTerm = e.target.value;
		setSearchTerm(newSearchTerm);
		onFilterChange({ status, searchTerm: newSearchTerm });
	};

	return (
		<div className="space-y-4">
			<div>
				<label
					htmlFor="status-filter"
					className="block text-lg font-medium text-gray-400 mb-2"
				>
					Статус
				</label>
				<select
					id="status-filter"
					value={status}
					onChange={handleStatusChange}
					className="w-full cyberpunk-input bg-gray-800 border-2 border-neon-blue text-white px-4 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-neon-blue"
				>
					<option value="all">Все</option>
					<option value="pending">На рассмотрении</option>
					<option value="approved">Одобрено</option>
					<option value="rejected">Отклонено</option>
				</select>
			</div>
			<div>
				<label
					htmlFor="search-filter"
					className="block text-lg font-medium text-gray-400 mb-2"
				>
					Поиск
				</label>
				<input
					id="search-filter"
					type="text"
					value={searchTerm}
					onChange={handleSearchChange}
					placeholder="Поиск по названию или имени"
					className="w-full cyberpunk-input bg-gray-800 border-2 border-neon-blue text-white px-4 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-neon-blue"
				/>
			</div>
		</div>
	);
}
