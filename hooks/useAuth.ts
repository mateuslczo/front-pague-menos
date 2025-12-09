import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { authService } from '../services/api/authService';

export function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        checkAuthentication();
    }, []);

    const checkAuthentication = async () => {
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem("token");

            // Se não houver token → não autenticado
            if (!token) {
                setUser(null);
                localStorage.removeItem('user');
                return;
            }

            // Chama sua API
            const result = await authService.getLoginInfo()

            if (result.isAuthenticated) {
                setUser(result.user);
                localStorage.setItem('user', JSON.stringify(result.user));
            } else {
                setUser(null);
                localStorage.removeItem('user');
            }
        } catch (err: any) {
            setError(err.message);
            setUser(null);
            localStorage.removeItem('user');
        } finally {
            setLoading(false);
        }
    };

    const login = async (token: string) => {
        try {
            setLoading(true);
            setError(null);

            // Salva token recebido (ex: Azure B2C)
            localStorage.setItem("token", token);

            // Agora tenta carregar dados do usuário
            await checkAuthentication();

            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        router.push("/login");
    };

    const refreshUser = async () => {
        await checkAuthentication();
    };

    const isAuthenticated = !!user;

    return {
        user,
        loading,
        error,
        login,
        logout,
        refreshUser,
        isAuthenticated
    };
}
