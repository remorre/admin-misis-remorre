import { useState } from 'react';
import AdminForm from './AdminForm';

interface Admin {
	id: number;
	name: string;
	email: string;
	role: 'Super Admin' | 'Admin' | 'Moderator';
	isArchived: boolean;
}

interface AdminDetailsProps {
	admin: Admin;
	onUpdate: (admin: Admin) => void;
	onArchive: (id: number) => void;
}

export default function AdminDetails({
	admin,
	onUpdate,
	onArchive,
}: AdminDetailsProps) {
	const [isEditing, setIsEditing] = useState(false);

	if (isEditing) {
		return (
			<AdminForm
				initialData={admin}
				onSubmit={updatedData => {
					onUpdate({ ...admin, ...updatedData });
					setIsEditing(false);
				}}
				onCancel={() => setIsEditing(false)}
			/>
		);
	}

	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-bold mb-6 cyberpunk-glitch">
				Детали админа
			</h2>
			<p>
				<span className="font-bold text-neon-blue">Имя:</span>{' '}
				{admin.name}
			</p>
			<p>
				<span className="font-bold text-neon-blue">Email:</span>{' '}
				{admin.email}
			</p>
			<p>
				<span className="font-bold text-neon-blue">Роль:</span>{' '}
				{admin.role}
			</p>
			<p>
				<span className="font-bold text-neon-blue">Статус:</span>{' '}
				{admin.isArchived ? 'Архивирован' : 'Активен'}
			</p>
			<div className="flex justify-end space-x-4">
				<button
					onClick={() => setIsEditing(true)}
					className="cyberpunk-button bg-neon-blue text-black px-6 py-2 hover:bg-blue-400 transition duration-300"
				>
					Редактировать
				</button>
				{!admin.isArchived && (
					<button
						onClick={() => onArchive(admin.id)}
						className="cyberpunk-button bg-red-600 text-white px-6 py-2 hover:bg-red-500 transition duration-300"
					>
						Архивировать
					</button>
				)}
			</div>
		</div>
	);
}
