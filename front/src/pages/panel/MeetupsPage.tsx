/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import MeetupList from '../../components/panel/meetups/MeetupList';
import MeetupForm from '../../components/panel/meetups/MeetupForm';
import MeetupDetails from '../../components/panel/meetups/MeetupDetails';
import MeetupStats from '../../components/panel/meetups/MeetupStats';
import QRCodeGenerator from '../../components/panel/meetups/QRCodeGenerator';
import RaffleGenerator from '../../components/panel/meetups/RaffleGenerator';

interface User {
	user_id: number;
	is_registred: boolean;
	is_visited: boolean;
}

export interface Meetup {
	id: number;
	title: string;
	date: string;
	schedule: string;
	description: string;
	banner_link: string;
	reward_for_visit: number;
	is_archive: boolean;
	users: User[];
}

export default function MeetupsPage() {
	const [meetups, setMeetups] = useState<Meetup[]>([]);
	const [selectedMeetupId, setSelectedMeetupId] = useState<number | null>(
		null,
	);
	const [isCreating, setIsCreating] = useState(false);
	const [showStats, setShowStats] = useState(false);
	const [showQRCode, setShowQRCode] = useState(false);
	const [showRaffle, setShowRaffle] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const { token } = useAuth();

	useEffect(() => {
		if (token) {
			fetchMeetups();
		}
	}, [token]);

	const fetchMeetups = async () => {
		if (!token) return;

		try {
			const response = await fetch('https://regami.ru/backend/meetup', {
				headers: {
					Authorization: `Bearer ${token}`,
					accept: 'application/json',
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data: Meetup[] = await response.json();
			setMeetups(data);
			setIsLoading(false);
		} catch (err) {
			console.error('Error fetching meetups:', err);
			setError('Failed to fetch meetups. Please try again later.');
			setIsLoading(false);
		}
	};

	const handleCreateMeetup = async (
		newMeetup: Omit<Meetup, 'id' | 'is_archive' | 'users'>,
	) => {
		if (!token) return;

		try {
			const response = await fetch('https://regami.ru/backend/meetup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`,
				},
				body: JSON.stringify([newMeetup]),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();
			const createdMeetup = result[0];
			setMeetups([...meetups, createdMeetup]);
			setIsCreating(false);
		} catch (err) {
			console.error('Error creating meetup:', err);
			setError('Failed to create meetup. Please try again.');
		}
	};

	const handleUpdateMeetup = (updatedMeetup: Meetup) => {
		setMeetups(
			meetups.map(meetup =>
				meetup.id === updatedMeetup.id ? updatedMeetup : meetup,
			),
		);
	};

	const handleDeleteMeetup = (deletedMeetupId: number) => {
		setMeetups(meetups.filter(meetup => meetup.id !== deletedMeetupId));
		setSelectedMeetupId(null);
	};

	const handleSelectMeetup = (meetupId: number) => {
		setSelectedMeetupId(meetupId);
	};

	if (isLoading) {
		return (
			<div className="text-center text-white text-2xl">Loading...</div>
		);
	}

	if (error) {
		return <div className="text-center text-red-500 text-2xl">{error}</div>;
	}

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
							{/* <button
								onClick={() => setShowStats(true)}
								className="flex-1 cyberpunk-button bg-neon-green text-black px-6 py-3 font-bold text-xl hover:bg-green-400 transition duration-300 transform hover:scale-105"
							>
								Статистика
							</button> */}
						</div>
						<MeetupList
							meetups={meetups}
							onSelectMeetup={handleSelectMeetup}
							selectedMeetupId={selectedMeetupId}
						/>
					</div>
					<div className="cyberpunk-form bg-gray-900 p-6 border-2 border-neon-blue shadow-lg shadow-neon-blue/50">
						{isCreating ? (
							<MeetupForm
								onSubmit={handleCreateMeetup}
								onCancel={() => setIsCreating(false)}
							/>
						) : selectedMeetupId && token ? (
							<MeetupDetails
								meetupId={selectedMeetupId}
								onUpdate={handleUpdateMeetup}
								onDelete={handleDeleteMeetup}
								onGenerateQR={() => setShowQRCode(true)}
								onGenerateRaffle={() => setShowRaffle(true)}
								authToken={token}
							/>
						) : showStats ? (
							<MeetupStats
								meetups={meetups}
								onClose={() => setShowStats(false)}
							/>
						) : (
							<p className="text-center text-gray-400 text-xl">
								Выберите митап или создайте новый
							</p>
						)}
					</div>
				</div>
			</div>
			{showQRCode && selectedMeetupId && (
				<QRCodeGenerator
					meetup={meetups.find(m => m.id === selectedMeetupId)!}
					onClose={() => setShowQRCode(false)}
				/>
			)}
			{showRaffle && selectedMeetupId && (
				<RaffleGenerator
					meetup={meetups.find(m => m.id === selectedMeetupId)!}
					onClose={() => setShowRaffle(false)}
				/>
			)}
		</div>
	);
}
