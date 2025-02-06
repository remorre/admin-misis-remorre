import type { Course } from '../../../pages/panel/CoursesPage.tsx';

interface CourseListProps {
	courses: Course[];
	onSelectCourse: (course: Course) => void;
	selectedCourseId: number | undefined;
}

export default function CourseList({
	courses,
	onSelectCourse,
	selectedCourseId,
}: CourseListProps) {
	return (
		<div className="bg-gray-900 p-6 border-2 border-neon-blue shadow-lg shadow-neon-blue/50">
			<h2 className="text-3xl font-bold mb-6 cyberpunk-glitch">
				Список курсов
			</h2>
			<ul className="space-y-4">
				{courses.map(course => (
					<li
						key={course.id}
						className={`cursor-pointer p-4 transition duration-300 ${
							course.id === selectedCourseId
								? 'bg-neon-blue text-black'
								: 'hover:bg-gray-800'
						} ${course.isArchived ? 'opacity-50' : ''}`}
						onClick={() => onSelectCourse(course)}
					>
						<h3 className="text-xl font-bold">{course.title}</h3>
						<p className="text-md">{course.description}</p>
						<p className="text-sm">
							{new Date(course.startDate).toLocaleDateString(
								'ru-RU',
							)}{' '}
							-{' '}
							{new Date(course.endDate).toLocaleDateString(
								'ru-RU',
							)}
						</p>
						{course.isArchived && (
							<span className="ml-2 text-red-500">
								(Архивирован)
							</span>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}
