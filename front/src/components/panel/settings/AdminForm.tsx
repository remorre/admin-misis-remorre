import type React from 'react';
import { useState } from 'react';

interface AdminFormData {
	name: string;
	email: string;
	role: 'Super Admin' | 'Admin' | 'Moderator';
}

interface AdminFormProps {
	onSubmit: (data: AdminFormData) => void;
	onCancel: () => void;
	initialData?: Partial<AdminFormData>;
}

export default function AdminForm({
	onSubmit,
	onCancel,
	initialData = {},
}: AdminFormProps) {
	const [formData, setFormData] = useState<AdminFormData>({
		name: initialData.name || '',
		email: initialData.email || '',
		role: initialData.role || 'Admin',
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<h2 className="text-2xl font-bold mb-6 cyberpunk-glitch">
				{initialData.name ? 'Редактировать админа' : 'Создать админа'}
			</h2>
			<div>
				<label
					htmlFor="name"
					className="block text-sm font-medium text-gray-400 mb-1"
				>
					Имя
				</label>
				<input
					type="text"
					id="name"
					name="name"
					value={formData.name}
					onChange={handleChange}
					required
					className="w-full cyberpunk-input bg-gray-800 border-2 border-neon-blue text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-blue"
				/>
			</div>
			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium text-gray-400 mb-1"
				>
					Email
				</label>
				<input
					type="email"
					id="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					required
					className="w-full cyberpunk-input bg-gray-800 border-2 border-neon-blue text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-blue"
				/>
			</div>
			<div>
				<label
					htmlFor="role"
					className="block text-sm font-medium text-gray-400 mb-1"
				>
					Роль
				</label>
				<select
					id="role"
					name="role"
					value={formData.role}
					onChange={handleChange}
					className="w-full cyberpunk-input bg-gray-800 border-2 border-neon-blue text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neon-blue"
				>
					<option value="Admin">Admin</option>
					<option value="Moderator">Moderator</option>
					<option value="Super Admin">Super Admin</option>
				</select>
			</div>
			<div className="flex justify-end space-x-4">
				<button
					type="button"
					onClick={onCancel}
					className="cyberpunk-button bg-gray-700 text-white px-6 py-2 hover:bg-gray-600 transition duration-300"
				>
					Отмена
				</button>
				<button
					type="submit"
					className="cyberpunk-button bg-neon-blue text-black px-6 py-2 hover:bg-blue-400 transition duration-300"
				>
					{initialData.name ? 'Сохранить' : 'Создать'}
				</button>
			</div>
		</form>
	);
}
