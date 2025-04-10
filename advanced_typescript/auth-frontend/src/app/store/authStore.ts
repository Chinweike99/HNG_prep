import { create } from "zustand";

export type User = {
    id: string;
    name: string;
    email: string;
    role: "USER" | "ADMIN"
};


type AuthState = {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    setUser: (user: User | null) => void;
    setError: (error: string | null) => void;
    setLoading: (isLoading: boolean) => void;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<void>;
}


export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    isLoading: true,
    error: null,
    isAuthenticated: false,

    setUser: (user) => set ({
        user,
        isAuthenticated: !!user,
        error: null
    }),

    setError: (error) => set({error}),
    setLoading: (isLoading) => set({isLoading}),

    login: async (email, password) => {
        try {
            set({isLoading: true, error: null});
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {"Content-Type": 'application/json'},
                body: JSON.stringify({email, password})
            });

            const data = await response.json();
            if(!response.ok){
                throw new Error(data.error || 'Login failed');
            }
            set({user: data.user, isAuthenticated: true, isLoading: false})
        } catch (error) {
            console.log('Login error: ', error)
            set({
                error: error instanceof Error ? error.message : 'An error occurred during login',
                isLoading: false
            })
        }
    },


    register: async (name, email, password) => {
        try {
            set({isLoading: true, error: null});
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {"Content-Type": 'application/json'},
                body: JSON.stringify({name, email, password})
            })
            const data = await response .json();

            if(!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            set({user: data.user, isAuthenticated: true, isLoading: false})
        } catch (error) {
            console.error("Registration Error", error);
            set({
                error: error instanceof Error ? error.message : "An error occured during registration",
                isLoading: false
            });
        }
    },

    logout: async() => {
        try {
            set({isLoading: true});
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
            })

            if(!response.ok){
                const data = await response.json();
                throw new Error(data.error || 'Logout failed')
            }
            set({user: null,isAuthenticated: false, isLoading: false});
        } catch (error) {
            console.error('Logout error:', error);
      set({ 
        error: error instanceof Error ? error.message : 'An error occurred during logout', 
        isLoading: false 
      });
        }
    },

    checkAuth: async()=>{
        try {
            set({isLoading: true});
            const checkAuthuorization = await fetch('/api/auth/check-auth');

            if(!checkAuthuorization.ok){
                set({user: null, isAuthenticated: false, isLoading: false});
                return
            }
            const data = await checkAuthuorization.json();
            set({user: data.user, isAuthenticated: true, isLoading: false});

        } catch (error) {
            console.error('Auth check error:', error);
      set({ user: null, isAuthenticated: false, isLoading: false });
        }
    }

}));