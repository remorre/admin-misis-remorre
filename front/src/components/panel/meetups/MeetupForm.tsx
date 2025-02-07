'use client';

import type React from 'react';
import { useState } from 'react';
import type { Meetup } from '../../../pages/panel/MeetupsPage.tsx';

type MeetupFormData = Omit<Meetup, 'id' | 'is_archive' | 'users'>;

interface MeetupFormProps {
	onSubmit: (data: MeetupFormData) => void;
	onCancel: () => void;
	initialData?: Partial<MeetupFormData>;
}

export default function MeetupForm({
	onSubmit,
	onCancel,
	initialData = {},
}: MeetupFormProps) {
	const [formData, setFormData] = useState<MeetupFormData>({
		title: initialData.title || '',
		banner_link: initialData.banner_link || '',
		description: initialData.description || '',
		schedule: initialData.schedule || '',
		reward_for_visit: initialData.reward_for_visit || 0,
		date: initialData.date || '',
	});

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const value =
			e.target.name === 'reward_for_visit'
				? Number(e.target.value)
				: e.target.value;
		setFormData({ ...formData, [e.target.name]: value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		try {
			onSubmit(formData);
		} catch (err) {
			console.error('Error submitting meetup:', err);
			setError('Failed to submit meetup. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<h2 className="text-3xl font-bold mb-6 cyberpunk-glitch">
				{initialData.title ? 'Редактировать митап' : 'Создать митап'}
			</h2>
			<div>
				<label
					htmlFor="title"
					className="block text-lg font-medium text-gray-400 mb-2"
				>
					Название
				</label>
				<input
					type="text"
					id="title"
					name="title"
					value={formData.title}
					onChange={handleChange}
					required
					className="w-full cyberpunk-input bg-gray-800 border-2 border-neon-blue text-white px-4 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-neon-blue"
				/>
			</div>
			<div>
				<label
					htmlFor="banner_link"
					className="block text-lg font-medium text-gray-400 mb-2"
				>
					Ссылка на баннер
				</label>
				<input
					type="url"
					id="banner_link"
					name="banner_link"
					value={formData.banner_link}
					onChange={handleChange}
					required
					className="w-full cyberpunk-input bg-gray-800 border-2 border-neon-blue text-white px-4 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-neon-blue"
				/>
			</div>
			<div>
				<label
					htmlFor="date"
					className="block text-lg font-medium text-gray-400 mb-2"
				>
					Дата
				</label>
				<input
					type="datetime-local"
					id="date"
					name="date"
					value={formData.date}
					onChange={handleChange}
					required
					className="w-full cyberpunk-input bg-gray-800 border-2 border-neon-blue text-white px-4 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-neon-blue"
				/>
			</div>
			<div>
				<label
					htmlFor="schedule"
					className="block text-lg font-medium text-gray-400 mb-2"
				>
					Расписание
				</label>
				<input
					type="text"
					id="schedule"
					name="schedule"
					value={formData.schedule}
					onChange={handleChange}
					required
					className="w-full cyberpunk-input bg-gray-800 border-2 border-neon-blue text-white px-4 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-neon-blue"
				/>
			</div>
			<div>
				<label
					htmlFor="reward_for_visit"
					className="block text-lg font-medium text-gray-400 mb-2"
				>
					Награда за посещение
				</label>
				<input
					type="number"
					id="reward_for_visit"
					name="reward_for_visit"
					value={formData.reward_for_visit}
					onChange={handleChange}
					required
					min="0"
					className="w-full cyberpunk-input bg-gray-800 border-2 border-neon-blue text-white px-4 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-neon-blue"
				/>
			</div>
			<div>
				<label
					htmlFor="description"
					className="block text-lg font-medium text-gray-400 mb-2"
				>
					Описание
				</label>
				<textarea
					id="description"
					name="description"
					value={formData.description}
					onChange={handleChange}
					required
					rows={4}
					className="w-full cyberpunk-input bg-gray-800 border-2 border-neon-blue text-white px-4 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-neon-blue"
				></textarea>
			</div>
			{error && <div className="text-red-500">{error}</div>}
			<div className="flex justify-end space-x-4">
				<button
					type="button"
					onClick={onCancel}
					className="cyberpunk-button bg-gray-700 text-white px-6 py-2 text-xl hover:bg-gray-600 transition duration-300"
					disabled={isLoading}
				>
					Отмена
				</button>
				<button
					type="submit"
					className="cyberpunk-button bg-neon-blue text-black px-6 py-2 text-xl hover:bg-blue-400 transition duration-300"
					disabled={isLoading}
				>
					{isLoading
						? 'Загрузка...'
						: initialData.title
						? 'Сохранить'
						: 'Создать'}
				</button>
			</div>
		</form>
	);
}
