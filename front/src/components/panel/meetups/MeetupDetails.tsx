/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import MeetupForm from './MeetupForm';
import type { Meetup } from '../../../pages/panel/MeetupsPage.tsx';

interface MeetupDetailsProps {
	meetupId: number;
	onUpdate: (meetup: Meetup) => void;
	onDelete: (id: number) => void;
	onGenerateQR: () => void;
	onGenerateRaffle: () => void;
	authToken: string;
}

export default function MeetupDetails({
	meetupId,
	onUpdate,
	onDelete,
	onGenerateQR,
	onGenerateRaffle,
	authToken,
}: MeetupDetailsProps) {
	const [meetup, setMeetup] = useState<Meetup | null>(null);
	const [isEditing, setIsEditing] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchMeetupDetails = async () => {
			setIsLoading(true);
			setError(null);
			try {
				const response = await fetch(
					`https://regami.ru/backend/meetup/${meetupId}`,
					{
						headers: {
							Authorization: `Bearer ${authToken}`,
							accept: 'application/json',
						},
					},
				);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data: Meetup = await response.json();
				setMeetup(data);
			} catch (err) {
				console.error('Error fetching meetup details:', err);
				setError('Failed to fetch meetup details. Please try again.');
			} finally {
				setIsLoading(false);
			}
		};

		fetchMeetupDetails();
	}, [meetupId, authToken]);

	const handleUpdate = async (updatedData: Partial<Meetup>) => {
		if (!meetup) return;

		try {
			const response = await fetch(
				`https://regami.ru/backend/meetup/${meetupId}`,
				{
					method: 'PATCH',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${authToken}`,
					},
					body: JSON.stringify(updatedData),
				},
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const updatedMeetup: Meetup = await response.json();
			setMeetup(updatedMeetup);
			onUpdate(updatedMeetup);
			setIsEditing(false);
		} catch (err) {
			console.error('Error updating meetup:', err);
			setError('Failed to update meetup. Please try again.');
		}
	};

	const handleDelete = async () => {
		if (!meetup) return;

		try {
			const response = await fetch(
				`https://regami.ru/backend/meetup/${meetupId}`,
				{
					method: 'DELETE',
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				},
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			onDelete(meetupId);
		} catch (err) {
			console.error('Error deleting meetup:', err);
			setError('Failed to delete meetup. Please try again.');
		}
	};

	if (isLoading) {
		return (
			<div className="text-center text-white text-2xl">Loading...</div>
		);
	}

	if (error) {
		return <div className="text-center text-red-500 text-2xl">{error}</div>;
	}

	if (!meetup) {
		return (
			<div className="text-center text-white text-2xl">
				Meetup not found
			</div>
		);
	}

	if (isEditing) {
		return (
			<MeetupForm
				initialData={meetup}
				onSubmit={handleUpdate}
				onCancel={() => setIsEditing(false)}
			/>
		);
	}

	return (
		<div className="space-y-6">
			<h2 className="text-3xl font-bold mb-6 cyberpunk-glitch">
				{meetup.title}
			</h2>
			<img
				src={meetup.banner_link || '/placeholder.svg'}
				alt={meetup.title}
				className="w-full h-48 object-cover rounded-lg mb-4"
			/>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Дата:</span>{' '}
				{new Date(meetup.date).toLocaleDateString('ru-RU', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				})}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Расписание:</span>{' '}
				{meetup.schedule}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Описание:</span>{' '}
				{meetup.description}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Участников:</span>{' '}
				{meetup.users.length}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">
					Награда за посещение:
				</span>{' '}
				{meetup.reward_for_visit}
			</p>
			<p className="text-xl">
				<span className="font-bold text-neon-blue">Статус:</span>{' '}
				{meetup.is_archive ? 'Архивирован' : 'Активен'}
			</p>
			<div className="flex flex-wrap justify-end space-x-4 space-y-2">
				<button
					onClick={() => setIsEditing(true)}
					className="cyberpunk-button bg-neon-blue text-black px-6 py-2 text-xl hover:bg-blue-400 transition duration-300"
				>
					Редактировать
				</button>
				<button
					onClick={handleDelete}
					className="cyberpunk-button bg-red-600 text-white px-6 py-2 text-xl hover:bg-red-500 transition duration-300"
				>
					Удалить
				</button>
				{/* <button
					onClick={onGenerateQR}
					className="cyberpunk-button bg-purple-600 text-white px-6 py-2 text-xl hover:bg-purple-500 transition duration-300"
				>
					Генерировать QR
				</button>
				<button
					onClick={onGenerateRaffle}
					className="cyberpunk-button bg-green-600 text-white px-6 py-2 text-xl hover:bg-green-500 transition duration-300"
				>
					Провести розыгрыш
				</button> */}
			</div>
		</div>
	);
}
