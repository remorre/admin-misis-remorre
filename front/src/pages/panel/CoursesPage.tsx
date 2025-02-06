import { useState } from 'react';
import CourseList from '../../components/panel/courses/CourseList.tsx';
import CourseForm from '../../components/panel/courses/CourseForm.tsx';
import CourseDetails from '../../components/panel/courses/CourseDetails.tsx';
import CourseStats from '../../components/panel/courses/CourseStats.tsx';
import LessonForm from '../../components/panel/courses/LessonForm.tsx';
import LessonDetails from '../../components/panel/courses/LessonDetails.tsx';
import AssignmentDetails from '../../components/panel/courses/AssignmentDetails.tsx';
import QRCodeGenerator from '../../components/panel/courses/QRCodeGenerator.tsx';

export interface Course {
	id: number;
	title: string;
	description: string;
	startDate: string;
	endDate: string;
	isArchived: boolean;
}

export interface Lesson {
	id: number;
	courseId: number;
	title: string;
	description: string;
	date: string;
	isArchived: boolean;
}

export interface Assignment {
	id: number;
	lessonId: number;
	title: string;
	description: string;
	dueDate: string;
	isArchived: boolean;
}

const initialCourses: Course[] = [
	{
		id: 1,
		title: 'Введение в киберпанк',
		description: 'Основы жанра и его влияние на современную культуру',
		startDate: '2025-09-01',
		endDate: '2025-12-15',
		isArchived: false,
	},
	{
		id: 2,
		title: 'Нейроинтерфейсы будущего',
		description:
			'Изучение технологий прямого подключения мозга к компьютеру',
		startDate: '2026-01-10',
		endDate: '2026-05-30',
		isArchived: false,
	},
];

export default function CoursesPage() {
	const [courses, setCourses] = useState<Course[]>(initialCourses);
	const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
	const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
	const [selectedAssignment, setSelectedAssignment] =
		useState<Assignment | null>(null);
	const [isCreatingCourse, setIsCreatingCourse] = useState(false);
	const [isCreatingLesson, setIsCreatingLesson] = useState(false);
	const [showStats, setShowStats] = useState(false);
	const [showQRCode, setShowQRCode] = useState(false);

	const handleCreateCourse = (
		newCourse: Omit<Course, 'id' | 'isArchived'>,
	) => {
		const course: Course = {
			...newCourse,
			id: courses.length + 1,
			isArchived: false,
		};
		setCourses([...courses, course]);
		setIsCreatingCourse(false);
	};

	const handleUpdateCourse = (updatedCourse: Course) => {
		setCourses(
			courses.map(course =>
				course.id === updatedCourse.id ? updatedCourse : course,
			),
		);
		setSelectedCourse(updatedCourse);
	};

	const handleArchiveCourse = (courseId: number) => {
		setCourses(
			courses.map(course =>
				course.id === courseId
					? { ...course, isArchived: true }
					: course,
			),
		);
		setSelectedCourse(null);
	};

	return (
		<div className="min-h-screen  text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
			<div className="z-10 w-full max-w-7xl">
				<h1 className="text-6xl font-bold mb-12 text-center cyberpunk-glitch">
					Курсы
				</h1>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div className="space-y-8">
						<div className="flex space-x-4">
							<button
								onClick={() => setIsCreatingCourse(true)}
								className="flex-1 cyberpunk-button bg-neon-blue text-black px-6 py-3 font-bold text-xl hover:bg-blue-400 transition duration-300 transform hover:scale-105"
							>
								Создать курс
							</button>
							<button
								onClick={() => setShowStats(true)}
								className="flex-1 cyberpunk-button bg-neon-green text-black px-6 py-3 font-bold text-xl hover:bg-green-400 transition duration-300 transform hover:scale-105"
							>
								Статистика
							</button>
						</div>
						<CourseList
							courses={courses}
							onSelectCourse={setSelectedCourse}
							selectedCourseId={selectedCourse?.id}
						/>
					</div>
					<div className="cyberpunk-form bg-gray-900 p-6 border-2 border-neon-blue shadow-lg shadow-neon-blue/50">
						{isCreatingCourse ? (
							<CourseForm
								onSubmit={handleCreateCourse}
								onCancel={() => setIsCreatingCourse(false)}
							/>
						) : selectedCourse ? (
							<CourseDetails
								course={selectedCourse}
								onUpdate={handleUpdateCourse}
								onArchive={handleArchiveCourse}
								onCreateLesson={() => setIsCreatingLesson(true)}
								onSelectLesson={setSelectedLesson}
							/>
						) : showStats ? (
							<CourseStats
								courses={courses}
								onClose={() => setShowStats(false)}
							/>
						) : selectedLesson ? (
							<LessonDetails
								lesson={selectedLesson}
								onUpdate={updatedLesson => {
									// Handle lesson update
								}}
								onArchive={lessonId => {
									// Handle lesson archive
								}}
								onSelectAssignment={setSelectedAssignment}
								onGenerateQR={() => setShowQRCode(true)}
							/>
						) : selectedAssignment ? (
							<AssignmentDetails
								assignment={selectedAssignment}
								onUpdate={updatedAssignment => {
									// Handle assignment update
								}}
								onArchive={assignmentId => {
									// Handle assignment archive
								}}
							/>
						) : isCreatingLesson ? (
							<LessonForm
								courseId={selectedCourse!.id}
								onSubmit={newLesson => {
									// Handle new lesson creation
								}}
								onCancel={() => setIsCreatingLesson(false)}
							/>
						) : showQRCode ? (
							<QRCodeGenerator
								lesson={selectedLesson!}
								onClose={() => setShowQRCode(false)}
							/>
						) : (
							<p className="text-center text-gray-400 text-xl">
								Выберите курс или создайте новый
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
