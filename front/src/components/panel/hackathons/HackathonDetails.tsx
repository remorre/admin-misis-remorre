import { useState } from 'react';
import type { Hackathon } from '../../../pages/panel/HackathonOrganizationPage.tsx';
import HackathonForm from './HackathonForm';

interface HackathonDetailsProps {
	hackathon: Hackathon;
	onUpdate: (hackathon: Hackathon) => void;
	onArchive: (id: number) => void;
}

export default function HackathonDetails({
	hackathon,
	onUpdate,
	onArchive,
}: HackathonDetailsProps) {
	const [isEditing, setIsEditing] = useState(false);

	if (isEditing) {
		return (
			<HackathonForm
				initialData={hackathon}
				onSubmit={updatedData => {
					onUpdate({ ...hackathon, ...updatedData });
					setIsEditing(false);
				}}
				onCancel={() => setIsEditing(false)}
			/>
		);
	}

	return (
		<div className="space-y-6">
			<h2 className="text-3xl font-bold mb-6 cyberpunk-glitch">
				{hackathon.title}
			</h2>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Описание:</span>{' '}
				{hackathon.description}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Дата начала:</span>{' '}
				{new Date(hackathon.startDate).toLocaleDateString('ru-RU')}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">
					Дата окончания:
				</span>{' '}
				{new Date(hackathon.endDate).toLocaleDateString('ru-RU')}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">
					Место проведения:
				</span>{' '}
				{hackathon.location}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">
					Максимальное количество участников:
				</span>{' '}
				{hackathon.maxParticipants}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Статус:</span>{' '}
				{hackathon.status}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">
					Статус архивации:
				</span>{' '}
				{hackathon.isArchived ? 'Архивирован' : 'Активен'}
			</p>
			<div className="flex flex-wrap justify-end space-x-4 space-y-2">
				<button
					onClick={() => setIsEditing(true)}
					className="cyberpunk-button bg-neon-blue text-black px-6 py-2 text-xl hover:bg-blue-400 transition duration-300"
				>
					Редактировать
				</button>
				{!hackathon.isArchived && (
					<button
						onClick={() => onArchive(hackathon.id)}
						className="cyberpunk-button bg-red-600 text-white px-6 py-2 text-xl hover:bg-red-500 transition duration-300"
					>
						Архивировать
					</button>
				)}
			</div>
		</div>
	);
}
