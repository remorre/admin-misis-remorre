import type { Badge } from '../../../pages/panel/BadgesPage.tsx';

interface BadgeListProps {
	badges: Badge[];
	onSelectBadge: (badge: Badge) => void;
	selectedBadgeId: number | undefined;
}

export default function BadgeList({
	badges,
	onSelectBadge,
	selectedBadgeId,
}: BadgeListProps) {
	return (
		<div className="bg-gray-900 p-6 border-2 border-neon-blue shadow-lg shadow-neon-blue/50">
			<h2 className="text-3xl font-bold mb-6 cyberpunk-glitch">
				Список ачивок
			</h2>
			<ul className="space-y-4">
				{badges.map(badge => (
					<li
						key={badge.id}
						className={`cursor-pointer p-4 transition duration-300 ${
							badge.id === selectedBadgeId
								? 'bg-neon-blue text-black'
								: 'hover:bg-gray-800'
						} ${badge.isArchived ? 'opacity-50' : ''}`}
						onClick={() => onSelectBadge(badge)}
					>
						<div className="flex items-center space-x-4">
							<img
								src={badge.imageUrl || '/placeholder.svg'}
								alt={badge.name}
								className="w-12 h-12 object-cover rounded-full"
							/>
							<div>
								<h3 className="text-xl font-bold">
									{badge.name}
								</h3>
								<p className="text-sm">{badge.description}</p>
							</div>
						</div>
						{badge.isArchived && (
							<span className="ml-2 text-red-500">
								(Архивирована)
							</span>
						)}
					</li>
				))}
			</ul>
		</div>
	);
}
