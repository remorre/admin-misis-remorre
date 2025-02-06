import { useState } from 'react';
import AchievementList from '../../components/panel/achievements/AchievementList.tsx';
import AchievementDetails from '../../components/panel/achievements/AchievementDetails.tsx';
import AchievementFilters from '../../components/panel/achievements/AchievementFilters.tsx';

export interface Achievement {
	id: number;
	title: string;
	description: string;
	userId: number;
	userName: string;
	status: 'pending' | 'approved' | 'rejected';
	submissionDate: string;
}

const initialAchievements: Achievement[] = [
	{
		id: 1,
		title: 'Создание нейроинтерфейса',
		description:
			'Разработал прототип нейроинтерфейса для управления виртуальной реальностью',
		userId: 101,
		userName: 'Александр Нейромант',
		status: 'pending',
		submissionDate: '2025-03-15',
	},
	{
		id: 2,
		title: 'Взлом корпоративной сети',
		description:
			'Успешно провел этичный взлом и обнаружил уязвимости в сети MegaCorp',
		userId: 102,
		userName: 'Елена Хакер',
		status: 'approved',
		submissionDate: '2025-02-28',
	},
	{
		id: 3,
		title: 'Создание ИИ-помощника',
		description:
			'Разработал персонального ИИ-ассистента с продвинутым машинным обучением',
		userId: 103,
		userName: 'Максим Искусственный',
		status: 'rejected',
		submissionDate: '2025-04-01',
	},
];

export default function PersonalAchievementsPage() {
	const [achievements, setAchievements] =
		useState<Achievement[]>(initialAchievements);
	const [selectedAchievement, setSelectedAchievement] =
		useState<Achievement | null>(null);
	const [filters, setFilters] = useState({ status: 'all', searchTerm: '' });

	const handleFilterChange = (newFilters: {
		status: string;
		searchTerm: string;
	}) => {
		setFilters(newFilters);
	};

	const handleStatusChange = (
		achievementId: number,
		newStatus: 'pending' | 'approved' | 'rejected',
	) => {
		setAchievements(
			achievements.map(achievement =>
				achievement.id === achievementId
					? { ...achievement, status: newStatus }
					: achievement,
			),
		);
		if (selectedAchievement && selectedAchievement.id === achievementId) {
			setSelectedAchievement({
				...selectedAchievement,
				status: newStatus,
			});
		}
	};

	const filteredAchievements = achievements.filter(
		achievement =>
			(filters.status === 'all' ||
				achievement.status === filters.status) &&
			(achievement.title
				.toLowerCase()
				.includes(filters.searchTerm.toLowerCase()) ||
				achievement.userName
					.toLowerCase()
					.includes(filters.searchTerm.toLowerCase())),
	);

	return (
		<div className="min-h-screen  text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
			<div className="z-10 w-full max-w-7xl">
				<h1 className="text-6xl font-bold mb-12 text-center cyberpunk-glitch">
					Личные достижения
				</h1>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div className="space-y-8">
						<AchievementFilters
							onFilterChange={handleFilterChange}
						/>
						<AchievementList
							achievements={filteredAchievements}
							onSelectAchievement={setSelectedAchievement}
							selectedAchievementId={selectedAchievement?.id}
						/>
					</div>
					<div className="cyberpunk-form bg-gray-900 p-6 border-2 border-neon-blue shadow-lg shadow-neon-blue/50">
						{selectedAchievement ? (
							<AchievementDetails
								achievement={selectedAchievement}
								onStatusChange={handleStatusChange}
							/>
						) : (
							<p className="text-center text-gray-400 text-xl">
								Выберите достижение для просмотра деталей
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
