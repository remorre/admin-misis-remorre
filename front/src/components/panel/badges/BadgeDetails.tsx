import { useState } from 'react';
import type { Badge } from '../../../pages/panel/BadgesPage.tsx';
import BadgeForm from './BadgeForm.tsx';

interface BadgeDetailsProps {
	badge: Badge;
	onUpdate: (badge: Badge) => void;
	onArchive: (id: number) => void;
	onAward: () => void;
}

export default function BadgeDetails({
	badge,
	onUpdate,
	onArchive,
	onAward,
}: BadgeDetailsProps) {
	const [isEditing, setIsEditing] = useState(false);

	if (isEditing) {
		return (
			<BadgeForm
				initialData={badge}
				onSubmit={updatedData => {
					onUpdate({ ...badge, ...updatedData });
					setIsEditing(false);
				}}
				onCancel={() => setIsEditing(false)}
			/>
		);
	}

	return (
		<div className="space-y-6">
			<h2 className="text-3xl font-bold mb-6 cyberpunk-glitch">
				{badge.name}
			</h2>
			<div className="flex justify-center mb-6">
				<img
					src={badge.imageUrl || '/placeholder.svg'}
					alt={badge.name}
					className="w-32 h-32 object-cover rounded-full border-4 border-neon-blue"
				/>
			</div>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Описание:</span>{' '}
				{badge.description}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">
					Критерии получения:
				</span>{' '}
				{badge.criteria}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Статус:</span>{' '}
				{badge.isArchived ? 'Архивирована' : 'Активна'}
			</p>
			<div className="flex flex-wrap justify-end space-x-4 space-y-2">
				<button
					onClick={() => setIsEditing(true)}
					className="cyberpunk-button bg-neon-blue text-black px-6 py-2 text-xl hover:bg-blue-400 transition duration-300"
				>
					Редактировать
				</button>
				{!badge.isArchived && (
					<button
						onClick={() => onArchive(badge.id)}
						className="cyberpunk-button bg-red-600 text-white px-6 py-2 text-xl hover:bg-red-500 transition duration-300"
					>
						Архивировать
					</button>
				)}
				<button
					onClick={onAward}
					className="cyberpunk-button bg-neon-green text-black px-6 py-2 text-xl hover:bg-green-400 transition duration-300"
				>
					Вручить ачивку
				</button>
			</div>
		</div>
	);
}
