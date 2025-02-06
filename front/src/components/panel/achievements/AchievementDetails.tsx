import type { Achievement } from '../../../pages/panel/PersonalAchievementsPage.tsx';

interface AchievementDetailsProps {
	achievement: Achievement;
	onStatusChange: (
		achievementId: number,
		newStatus: 'pending' | 'approved' | 'rejected',
	) => void;
}

export default function AchievementDetails({
	achievement,
	onStatusChange,
}: AchievementDetailsProps) {
	return (
		<div className="space-y-6">
			<h2 className="text-3xl font-bold mb-6 cyberpunk-glitch">
				{achievement.title}
			</h2>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Описание:</span>{' '}
				{achievement.description}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Пользователь:</span>{' '}
				{achievement.userName}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Статус:</span>
				{achievement.status === 'pending'
					? 'На рассмотрении'
					: achievement.status === 'approved'
					? 'Одобрено'
					: 'Отклонено'}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Дата подачи:</span>
				{new Date(achievement.submissionDate).toLocaleDateString(
					'ru-RU',
				)}
			</p>
			<div className="flex flex-wrap justify-between items-center mt-8">
				<a
					href={`/profile/${achievement.userId}`}
					className="cyberpunk-button bg-neon-purple text-white px-6 py-2 text-xl hover:bg-purple-400 transition duration-300"
				>
					Профиль пользователя
				</a>
				<div className="space-x-4">
					<button
						onClick={() =>
							onStatusChange(achievement.id, 'approved')
						}
						className={`cyberpunk-button ${
							achievement.status === 'approved'
								? 'bg-green-600 text-white'
								: 'bg-neon-green text-black'
						} px-6 py-2 text-xl hover:bg-green-400 transition duration-300`}
						disabled={achievement.status === 'approved'}
					>
						Одобрить
					</button>
					<button
						onClick={() =>
							onStatusChange(achievement.id, 'rejected')
						}
						className={`cyberpunk-button ${
							achievement.status === 'rejected'
								? 'bg-red-600 text-white'
								: 'bg-red-500 text-white'
						} px-6 py-2 text-xl hover:bg-red-400 transition duration-300`}
						disabled={achievement.status === 'rejected'}
					>
						Отклонить
					</button>
				</div>
			</div>
		</div>
	);
}
