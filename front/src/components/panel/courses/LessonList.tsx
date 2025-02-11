import type { Lesson } from '../../../pages/panel/CoursesPage';

interface LessonListProps {
	lessons: Lesson[];
	onSelectLesson: (lesson: Lesson) => void;
}

export default function LessonList({
	lessons,
	onSelectLesson,
}: LessonListProps) {
	return (
		<div className="mt-8">
			<h3 className="text-2xl font-bold mb-4 cyberpunk-glitch">
				Занятия
			</h3>
			{lessons.length === 0 ? (
				<p className="text-gray-400">Нет занятий</p>
			) : (
				<ul className="space-y-4">
					{lessons.map(lesson => (
						<li
							key={lesson.id}
							className="cursor-pointer p-4 bg-gray-800 hover:bg-gray-700 transition duration-300"
							onClick={() => onSelectLesson(lesson)}
						>
							<h4 className="text-xl font-bold">
								{lesson.title}
							</h4>
							<p className="text-sm">
								{new Date(lesson.date).toLocaleDateString(
									'ru-RU',
								)}
							</p>
							{lesson.is_archive && (
								<span className="ml-2 text-red-500">
									(Архивировано)
								</span>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
