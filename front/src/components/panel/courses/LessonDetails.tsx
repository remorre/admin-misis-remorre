'use client';

import { useState } from 'react';
import type { Lesson } from '../../../pages/panel/CoursesPage';
import LessonForm from './LessonForm';

interface LessonDetailsProps {
	lesson: Lesson;
	onUpdate: (lesson: Lesson) => void;
	onArchive: (id: number) => void;
	onGenerateQR: () => void;
	onBack: () => void;
}

export default function LessonDetails({
	lesson,
	onUpdate,
	onArchive,
	onGenerateQR,
	onBack,
}: LessonDetailsProps) {
	const [isEditing, setIsEditing] = useState(false);

	if (isEditing) {
		return (
			<LessonForm
				courseId={lesson.course_id}
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
		<div className="space-y-6 animate-fadeIn">
			<button
				onClick={onBack}
				className="cyberpunk-button bg-gray-700 text-white px-4 py-2 text-lg hover:bg-gray-600 transition duration-300 mb-4"
			>
				← Назад к курсу
			</button>
			<h2 className="text-3xl font-bold mb-6 cyberpunk-glitch">
				<span className="cyberpunk-text" data-text={lesson.title}>
					{lesson.title}
				</span>
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
				{lesson.is_archive ? 'Архивировано' : 'Активно'}
			</p>
			<div className="flex flex-wrap justify-end space-x-4 space-y-2">
				<button
					onClick={() => setIsEditing(true)}
					className="cyberpunk-button bg-neon-blue text-black px-6 py-2 text-xl hover:bg-blue-400 transition duration-300"
				>
					Редактировать
				</button>
				{!lesson.is_archive && (
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
		</div>
	);
}
