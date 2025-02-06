interface Admin {
	id: number;
	name: string;
	email: string;
	role: 'Super Admin' | 'Admin' | 'Moderator';
	isArchived: boolean;
}

interface AdminListProps {
	admins: Admin[];
	onSelectAdmin: (admin: Admin) => void;
	selectedAdminId: number | undefined;
}

export default function AdminList({
	admins,
	onSelectAdmin,
	selectedAdminId,
}: AdminListProps) {
	return (
		<div className="bg-gray-900 p-6 border-2 border-neon-blue shadow-lg shadow-neon-blue/50">
			<h2 className="text-2xl font-bold mb-6 cyberpunk-glitch">
				Список админов
			</h2>
			<ul className="space-y-3">
				{admins.map(admin => (
					<li
						key={admin.id}
						className={`cursor-pointer p-3 transition duration-300 ${
							admin.id === selectedAdminId
								? 'bg-neon-blue text-black'
								: 'hover:bg-gray-800'
						} ${admin.isArchived ? 'opacity-50' : ''}`}
						onClick={() => onSelectAdmin(admin)}
					>
						<span className="font-bold">{admin.name}</span> -{' '}
						{admin.role}
						{admin.isArchived && (
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
