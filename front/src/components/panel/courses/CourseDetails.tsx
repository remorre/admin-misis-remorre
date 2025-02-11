'use client';

import { useState } from 'react';
import type { Course, Lesson } from '../../../pages/panel/CoursesPage';
import CourseForm from './CourseForm';
import LessonList from './LessonList';

interface CourseDetailsProps {
	course: Course;
	onUpdate: (course: Course) => void;
	onArchive: (id: number) => void;
	onCreateLesson: () => void;
	onSelectLesson: (lesson: Lesson) => void;
}

export default function CourseDetails({
	course,
	onUpdate,
	onArchive,
	onCreateLesson,
	onSelectLesson,
}: CourseDetailsProps) {
	const [isEditing, setIsEditing] = useState(false);

	if (isEditing) {
		return (
			<CourseForm
				initialData={course}
				onSubmit={updatedData => {
					onUpdate({ ...course, ...updatedData });
					setIsEditing(false);
				}}
				onCancel={() => setIsEditing(false)}
			/>
		);
	}

	return (
		<div className="space-y-6">
			<h2 className="text-3xl font-bold mb-6 cyberpunk-glitch">
				{course.title}
			</h2>
			<img
				src={course.banner_link || '/placeholder.svg'}
				alt={course.title}
				className="w-full h-40 object-cover rounded-lg"
			/>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Статус:</span>{' '}
				{course.is_archive ? 'Архивирован' : 'Активен'}
			</p>
			<div className="flex flex-wrap justify-end space-x-4 space-y-2">
				<button
					onClick={() => setIsEditing(true)}
					className="cyberpunk-button bg-neon-blue text-black px-6 py-2 text-xl hover:bg-blue-400 transition duration-300"
				>
					Редактировать
				</button>
				{!course.is_archive && (
					<button
						onClick={() => onArchive(course.id)}
						className="cyberpunk-button bg-red-600 text-white px-6 py-2 text-xl hover:bg-red-500 transition duration-300"
					>
						Архивировать
					</button>
				)}
				<button
					onClick={onCreateLesson}
					className="cyberpunk-button bg-neon-green text-black px-6 py-2 text-xl hover:bg-green-400 transition duration-300"
				>
					Создать занятие
				</button>
			</div>
			<LessonList
				lessons={course.lessons}
				onSelectLesson={onSelectLesson}
			/>
		</div>
	);
}
