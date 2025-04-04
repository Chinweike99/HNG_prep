'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  id: string;
  role: 'admin' | 'editor' | 'viewer';
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (role: User['role']) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check session storage or cookies for existing auth
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (role: User['role']) => {
    // In a real app, you would authenticate with your backend
    const mockUser: User = {
      id: `user-${Math.random().toString(36).substring(2, 9)}`,
      role,
      name: `${role} User`,
      email: `${role}@example.com`,
    };
    
    setUser(mockUser);
    sessionStorage.setItem('user', JSON.stringify(mockUser));
    router.push(`/${role}/posts`);
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}


// 'use client';

// import { createContext, useContext, useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// type User = {
//   id: string;
//   role: 'admin' | 'editor' | 'viewer';
//   name: string;
//   email: string;
// };

// type AuthContextType = {
//   user: User | null;
//   login: (role: User['role']) => Promise<void>;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType | null>(null);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const router = useRouter();

//   const login = async (role: User['role']) => {
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 500));
    
//     const mockUser: User = {
//       id: `user-${Math.random().toString(36).substring(2, 9)}`,
//       role,
//       name: `${role.charAt(0).toUpperCase() + role.slice(1)} User`,
//       email: `${role}@example.com`,
//     };
    
//     setUser(mockUser);
//     sessionStorage.setItem('user', JSON.stringify(mockUser));
    
//     // Role-based redirection
//     switch(role) {
//       case 'admin':
//         router.push('/admin/create-post');
//         break;
//       case 'editor':
//         router.push('/editor/posts');
//         break;
//       case 'viewer':
//         router.push('/viewer/posts');
//         break;
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     sessionStorage.removeItem('user');
//     router.push('/login');
//   };

//   useEffect(() => {
//     const storedUser = sessionStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }


// 'use client';

// import { createContext, useContext, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { User, UserRole } from '@/lib/types/roles';

// type AuthContextType = {
//   user: User | null;
//   login: (role: UserRole) => void;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType | null>(null);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const router = useRouter();

//   const login = (role: UserRole) => {
//     const mockUser: User = {
//       id: `user-${Math.random().toString(36).substring(2, 9)}`,
//       name: `${role.charAt(0).toUpperCase() + role.slice(1)} User`,
//       email: `${role}@example.com`,
//       role,
//       ...(role === 'admin' ? { canDelete: true, canCreate: true, canEditAll: true } :
//           role === 'editor' ? { canCreate: true, canEditOwn: true } :
//           { canComment: true })
//     };

//     setUser(mockUser);
//     router.push(`/${role}/${role === 'admin' ? 'create-post' : 'posts'}`);
//   };

//   const logout = () => {
//     setUser(null);
//     router.push('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// }