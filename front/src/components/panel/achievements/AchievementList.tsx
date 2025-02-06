import type { Achievement } from '../../../pages/panel/PersonalAchievementsPage.tsx';

interface AchievementListProps {
	achievements: Achievement[];
	onSelectAchievement: (achievement: Achievement) => void;
	selectedAchievementId: number | undefined;
}

export default function AchievementList({
	achievements,
	onSelectAchievement,
	selectedAchievementId,
}: AchievementListProps) {
	return (
		<div className="bg-gray-900 p-6 border-2 border-neon-blue shadow-lg shadow-neon-blue/50">
			<h2 className="text-3xl font-bold mb-6 cyberpunk-glitch">
				Список достижений
			</h2>
			{achievements.length === 0 ? (
				<p className="text-gray-400 text-xl">
					Нет достижений, соответствующих фильтрам
				</p>
			) : (
				<ul className="space-y-4">
					{achievements.map(achievement => (
						<li
							key={achievement.id}
							className={`cursor-pointer p-4 transition duration-300 ${
								achievement.id === selectedAchievementId
									? 'bg-neon-blue text-black'
									: 'hover:bg-gray-800'
							}`}
							onClick={() => onSelectAchievement(achievement)}
						>
							<h3 className="text-xl font-bold">
								{achievement.title}
							</h3>
							<p className="text-md">{achievement.userName}</p>
							<p className="text-sm">
								Статус:{' '}
								{achievement.status === 'pending'
									? 'На рассмотрении'
									: achievement.status === 'approved'
									? 'Одобрено'
									: 'Отклонено'}
							</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
