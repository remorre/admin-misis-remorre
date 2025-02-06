import type React from 'react';
import { useState } from 'react';
import type { Badge } from '../../../pages/panel/BadgesPage.tsx';

interface AwardBadgeFormProps {
	badge: Badge;
	onSubmit: (badgeId: number, userIds: number[]) => void;
	onCancel: () => void;
}

export default function AwardBadgeForm({
	badge,
	onSubmit,
	onCancel,
}: AwardBadgeFormProps) {
	const [userIds, setUserIds] = useState<string>('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const userIdArray = userIds
			.split(',')
			.map(id => Number.parseInt(id.trim()))
			.filter(id => !isNaN(id));
		onSubmit(badge.id, userIdArray);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<h2 className="text-3xl font-bold mb-6 cyberpunk-glitch">
				Вручить ачивку: {badge.name}
			</h2>
			<div>
				<label
					htmlFor="userIds"
					className="block text-lg font-medium text-gray-400 mb-2"
				>
					ID пользователей (через запятую)
				</label>
				<textarea
					id="userIds"
					name="userIds"
					value={userIds}
					onChange={e => setUserIds(e.target.value)}
					required
					rows={4}
					className="w-full cyberpunk-input bg-gray-800 border-2 border-neon-blue text-white px-4 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-neon-blue"
					placeholder="1, 2, 3, 4, 5"
				></textarea>
			</div>
			<div className="flex justify-end space-x-4">
				<button
					type="button"
					onClick={onCancel}
					className="cyberpunk-button bg-gray-700 text-white px-6 py-2 text-xl hover:bg-gray-600 transition duration-300"
				>
					Отмена
				</button>
				<button
					type="submit"
					className="cyberpunk-button bg-neon-green text-black px-6 py-2 text-xl hover:bg-green-400 transition duration-300"
				>
					Вручить
				</button>
			</div>
		</form>
	);
}
