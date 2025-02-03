import { Link } from 'react-router-dom';

const menuItems = [
	{ name: 'Настройки', route: '/settings' },
	{ name: 'Митапы', route: '/meetups' },
	{ name: 'Курсы', route: '/courses' },
	{ name: 'Личные достижения', route: '/achievements' },
	{ name: 'Ачивки', route: '/badges' },
	{ name: 'Рассылка сообщений', route: '/messages' },
	{ name: 'Профили', route: '/profiles' },
	{ name: 'Организация хакатонов', route: '/hackathons' },
	{ name: 'Коворкинг', route: '/coworking' },
];

export default function PanelPage() {
	return (
		<div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
			<div className="absolute inset-0 z-0">
				<div className="h-full w-full bg-grid-pattern opacity-20"></div>
			</div>
			<div className="z-10 w-full max-w-4xl">
				<h1 className="text-5xl font-bold mb-12 text-center cyberpunk-glitch">
					Панель управления
				</h1>
				<nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{menuItems.map((item, index) => (
						<Link
							key={index}
							to={item.route}
							className="cyberpunk-menu-item bg-gray-900 border border-neon-blue p-4 text-center text-lg font-bold hover:bg-neon-blue transition duration-300 ease-in-out"
						>
							{item.name}
						</Link>
					))}
				</nav>
			</div>
		</div>
	);
}
