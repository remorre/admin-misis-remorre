import type { Assignment } from '../../../pages/panel/CoursesPage.tsx';

interface AssignmentListProps {
	assignments: Assignment[];
	onSelectAssignment: (assignment: Assignment) => void;
}

export default function AssignmentList({
	assignments,
	onSelectAssignment,
}: AssignmentListProps) {
	return (
		<div className="mt-8">
			<h3 className="text-2xl font-bold mb-4 cyberpunk-glitch">
				Задания
			</h3>
			{assignments.length === 0 ? (
				<p className="text-gray-400">Нет заданий</p>
			) : (
				<ul className="space-y-4">
					{assignments.map(assignment => (
						<li
							key={assignment.id}
							className="cursor-pointer p-4 bg-gray-800 hover:bg-gray-700 transition duration-300"
							onClick={() => onSelectAssignment(assignment)}
						>
							<h4 className="text-xl font-bold">
								{assignment.title}
							</h4>
							<p className="text-sm">
								Срок сдачи:{' '}
								{new Date(
									assignment.dueDate,
								).toLocaleDateString('ru-RU')}
							</p>
							{assignment.isArchived && (
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
