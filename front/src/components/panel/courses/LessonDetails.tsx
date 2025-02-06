import { useState } from 'react';
import type { Lesson, Assignment } from '../../../pages/panel/CoursesPage.tsx';
import LessonForm from './LessonForm';
import AssignmentList from './AssignmentList';

interface LessonDetailsProps {
	lesson: Lesson;
	onUpdate: (lesson: Lesson) => void;
	onArchive: (id: number) => void;
	onSelectAssignment: (assignment: Assignment) => void;
	onGenerateQR: () => void;
}

export default function LessonDetails({
	lesson,
	onUpdate,
	onArchive,
	onSelectAssignment,
	onGenerateQR,
}: LessonDetailsProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [assignments, setAssignments] = useState<Assignment[]>([]); // This should be fetched from an API in a real application

	if (isEditing) {
		return (
			<LessonForm
				courseId={lesson.courseId}
				initialData={lesson}
				onSubmit={updatedData => {
					onUpdate({ ...lesson, ...updatedData });
					setIsEditing(false);
				}}
				onCancel={() => setIsEditing(false)}
			/>
		);
	}

	return (
		<div className="space-y-6">
			<h2 className="text-3xl font-bold mb-6 cyberpunk-glitch">
				{lesson.title}
			</h2>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Описание:</span>{' '}
				{lesson.description}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Дата:</span>{' '}
				{new Date(lesson.date).toLocaleDateString('ru-RU')}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Статус:</span>{' '}
				{lesson.isArchived ? 'Архивировано' : 'Активно'}
			</p>
			<div className="flex flex-wrap justify-end space-x-4 space-y-2">
				<button
					onClick={() => setIsEditing(true)}
					className="cyberpunk-button bg-neon-blue text-black px-6 py-2 text-xl hover:bg-blue-400 transition duration-300"
				>
					Редактировать
				</button>
				{!lesson.isArchived && (
					<button
						onClick={() => onArchive(lesson.id)}
						className="cyberpunk-button bg-red-600 text-white px-6 py-2 text-xl hover:bg-red-500 transition duration-300"
					>
						Архивировать
					</button>
				)}
				<button
					onClick={onGenerateQR}
					className="cyberpunk-button bg-neon-green text-black px-6 py-2 text-xl hover:bg-green-400 transition duration-300"
				>
					Генерировать QR-код
				</button>
			</div>
			<AssignmentList
				assignments={assignments}
				onSelectAssignment={onSelectAssignment}
			/>
		</div>
	);
}
