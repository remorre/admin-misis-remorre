import { useState } from 'react';
import HackathonList from '../../components/panel/hackathons/HackathonList.tsx';
import HackathonForm from '../../components/panel/hackathons/HackathonForm.tsx';
import HackathonDetails from '../../components/panel/hackathons/HackathonDetails.tsx';

export interface Hackathon {
	id: number;
	title: string;
	description: string;
	startDate: string;
	endDate: string;
	location: string;
	maxParticipants: number;
	status: 'upcoming' | 'ongoing' | 'completed';
	isArchived: boolean;
}

const initialHackathons: Hackathon[] = [
	{
		id: 1,
		title: 'Кибер-Инновации 2025',
		description:
			'Хакатон по разработке инновационных решений в области кибербезопасности',
		startDate: '2025-07-15',
		endDate: '2025-07-17',
		location: 'Виртуальная реальность',
		maxParticipants: 200,
		status: 'upcoming',
		isArchived: false,
	},
	{
		id: 2,
		title: 'НейроСеть Будущего',
		description:
			'Создание передовых нейросетевых моделей для предсказания будущего',
		startDate: '2025-09-01',
		endDate: '2025-09-03',
		location: "Технополис 'Москва'",
		maxParticipants: 150,
		status: 'upcoming',
		isArchived: false,
	},
];

export default function HackathonOrganizationPage() {
	const [hackathons, setHackathons] =
		useState<Hackathon[]>(initialHackathons);
	const [selectedHackathon, setSelectedHackathon] =
		useState<Hackathon | null>(null);
	const [isCreating, setIsCreating] = useState(false);

	const handleCreateHackathon = (
		newHackathon: Omit<Hackathon, 'id' | 'isArchived'>,
	) => {
		const hackathon: Hackathon = {
			...newHackathon,
			id: hackathons.length + 1,
			isArchived: false,
		};
		setHackathons([...hackathons, hackathon]);
		setIsCreating(false);
	};

	const handleUpdateHackathon = (updatedHackathon: Hackathon) => {
		setHackathons(
			hackathons.map(hackathon =>
				hackathon.id === updatedHackathon.id
					? updatedHackathon
					: hackathon,
			),
		);
		setSelectedHackathon(updatedHackathon);
	};

	const handleArchiveHackathon = (hackathonId: number) => {
		setHackathons(
			hackathons.map(hackathon =>
				hackathon.id === hackathonId
					? { ...hackathon, isArchived: true }
					: hackathon,
			),
		);
		setSelectedHackathon(null);
	};

	return (
		<div className="min-h-screen  text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
			<div className="z-10 w-full max-w-7xl">
				<h1 className="text-6xl font-bold mb-12 text-center cyberpunk-glitch">
					Организация хакатонов
				</h1>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div className="space-y-8">
						<button
							onClick={() => setIsCreating(true)}
							className="w-full cyberpunk-button bg-neon-blue text-black px-6 py-3 font-bold text-xl hover:bg-blue-400 transition duration-300 transform hover:scale-105"
						>
							Создать хакатон
						</button>
						<HackathonList
							hackathons={hackathons}
							onSelectHackathon={setSelectedHackathon}
							selectedHackathonId={selectedHackathon?.id}
						/>
					</div>
					<div className="cyberpunk-form bg-gray-900 p-6 border-2 border-neon-blue shadow-lg shadow-neon-blue/50">
						{isCreating ? (
							<HackathonForm
								onSubmit={handleCreateHackathon}
								onCancel={() => setIsCreating(false)}
							/>
						) : selectedHackathon ? (
							<HackathonDetails
								hackathon={selectedHackathon}
								onUpdate={handleUpdateHackathon}
								onArchive={handleArchiveHackathon}
							/>
						) : (
							<p className="text-center text-gray-400 text-xl">
								Выберите хакатон или создайте новый
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
