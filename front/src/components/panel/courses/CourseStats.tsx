import type { Course } from '../../../pages/panel/CoursesPage.tsx';

interface CourseStatsProps {
	courses: Course[];
	onClose: () => void;
}

export default function CourseStats({ courses, onClose }: CourseStatsProps) {
	const totalCourses = courses.length;
	const activeCourses = courses.filter(c => !c.isArchived).length;
	const archivedCourses = courses.filter(c => c.isArchived).length;

	return (
		<div className="space-y-6">
			<h2 className="text-3xl font-bold mb-6 cyberpunk-glitch">
				Статистика курсов
			</h2>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Всего курсов:</span>{' '}
				{totalCourses}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">
					Активных курсов:
				</span>{' '}
				{activeCourses}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">
					Архивированных курсов:
				</span>{' '}
				{archivedCourses}
			</p>
			<div className="flex justify-end">
				<button
					onClick={onClose}
					className="cyberpunk-button bg-neon-blue text-black px-6 py-2 text-xl hover:bg-blue-400 transition duration-300"
				>
					Закрыть
				</button>
			</div>
		</div>
	);
}
