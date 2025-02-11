'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import CourseList from '../../components/panel/courses/CourseList';
import CourseForm from '../../components/panel/courses/CourseForm';
import CourseDetails from '../../components/panel/courses/CourseDetails';
import CourseStats from '../../components/panel/courses/CourseStats';
import LessonForm from '../../components/panel/courses/LessonForm';
import LessonDetails from '../../components/panel/courses/LessonDetails';
import AssignmentDetails from '../../components/panel/courses/AssignmentDetails';
import QRCodeGenerator from '../../components/panel/courses/QRCodeGenerator';

export interface Course {
	id: number;
	title: string;
	description: string;
	banner_link: string;
	start_date: string;
	end_date: string;
	lessons: Lesson[];
	is_archive: boolean;
}

export interface Lesson {
	id: number;
	course_id: number;
	title: string;
	description: string;
	date: string;
	is_archive: boolean;
}

export interface Assignment {
	id: number;
	lessonId: number;
	title: string;
	description: string;
	dueDate: string;
	isArchived: boolean;
}

export default function CoursesPage() {
	const { token } = useAuth();
	const [courses, setCourses] = useState<Course[]>([]);
	const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
	const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
	const [selectedAssignment] = useState<Assignment | null>(null);
	const [isCreatingCourse, setIsCreatingCourse] = useState(false);
	const [isCreatingLesson, setIsCreatingLesson] = useState(false);
	const [showStats, setShowStats] = useState(false);
	const [showQRCode, setShowQRCode] = useState(false);

	useEffect(() => {
		fetchCourses();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const fetchCourses = async () => {
		try {
			const response = await fetch('https://regami.ru/backend/course', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (!response.ok) throw new Error('Failed to fetch courses');
			const data = await response.json();
			setCourses(data);
		} catch (error) {
			console.error('Error fetching courses:', error);
		}
	};

	const handleCreateCourse = async (
		newCourse: Omit<Course, 'id' | 'is_archive' | 'lessons'>,
	) => {
		try {
			const response = await fetch('https://regami.ru/backend/course', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
				body: JSON.stringify([newCourse]),
			});
			if (!response.ok) throw new Error('Failed to create course');
			const createdCourses = await response.json();
			setCourses([...courses, ...createdCourses]);
			setIsCreatingCourse(false);
		} catch (error) {
			console.error('Error creating course:', error);
		}
	};

	const handleUpdateCourse = async (updatedCourse: Course) => {
		try {
			const response = await fetch(
				`https://regami.ru/backend/course/${updatedCourse.id}`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`,
					},
					body: JSON.stringify(updatedCourse),
				},
			);
			if (!response.ok) throw new Error('Failed to update course');
			await response.json();
			setCourses(
				courses.map(course =>
					course.id === updatedCourse.id ? updatedCourse : course,
				),
			);
			setSelectedCourse(updatedCourse);
		} catch (error) {
			console.error('Error updating course:', error);
		}
	};

	const handleArchiveCourse = async (courseId: number) => {
		try {
			const response = await fetch(
				`https://regami.ru/backend/course/${courseId}`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`,
					},
					body: JSON.stringify({ is_archive: true }),
				},
			);
			if (!response.ok) throw new Error('Failed to archive course');
			await response.json();
			setCourses(
				courses.map(course =>
					course.id === courseId
						? { ...course, is_archive: true }
						: course,
				),
			);
			setSelectedCourse(null);
		} catch (error) {
			console.error('Error archiving course:', error);
		}
	};

	const handleCreateLesson = async (
		newLesson: Omit<Lesson, 'id' | 'is_archive'>,
	) => {
		if (!selectedCourse) return;
		try {
			const response = await fetch(
				`https://regami.ru/backend/course/${selectedCourse.id}/lesson`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`,
					},
					body: JSON.stringify([newLesson]),
				},
			);
			if (!response.ok) throw new Error('Failed to create lesson');
			const createdLessons = await response.json();
			const updatedCourse = {
				...selectedCourse,
				lessons: [...selectedCourse.lessons, ...createdLessons],
			};
			setCourses(
				courses.map(course =>
					course.id === selectedCourse.id ? updatedCourse : course,
				),
			);
			setSelectedCourse(updatedCourse);
			setIsCreatingLesson(false);
		} catch (error) {
			console.error('Error creating lesson:', error);
		}
	};

	const handleUpdateLesson = async (updatedLesson: Lesson) => {
		if (!selectedCourse) return;
		try {
			const response = await fetch(
				`https://regami.ru/backend/course/${selectedCourse.id}/lesson/${updatedLesson.id}`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`,
					},
					body: JSON.stringify(updatedLesson),
				},
			);
			if (!response.ok) throw new Error('Failed to update lesson');
			await response.json();
			const updatedCourse = {
				...selectedCourse,
				lessons: selectedCourse.lessons.map(lesson =>
					lesson.id === updatedLesson.id ? updatedLesson : lesson,
				),
			};
			setCourses(
				courses.map(course =>
					course.id === selectedCourse.id ? updatedCourse : course,
				),
			);
			setSelectedCourse(updatedCourse);
			setSelectedLesson(updatedLesson);
		} catch (error) {
			console.error('Error updating lesson:', error);
		}
	};

	const handleArchiveLesson = async (lessonId: number) => {
		if (!selectedCourse) return;
		try {
			const response = await fetch(
				`https://regami.ru/backend/course/${selectedCourse.id}/lesson/${lessonId}`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`,
					},
					body: JSON.stringify({ is_archive: true }),
				},
			);
			if (!response.ok) throw new Error('Failed to archive lesson');
			await response.json();
			const updatedCourse = {
				...selectedCourse,
				lessons: selectedCourse.lessons.map(lesson =>
					lesson.id === lessonId
						? { ...lesson, is_archive: true }
						: lesson,
				),
			};
			setCourses(
				courses.map(course =>
					course.id === selectedCourse.id ? updatedCourse : course,
				),
			);
			setSelectedCourse(updatedCourse);
			setSelectedLesson(null);
		} catch (error) {
			console.error('Error archiving lesson:', error);
		}
	};

	const handleSelectLesson = (lesson: Lesson) => {
		setSelectedLesson(lesson);
		setSelectedCourse(null); // Hide course details when a lesson is selected
	};

	return (
		<div className="min-h-screen text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
			<div className="z-10 w-full max-w-7xl">
				<h1 className="text-6xl font-bold mb-12 text-center cyberpunk-glitch">
					<span className="cyberpunk-text" data-text="Курсы">
						Курсы
					</span>
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
					<div className="cyberpunk-form bg-gray-900 p-6 border-2 border-neon-blue shadow-lg shadow-neon-blue/50 max-h-[80vh] overflow-y-auto scrollable-container">
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
								onSelectLesson={handleSelectLesson}
							/>
						) : showStats ? (
							<CourseStats onClose={() => setShowStats(false)} />
						) : selectedLesson ? (
							<LessonDetails
								lesson={selectedLesson}
								onUpdate={handleUpdateLesson}
								onArchive={handleArchiveLesson}
								onGenerateQR={() => setShowQRCode(true)}
								onBack={() => {
									setSelectedLesson(null);
									setSelectedCourse(
										courses.find(
											c =>
												c.id ===
												selectedLesson.course_id,
										) || null,
									);
								}}
							/>
						) : selectedAssignment ? (
							<AssignmentDetails
								assignment={selectedAssignment}
								onArchive={() => {}}
							/>
						) : isCreatingLesson ? (
							<LessonForm
								courseId={selectedCourse!.id}
								onSubmit={handleCreateLesson}
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
