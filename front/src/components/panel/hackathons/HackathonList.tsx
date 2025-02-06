import type { Hackathon } from '../../../pages/panel/HackathonOrganizationPage.tsx';

interface HackathonListProps {
	hackathons: Hackathon[];
	onSelectHackathon: (hackathon: Hackathon) => void;
	selectedHackathonId: number | undefined;
}

export default function HackathonList({
	hackathons,
	onSelectHackathon,
	selectedHackathonId,
}: HackathonListProps) {
	return (
		<div className="bg-gray-900 p-6 border-2 border-neon-blue shadow-lg shadow-neon-blue/50">
			<h2 className="text-3xl font-bold mb-6 cyberpunk-glitch">
				Список хакатонов
			</h2>
			<ul className="space-y-4">
				{hackathons.map(hackathon => (
					<li
						key={hackathon.id}
						className={`cursor-pointer p-4 transition duration-300 ${
							hackathon.id === selectedHackathonId
								? 'bg-neon-blue text-black'
								: 'hover:bg-gray-800'
						} ${hackathon.isArchived ? 'opacity-50' : ''}`}
						onClick={() => onSelectHackathon(hackathon)}
					>
						<h3 className="text-xl font-bold">{hackathon.title}</h3>
						<p className="text-md">{hackathon.location}</p>
						<p className="text-sm">
							{new Date(hackathon.startDate).toLocaleDateString(
								'ru-RU',
							)}{' '}
							-{' '}
							{new Date(hackathon.endDate).toLocaleDateString(
								'ru-RU',
							)}
						</p>
						<p className="text-sm">Статус: {hackathon.status}</p>
						{hackathon.isArchived && (
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
