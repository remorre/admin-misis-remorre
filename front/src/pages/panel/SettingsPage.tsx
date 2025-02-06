import { useState } from 'react';
import AdminList from '../../components/panel/settings/AdminList';
import AdminForm from '../../components/panel/settings/AdminForm';
import AdminDetails from '../../components/panel/settings/AdminDetails';

interface Admin {
	id: number;
	name: string;
	email: string;
	role: 'Super Admin' | 'Admin' | 'Moderator';
	isArchived: boolean;
}

const initialAdmins: Admin[] = [
	{
		id: 1,
		name: 'Neo',
		email: 'neo@matrix.com',
		role: 'Super Admin',
		isArchived: false,
	},
	{
		id: 2,
		name: 'Trinity',
		email: 'trinity@matrix.com',
		role: 'Admin',
		isArchived: false,
	},
	{
		id: 3,
		name: 'Morpheus',
		email: 'morpheus@matrix.com',
		role: 'Moderator',
		isArchived: false,
	},
];

export default function SettingsPage() {
	const [admins, setAdmins] = useState<Admin[]>(initialAdmins);
	const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
	const [isCreating, setIsCreating] = useState(false);

	const handleCreateAdmin = (newAdmin: Omit<Admin, 'id' | 'isArchived'>) => {
		const admin: Admin = {
			...newAdmin,
			id: admins.length + 1,
			isArchived: false,
		};
		setAdmins([...admins, admin]);
		setIsCreating(false);
	};

	const handleUpdateAdmin = (updatedAdmin: Admin) => {
		setAdmins(
			admins.map(admin =>
				admin.id === updatedAdmin.id ? updatedAdmin : admin,
			),
		);
		setSelectedAdmin(null);
	};

	const handleArchiveAdmin = (adminId: number) => {
		setAdmins(
			admins.map(admin =>
				admin.id === adminId ? { ...admin, isArchived: true } : admin,
			),
		);
		setSelectedAdmin(null);
	};

	return (
		<div className="min-h-screen text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
			<div className="z-10 w-full max-w-6xl">
				<h1 className="text-5xl font-bold mb-12 text-center cyberpunk-glitch">
					Настройки администраторов
				</h1>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div className="space-y-8">
						<button
							onClick={() => setIsCreating(true)}
							className="w-full cyberpunk-button bg-neon-blue text-black px-6 py-3 font-bold text-lg hover:bg-blue-400 transition duration-300 transform hover:scale-105"
						>
							Создать админа
						</button>
						<AdminList
							admins={admins}
							onSelectAdmin={setSelectedAdmin}
							selectedAdminId={selectedAdmin?.id}
						/>
					</div>
					<div className="cyberpunk-form bg-gray-900 p-6 border-2 border-neon-blue shadow-lg shadow-neon-blue/50">
						{isCreating ? (
							<AdminForm
								onSubmit={handleCreateAdmin}
								onCancel={() => setIsCreating(false)}
							/>
						) : selectedAdmin ? (
							<AdminDetails
								admin={selectedAdmin}
								onUpdate={handleUpdateAdmin}
								onArchive={handleArchiveAdmin}
							/>
						) : (
							<p className="text-center text-gray-400 text-lg">
								Выберите админа или создайте нового
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
