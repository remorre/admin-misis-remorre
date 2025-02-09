/* eslint-disable react-refresh/only-export-components */
'use client';

import type React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
	token: string | null;
	login: (username: string, password: string) => Promise<void>;
	register: (
		username: string,
		password: string,
		name: string,
	) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		const storedToken = localStorage.getItem('authToken');
		if (storedToken) {
			setToken(storedToken);
		}
	}, []);

	const login = async (username: string, password: string) => {
		try {
			const response = await fetch('https://regami.ru/backend/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'accept': 'application/json',
				},
				body: new URLSearchParams({
					grant_type: 'password',
					username,
					password,
					scope: '',
					client_id: 'string',
					client_secret: 'string',
				}),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.detail || 'Login failed');
			}

			const data = await response.json();
			setToken(data.access_token);
			localStorage.setItem('authToken', data.access_token);
		} catch (error) {
			console.error('Login error:', error);
			throw error;
		}
	};

	const register = async (
		username: string,
		password: string,
		name: string,
	) => {
		try {
			const response = await fetch(
				'https://regami.ru/backend/registration',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'accept': 'application/json',
					},
					body: JSON.stringify({
						login: username,
						password,
						name,
					}),
				},
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.detail || 'Registration failed');
			}

			// After successful registration, proceed with login
			await login(username, password);
		} catch (error) {
			console.error('Registration error:', error);
			throw error;
		}
	};

	const logout = () => {
		setToken(null);
		localStorage.removeItem('authToken');
	};

	return (
		<AuthContext.Provider value={{ token, login, register, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
