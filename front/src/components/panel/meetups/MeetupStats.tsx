import type { Meetup } from '../../../pages/panel/MeetupsPage.tsx';

interface MeetupStatsProps {
	meetups: Meetup[];
	onClose: () => void;
}

export default function MeetupStats({ meetups, onClose }: MeetupStatsProps) {
	const totalMeetups = meetups.length;
	const activeMeetups = meetups.filter(m => !m.isArchived).length;
	const totalAttendees = meetups.reduce((sum, m) => sum + m.attendees, 0);
	const averageAttendees =
		totalMeetups > 0 ? Math.round(totalAttendees / totalMeetups) : 0;

	return (
		<div className="space-y-6">
			<h2 className="text-3xl font-bold mb-6 cyberpunk-glitch">
				Статистика митапов
			</h2>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Всего митапов:</span>{' '}
				{totalMeetups}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">
					Активных митапов:
				</span>{' '}
				{activeMeetups}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">
					Всего участников:
				</span>{' '}
				{totalAttendees}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">
					Среднее количество участников:
				</span>{' '}
				{averageAttendees}
			</p>
			<div className="flex justify-end">
				<button
					onClick={onClose}
					className="cyberpunk-button bg-neon-blue text-black px-6 py-2 text-xl hover:bg-blue-400 transition duration-300"
				>
					Закрыть
				</button>
			</div>
		</div>
	);
}
