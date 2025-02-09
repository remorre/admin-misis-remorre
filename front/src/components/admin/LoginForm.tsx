'use client';

import type React from 'react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [error, setError] = useState('');
	const { login, register } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		try {
			if (isLogin) {
				await login(email, password);
			} else {
				await register(email, password, name);
			}
			navigate('/panel');
		} catch (error) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError('An unexpected error occurred. Please try again.');
			}
		}
	};

	return (
		<div className="bg-black p-10 w-full max-w-md border border-neon-blue cyberpunk-form z-10">
			<h2 className="text-5xl font-bold mb-8 text-center text-white cyberpunk-glitch">
				{isLogin ? 'Вход' : 'Регистрация'}
			</h2>
			{error && <p className="text-red-500 mb-4">{error}</p>}
			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-300 mb-1"
					>
						Email
					</label>
					<input
						id="email"
						type="email"
						placeholder="your@email.com"
						value={email}
						onChange={e => setEmail(e.target.value)}
						className="w-full p-3 bg-gray-900 border border-neon-blue text-white focus:outline-none focus:ring-1 focus:ring-neon-blue transition duration-200 cyberpunk-input"
						required
					/>
				</div>
				{!isLogin && (
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-300 mb-1"
						>
							Имя
						</label>
						<input
							id="name"
							type="text"
							placeholder="Ваше имя"
							value={name}
							onChange={e => setName(e.target.value)}
							className="w-full p-3 bg-gray-900 border border-neon-blue text-white focus:outline-none focus:ring-1 focus:ring-neon-blue transition duration-200 cyberpunk-input"
							required
						/>
					</div>
				)}
				<div>
					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-300 mb-1"
					>
						Пароль
					</label>
					<input
						id="password"
						type="password"
						placeholder="************"
						value={password}
						onChange={e => setPassword(e.target.value)}
						className="w-full p-3 bg-gray-900 border border-neon-blue text-white focus:outline-none focus:ring-1 focus:ring-neon-blue transition duration-200 cyberpunk-input"
						required
					/>
				</div>
				<button
					type="submit"
					className="w-full bg-neon-blue hover:bg-blue-600 text-black font-bold py-3 px-4 transition duration-300 ease-in-out cyberpunk-button"
				>
					{isLogin ? 'Войти' : 'Зарегистрироваться'}
				</button>
			</form>
			<p className="mt-6 text-center text-gray-400">
				{isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
				<button
					onClick={() => setIsLogin(!isLogin)}
					className="ml-2 text-neon-blue hover:text-blue-400 font-medium"
				>
					{isLogin ? 'Зарегистрироваться' : 'Войти'}
				</button>
			</p>
		</div>
	);
}
