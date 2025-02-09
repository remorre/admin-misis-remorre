'use client';

import { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import type { IconType } from 'react-icons';
import {
	FaCog,
	FaUsers,
	FaBook,
	FaTrophy,
	FaMedal,
	FaEnvelope,
	FaUserCircle,
	FaLaptopCode,
	FaBuilding,
	FaSignOutAlt,
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

interface MenuItem {
	name: string;
	route: string;
	icon: IconType;
}

const menuItems: MenuItem[] = [
	{ name: 'Настройки', route: '/panel/settings', icon: FaCog },
	{ name: 'Митапы', route: '/panel/meetups', icon: FaUsers },
	{ name: 'Курсы', route: '/panel/courses', icon: FaBook },
	{ name: 'Личные достижения', route: '/panel/achievements', icon: FaTrophy },
	{ name: 'Ачивки', route: '/panel/badges', icon: FaMedal },
	{ name: 'Рассылка сообщений', route: '/panel/messages', icon: FaEnvelope },
	{ name: 'Профили', route: '/panel/profiles', icon: FaUserCircle },
	{
		name: 'Организация хакатонов',
		route: '/panel/hackathons',
		icon: FaLaptopCode,
	},
	{ name: 'Коворкинг', route: '/panel/coworking', icon: FaBuilding },
];

export default function PanelPage() {
	const location = useLocation();
	const [activeItem, setActiveItem] = useState(location.pathname);
	const [isExpanded, setIsExpanded] = useState(false);
	const { logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/');
	};

	return (
		<div className="min-h-screen bg-black text-white flex relative overflow-hidden">
			<div className="absolute inset-0 z-0">
				<div className="h-full w-full bg-grid-pattern opacity-20"></div>
			</div>

			{/* Left-side menu */}
			<nav
				className={`z-10 border-r border-neon-blue p-4 flex flex-col justify-between transition-all duration-300 ease-in-out ${
					isExpanded ? 'w-64' : 'w-20'
				}`}
				onMouseEnter={() => setIsExpanded(true)}
				onMouseLeave={() => setIsExpanded(false)}
			>
				<div>
					<h1
						className={`text-2xl font-bold mb-8 text-center cyberpunk-glitch transition-opacity duration-300 ${
							isExpanded ? 'opacity-100' : 'opacity-0 h-0 mb-0'
						}`}
					>
						Панель
					</h1>
					{menuItems.map((item, index) => (
						<Link
							key={index}
							to={item.route}
							className={`cyberpunk-menu-item flex items-center p-3 mb-4 text-lg font-bold transition duration-300 ease-in-out ${
								activeItem === item.route
									? 'bg-neon-blue text-black'
									: 'hover:bg-gray-800'
							}`}
							onClick={() => setActiveItem(item.route)}
						>
							<item.icon
								className={`text-2xl ${
									isExpanded ? 'mr-3' : 'mx-auto'
								}`}
							/>
							<span
								className={`cyberpunk-text transition-opacity duration-300 ${
									isExpanded ? 'opacity-100' : 'opacity-0 w-0'
								}`}
							>
								{item.name}
							</span>
						</Link>
					))}
				</div>
				<button
					onClick={handleLogout}
					className={`cyberpunk-menu-item flex items-center p-3 text-lg font-bold transition duration-300 ease-in-out hover:bg-gray-800`}
				>
					<FaSignOutAlt
						className={`text-2xl ${
							isExpanded ? 'mr-3' : 'mx-auto'
						}`}
					/>
					<span
						className={`cyberpunk-text transition-opacity duration-300 ${
							isExpanded ? 'opacity-100' : 'opacity-0 w-0'
						}`}
					>
						Выход
					</span>
				</button>
			</nav>

			{/* Right-side content */}
			<main className="flex-1 p-8 z-10">
				<Outlet />
			</main>
		</div>
	);
}
