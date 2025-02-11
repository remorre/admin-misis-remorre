'use client';

import type React from 'react';
import { useState } from 'react';
import type { Course } from '../../../pages/panel/CoursesPage';

type CourseFormData = Omit<Course, 'id' | 'is_archive' | 'lessons'>;

interface CourseFormProps {
	onSubmit: (data: CourseFormData) => void;
	onCancel: () => void;
	initialData?: Partial<CourseFormData>;
}

export default function CourseForm({
	onSubmit,
	onCancel,
	initialData = {},
}: CourseFormProps) {
	const [formData, setFormData] = useState<CourseFormData>({
		title: initialData.title || '',
		description: initialData.description || '',
		banner_link: initialData.banner_link || '',
		start_date: initialData.start_date || '',
		end_date: initialData.end_date || '',
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<h2 className="text-3xl font-bold mb-6 cyberpunk-glitch">
				{initialData.title ? 'Редактировать курс' : 'Создать курс'}
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
			<div>
				<label
					htmlFor="banner_link"
					className="block text-lg font-medium text-gray-400 mb-2"
				>
					Ссылка на баннер
				</label>
				<input
					type="text"
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
					htmlFor="start_date"
					className="block text-lg font-medium text-gray-400 mb-2"
				>
					Дата начала
				</label>
				<input
					type="date"
					id="start_date"
					name="start_date"
					value={formData.start_date}
					onChange={handleChange}
					required
					className="w-full cyberpunk-input bg-gray-800 border-2 border-neon-blue text-white px-4 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-neon-blue"
				/>
			</div>
			<div>
				<label
					htmlFor="end_date"
					className="block text-lg font-medium text-gray-400 mb-2"
				>
					Дата окончания
				</label>
				<input
					type="date"
					id="end_date"
					name="end_date"
					value={formData.end_date}
					onChange={handleChange}
					required
					className="w-full cyberpunk-input bg-gray-800 border-2 border-neon-blue text-white px-4 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-neon-blue"
				/>
			</div>
			<div className="flex justify-end space-x-4">
				<button
					type="button"
					onClick={onCancel}
					className="cyberpunk-button bg-gray-700 text-white px-6 py-2 text-xl hover:bg-gray-600 transition duration-300"
				>
					Отмена
				</button>
				<button
					type="submit"
					className="cyberpunk-button bg-neon-blue text-black px-6 py-2 text-xl hover:bg-blue-400 transition duration-300"
				>
					{initialData.title ? 'Сохранить' : 'Создать'}
				</button>
			</div>
		</form>
	);
}
