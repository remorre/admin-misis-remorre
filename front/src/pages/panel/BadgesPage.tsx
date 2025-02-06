import { useState } from 'react';
import BadgeList from '../../components/panel/badges/BadgeList.tsx';
import BadgeForm from '../../components/panel/badges/BadgeForm.tsx';
import BadgeDetails from '../../components/panel/badges/BadgeDetails.tsx';
import AwardBadgeForm from '../../components/panel/badges/AwardBadgeForm.tsx';

export interface Badge {
	id: number;
	name: string;
	description: string;
	imageUrl: string;
	criteria: string;
	isArchived: boolean;
}

const initialBadges: Badge[] = [
	{
		id: 1,
		name: 'Кибер-новичок',
		description: 'Получено за первый вход в систему',
		imageUrl: '/badges/cyber-newbie.png',
		criteria: 'Первый вход в систему',
		isArchived: false,
	},
	{
		id: 2,
		name: 'Мастер кода',
		description: 'Завершено 10 проектов',
		imageUrl: '/badges/code-master.png',
		criteria: 'Завершить 10 проектов',
		isArchived: false,
	},
];

export default function BadgesPage() {
	const [badges, setBadges] = useState<Badge[]>(initialBadges);
	const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
	const [isCreating, setIsCreating] = useState(false);
	const [isAwarding, setIsAwarding] = useState(false);

	const handleCreateBadge = (newBadge: Omit<Badge, 'id' | 'isArchived'>) => {
		const badge: Badge = {
			...newBadge,
			id: badges.length + 1,
			isArchived: false,
		};
		setBadges([...badges, badge]);
		setIsCreating(false);
	};

	const handleUpdateBadge = (updatedBadge: Badge) => {
		setBadges(
			badges.map(badge =>
				badge.id === updatedBadge.id ? updatedBadge : badge,
			),
		);
		setSelectedBadge(updatedBadge);
	};

	const handleArchiveBadge = (badgeId: number) => {
		setBadges(
			badges.map(badge =>
				badge.id === badgeId ? { ...badge, isArchived: true } : badge,
			),
		);
		setSelectedBadge(null);
	};

	const handleAwardBadge = (badgeId: number, userIds: number[]) => {
		// In a real application, this would call an API to award the badge to users
		console.log(`Awarding badge ${badgeId} to users:`, userIds);
		setIsAwarding(false);
	};

	return (
		<div className="min-h-screen  text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
			<div className="z-10 w-full max-w-7xl">
				<h1 className="text-6xl font-bold mb-12 text-center cyberpunk-glitch">
					Ачивки
				</h1>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div className="space-y-8">
						<button
							onClick={() => setIsCreating(true)}
							className="w-full cyberpunk-button bg-neon-blue text-black px-6 py-3 font-bold text-xl hover:bg-blue-400 transition duration-300 transform hover:scale-105"
						>
							Создать ачивку
						</button>
						<BadgeList
							badges={badges}
							onSelectBadge={setSelectedBadge}
							selectedBadgeId={selectedBadge?.id}
						/>
					</div>
					<div className="cyberpunk-form bg-gray-900 p-6 border-2 border-neon-blue shadow-lg shadow-neon-blue/50">
						{isCreating ? (
							<BadgeForm
								onSubmit={handleCreateBadge}
								onCancel={() => setIsCreating(false)}
							/>
						) : isAwarding ? (
							<AwardBadgeForm
								badge={selectedBadge!}
								onSubmit={handleAwardBadge}
								onCancel={() => setIsAwarding(false)}
							/>
						) : selectedBadge ? (
							<BadgeDetails
								badge={selectedBadge}
								onUpdate={handleUpdateBadge}
								onArchive={handleArchiveBadge}
								onAward={() => setIsAwarding(true)}
							/>
						) : (
							<p className="text-center text-gray-400 text-xl">
								Выберите ачивку или создайте новую
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
