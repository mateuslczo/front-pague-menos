export const authService = {
    async getLoginInfo(username: string, password: string) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

     const loginData = {
        username: username,
        password: password
        };
        
        const response = await fetch(`${apiUrl}/Collaborator/login`, {
            method: "POST",
            headers: {
                // "Authorization": `Bearer`,
                "Content-Type": "application/json"
            },
            cache: "no-store",
            body: JSON.stringify(loginData),
        });

        if (!response.ok) {
            return { isAuthenticated: false, user: null };
        }

        const data = await response.json();

        return {
            isAuthenticated: true,
            user: data
        };
    }
};