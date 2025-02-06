import type { Meetup } from '../../../pages/panel/MeetupsPage.tsx';

interface MeetupListProps {
	meetups: Meetup[];
	onSelectMeetup: (meetup: Meetup) => void;
	selectedMeetupId: number | undefined;
}

export default function MeetupList({
	meetups,
	onSelectMeetup,
	selectedMeetupId,
}: MeetupListProps) {
	return (
		<div className="bg-gray-900 p-6 border-2 border-neon-blue shadow-lg shadow-neon-blue/50">
			<h2 className="text-3xl font-bold mb-6 cyberpunk-glitch">
				Список митапов
			</h2>
			<ul className="space-y-4">
				{meetups.map(meetup => (
					<li
						key={meetup.id}
						className={`cursor-pointer p-4 transition duration-300 ${
							meetup.id === selectedMeetupId
								? 'bg-neon-blue text-black'
								: 'hover:bg-gray-800'
						} ${meetup.isArchived ? 'opacity-50' : ''}`}
						onClick={() => onSelectMeetup(meetup)}
					>
						<h3 className="text-xl font-bold">{meetup.title}</h3>
						<p className="text-lg">
							{new Date(meetup.date).toLocaleDateString('ru-RU', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</p>
						<p className="text-md">{meetup.location}</p>
						<p className="text-md">
							Участников: {meetup.attendees}
						</p>
						{meetup.isArchived && (
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
