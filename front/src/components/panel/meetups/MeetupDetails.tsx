import { useState } from 'react';
import type { Meetup } from '../../../pages/panel/MeetupsPage.tsx';
import MeetupForm from './MeetupForm';

interface MeetupDetailsProps {
	meetup: Meetup;
	onUpdate: (meetup: Meetup) => void;
	onArchive: (id: number) => void;
	onGenerateQR: () => void;
	onGenerateRaffle: () => void;
}

export default function MeetupDetails({
	meetup,
	onUpdate,
	onArchive,
}: MeetupDetailsProps) {
	const [isEditing, setIsEditing] = useState(false);

	if (isEditing) {
		return (
			<MeetupForm
				initialData={meetup}
				onSubmit={updatedData => {
					onUpdate({ ...meetup, ...updatedData });
					setIsEditing(false);
				}}
				onCancel={() => setIsEditing(false)}
			/>
		);
	}

	return (
		<div className="space-y-6">
			<h2 className="text-3xl font-bold mb-6 cyberpunk-glitch">
				{meetup.title}
			</h2>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Дата:</span>{' '}
				{new Date(meetup.date).toLocaleDateString('ru-RU', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				})}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Место:</span>{' '}
				{meetup.location}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Описание:</span>{' '}
				{meetup.description}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Участников:</span>{' '}
				{meetup.attendees}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Статус:</span>{' '}
				{meetup.isArchived ? 'Архивирован' : 'Активен'}
			</p>
			<div className="flex flex-wrap justify-end space-x-4 space-y-2">
				<button
					onClick={() => setIsEditing(true)}
					className="cyberpunk-button bg-neon-blue text-black px-6 py-2 text-xl hover:bg-blue-400 transition duration-300"
				>
					Редактировать
				</button>
				{!meetup.isArchived && (
					<button
						onClick={() => onArchive(meetup.id)}
						className="cyberpunk-button bg-red-600 text-white px-6 py-2 text-xl hover:bg-red-500 transition duration-300"
					>
						Архивировать
					</button>
				)}
			</div>
		</div>
	);
}
