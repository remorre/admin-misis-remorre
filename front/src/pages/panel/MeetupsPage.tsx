import { useState } from 'react';
import MeetupList from '../../components/panel/meetups/MeetupList.tsx';
import MeetupForm from '../../components/panel/meetups/MeetupForm.tsx';
import MeetupDetails from '../../components/panel/meetups/MeetupDetails.tsx';
import MeetupStats from '../../components/panel/meetups/MeetupStats.tsx';
import QRCodeGenerator from '../../components/panel/meetups/QRCodeGenerator.tsx';
import RaffleGenerator from '../../components/panel/meetups/RaffleGenerator.tsx';

export interface Meetup {
	id: number;
	title: string;
	date: string;
	location: string;
	description: string;
	attendees: number;
	isArchived: boolean;
}

const initialMeetups: Meetup[] = [
	{
		id: 1,
		title: 'Cyberpunk Dev Meetup',
		date: '2025-06-15',
		location: 'Neo-Tokyo',
		description:
			'Discussing the latest in cybernetic enhancements for developers',
		attendees: 50,
		isArchived: false,
	},
	{
		id: 2,
		title: 'AI Ethics in 2025',
		date: '2025-07-01',
		location: 'Virtual Reality Hub',
		description: 'Exploring the ethical implications of advanced AI',
		attendees: 75,
		isArchived: false,
	},
	{
		id: 3,
		title: 'Quantum Computing Workshop',
		date: '2025-08-10',
		location: 'Quantum Realm Center',
		description: 'Hands-on workshop with the latest quantum computers',
		attendees: 30,
		isArchived: false,
	},
];

export default function MeetupsPage() {
	const [meetups, setMeetups] = useState<Meetup[]>(initialMeetups);
	const [selectedMeetup, setSelectedMeetup] = useState<Meetup | null>(null);
	const [isCreating, setIsCreating] = useState(false);
	const [showStats, setShowStats] = useState(false);
	const [showQRCode, setShowQRCode] = useState(false);
	const [showRaffle, setShowRaffle] = useState(false);

	const handleCreateMeetup = (
		newMeetup: Omit<Meetup, 'id' | 'attendees' | 'isArchived'>,
	) => {
		const meetup: Meetup = {
			...newMeetup,
			id: meetups.length + 1,
			attendees: 0,
			isArchived: false,
		};
		setMeetups([...meetups, meetup]);
		setIsCreating(false);
	};

	const handleUpdateMeetup = (updatedMeetup: Meetup) => {
		setMeetups(
			meetups.map(meetup =>
				meetup.id === updatedMeetup.id ? updatedMeetup : meetup,
			),
		);
		setSelectedMeetup(null);
	};

	const handleArchiveMeetup = (meetupId: number) => {
		setMeetups(
			meetups.map(meetup =>
				meetup.id === meetupId
					? { ...meetup, isArchived: true }
					: meetup,
			),
		);
		setSelectedMeetup(null);
	};

	return (
		<div className="min-h-screen text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
			<div className="z-10 w-full max-w-6xl">
				<h1 className="text-6xl font-bold mb-12 text-center cyberpunk-glitch">
					Митапы
				</h1>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div className="space-y-8">
						<div className="flex space-x-4">
							<button
								onClick={() => setIsCreating(true)}
								className="flex-1 cyberpunk-button bg-neon-blue text-black px-6 py-3 font-bold text-xl hover:bg-blue-400 transition duration-300 transform hover:scale-105"
							>
								Создать митап
							</button>
							<button
								onClick={() => setShowStats(true)}
								className="flex-1 cyberpunk-button bg-neon-green text-black px-6 py-3 font-bold text-xl hover:bg-green-400 transition duration-300 transform hover:scale-105"
							>
								Статистика
							</button>
						</div>
						<MeetupList
							meetups={meetups}
							onSelectMeetup={setSelectedMeetup}
							selectedMeetupId={selectedMeetup?.id}
						/>
					</div>
					<div className="cyberpunk-form bg-gray-900 p-6 border-2 border-neon-blue shadow-lg shadow-neon-blue/50">
						{isCreating ? (
							<MeetupForm
								onSubmit={handleCreateMeetup}
								onCancel={() => setIsCreating(false)}
							/>
						) : selectedMeetup ? (
							<>
								<MeetupDetails
									meetup={selectedMeetup}
									onUpdate={handleUpdateMeetup}
									onArchive={handleArchiveMeetup}
									onGenerateQR={() => setShowQRCode(true)}
									onGenerateRaffle={() => setShowRaffle(true)}
								/>
								<QRCodeGenerator
									meetup={selectedMeetup}
									onClose={() => setShowQRCode(false)}
								/>
								<RaffleGenerator
									meetup={selectedMeetup}
									onClose={() => setShowRaffle(false)}
								/>
							</>
						) : // Это тест
						showStats ? (
							<MeetupStats
								meetups={meetups}
								onClose={() => setShowStats(false)}
							/>
						) : showQRCode && selectedMeetup ? (
							<QRCodeGenerator
								meetup={selectedMeetup}
								onClose={() => setShowQRCode(false)}
							/>
						) : showRaffle && selectedMeetup ? (
							<RaffleGenerator
								meetup={selectedMeetup}
								onClose={() => setShowRaffle(false)}
							/>
						) : (
							<p className="text-center text-gray-400 text-xl">
								Выберите митап или создайте новый
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
