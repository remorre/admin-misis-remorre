'use client';

import type React from 'react';
import { useState } from 'react';
import type { Meetup } from '../../../pages/panel/MeetupsPage';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface MeetupListProps {
	meetups: Meetup[];
	onSelectMeetup: (meetupId: number) => void;
	selectedMeetupId: number | null;
}

const MeetupListItem: React.FC<{
	meetup: Meetup;
	isSelected: boolean;
	onSelect: () => void;
}> = ({ meetup, isSelected, onSelect }) => (
	<li
		className={`cursor-pointer p-4 transition duration-300 rounded-lg ${
			isSelected ? 'bg-neon-blue text-black' : 'hover:bg-gray-800'
		} ${meetup.is_archive ? 'opacity-70' : ''}`}
		onClick={onSelect}
	>
		<div className="flex justify-between items-center">
			<h3 className="text-xl font-bold truncate">{meetup.title}</h3>
			<span className="text-base font-medium">
				{new Date(meetup.date).toLocaleDateString('ru-RU', {
					day: 'numeric',
					month: 'short',
				})}
			</span>
		</div>
		<div className="text-base text-gray-300 truncate mt-1">
			{meetup.schedule}
		</div>
		<div className="text-base mt-1">
			Участников: {meetup.users ? meetup.users.length : 0}
		</div>
	</li>
);

const CollapsibleSection: React.FC<{
	title: string;
	meetups: Meetup[];
	onSelectMeetup: (meetupId: number) => void;
	selectedMeetupId: number | null;
}> = ({ title, meetups, onSelectMeetup, selectedMeetupId }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<div>
			<div
				className="flex items-center justify-between cursor-pointer"
				onClick={() => setIsExpanded(!isExpanded)}
			>
				<h2 className="text-3xl font-bold cyberpunk-glitch">{title}</h2>
				<button
					className="text-neon-blue hover:text-neon-purple transition-colors duration-300"
					aria-label={isExpanded ? 'Collapse' : 'Expand'}
				>
					{isExpanded ? (
						<ChevronUp className="w-8 h-8" />
					) : (
						<ChevronDown className="w-8 h-8" />
					)}
				</button>
			</div>
			<div
				className={`overflow-hidden transition-all duration-500 ease-in-out ${
					isExpanded
						? 'max-h-[400px] opacity-100'
						: 'max-h-0 opacity-0'
				}`}
			>
				<div className="overflow-y-auto max-h-[400px] pr-2 scrollable-container">
					<ul className="space-y-3 mt-4">
						{meetups.map(meetup => (
							<MeetupListItem
								key={meetup.id}
								meetup={meetup}
								isSelected={meetup.id === selectedMeetupId}
								onSelect={() => onSelectMeetup(meetup.id)}
							/>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default function MeetupList({
	meetups,
	onSelectMeetup,
	selectedMeetupId,
}: MeetupListProps) {
	const activeMeetups = meetups.filter(meetup => !meetup.is_archive);
	const archivedMeetups = meetups.filter(meetup => meetup.is_archive);

	return (
		<div className="bg-gray-900 p-5 border-2 border-neon-blue shadow-lg shadow-neon-blue/50 rounded-lg space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
			<CollapsibleSection
				title="Активные митапы"
				meetups={activeMeetups}
				onSelectMeetup={onSelectMeetup}
				selectedMeetupId={selectedMeetupId}
			/>
			{archivedMeetups.length > 0 && (
				<CollapsibleSection
					title="Архив митапов"
					meetups={archivedMeetups}
					onSelectMeetup={onSelectMeetup}
					selectedMeetupId={selectedMeetupId}
				/>
			)}
		</div>
	);
}
