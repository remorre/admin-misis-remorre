'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Course } from '../../../pages/panel/CoursesPage';

interface CourseListProps {
	courses: Course[];
	onSelectCourse: (course: Course) => void;
	selectedCourseId: number | undefined;
}

const CourseListItem: React.FC<{
	course: Course;
	isSelected: boolean;
	onSelect: () => void;
}> = ({ course, isSelected, onSelect }) => (
	<li
		className={`cursor-pointer p-4 transition duration-300 rounded-lg ${
			isSelected ? 'bg-neon-blue text-black' : 'hover:bg-gray-800'
		} ${course.is_archive ? 'opacity-70' : ''}`}
		onClick={onSelect}
	>
		<div className="flex justify-between items-center">
			<h3 className="text-xl font-bold truncate">{course.title}</h3>
			<span className="text-base font-medium">
				{new Date(course.start_date).toLocaleDateString('ru-RU', {
					day: 'numeric',
					month: 'short',
				})}
			</span>
		</div>
		<div className="text-base text-gray-300 truncate mt-1">
			{course.description}
		</div>
		<div className="text-base mt-1">
			Занятий: {course.lessons ? course.lessons.length : 0}
		</div>
	</li>
);

const CollapsibleSection: React.FC<{
	title: string;
	courses: Course[];
	onSelectCourse: (course: Course) => void;
	selectedCourseId: number | undefined;
}> = ({ title, courses, onSelectCourse, selectedCourseId }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div>
			<div
				className="flex items-center justify-between cursor-pointer"
				onClick={() => setIsExpanded(!isExpanded)}
			>
				<h2 className="text-3xl font-bold cyberpunk-glitch">{title}</h2>
				<button
					className="text-neon-blue hover:text-neon-purple transition-colors duration-300"
					aria-label={isExpanded ? 'Collapse' : 'Expand'}
				>
					{isExpanded ? (
						<ChevronUp className="w-8 h-8" />
					) : (
						<ChevronDown className="w-8 h-8" />
					)}
				</button>
			</div>
			<div
				className={`overflow-hidden transition-all duration-500 ease-in-out ${
					isExpanded
						? 'max-h-[400px] opacity-100'
						: 'max-h-0 opacity-0'
				}`}
			>
				<div className="overflow-y-auto max-h-[400px] pr-2 scrollable-container">
					<ul className="space-y-3 mt-4">
						{courses.map(course => (
							<CourseListItem
								key={course.id}
								course={course}
								isSelected={course.id === selectedCourseId}
								onSelect={() => onSelectCourse(course)}
							/>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default function CourseList({
	courses,
	onSelectCourse,
	selectedCourseId,
}: CourseListProps) {
	const activeCourses = courses.filter(course => !course.is_archive);
	const archivedCourses = courses.filter(course => course.is_archive);

	return (
		<div className="bg-gray-900 p-5 border-2 border-neon-blue shadow-lg shadow-neon-blue/50 rounded-lg space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
			<CollapsibleSection
				title="Активные курсы"
				courses={activeCourses}
				onSelectCourse={onSelectCourse}
				selectedCourseId={selectedCourseId}
			/>
			{archivedCourses.length > 0 && (
				<CollapsibleSection
					title="Архив курсов"
					courses={archivedCourses}
					onSelectCourse={onSelectCourse}
					selectedCourseId={selectedCourseId}
				/>
			)}
		</div>
	);
}
