import { useState } from 'react';
import type { Assignment } from '../../../pages/panel/CoursesPage.tsx';

interface AssignmentDetailsProps {
	assignment: Assignment;
	onUpdate: (assignment: Assignment) => void;
	onArchive: (id: number) => void;
}

export default function AssignmentDetails({
	assignment,
	onUpdate,
	onArchive,
}: AssignmentDetailsProps) {
	const [isEditing, setIsEditing] = useState(false);

	// In a real application, you would fetch this data from an API
	const submissionCount = 15;
	const completionRate = 75;

	if (isEditing) {
		// Implement assignment editing form here
		return <div>Editing form (to be implemented)</div>;
	}

	return (
		<div className="space-y-6">
			<h2 className="text-3xl font-bold mb-6 cyberpunk-glitch">
				{assignment.title}
			</h2>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Описание:</span>{' '}
				{assignment.description}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Срок сдачи:</span>{' '}
				{new Date(assignment.dueDate).toLocaleDateString('ru-RU')}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Статус:</span>{' '}
				{assignment.isArchived ? 'Архивировано' : 'Активно'}
			</p>
			<div className="mt-8">
				<h3 className="text-2xl font-bold mb-4 cyberpunk-glitch">
					Статистика задания
				</h3>
				<p className="text-xl">
					<span className="font-bold text-neon-blue">
						Количество сдач:
					</span>{' '}
					{submissionCount}
				</p>
				<p className="text-xl">
					<span className="font-bold text-neon-blue">
						Процент выполнения:
					</span>{' '}
					{completionRate}%
				</p>
			</div>
			<div className="flex flex-wrap justify-end space-x-4 space-y-2">
				<button
					onClick={() => setIsEditing(true)}
					className="cyberpunk-button bg-neon-blue text-black px-6 py-2 text-xl hover:bg-blue-400 transition duration-300"
				>
					Редактировать
				</button>
				{!assignment.isArchived && (
					<button
						onClick={() => onArchive(assignment.id)}
						className="cyberpunk-button bg-red-600 text-white px-6 py-2 text-xl hover:bg-red-500 transition duration-300"
					>
						Архивировать
					</button>
				)}
			</div>
		</div>
	);
}
