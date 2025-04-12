'use client';

// Authentication Hooks with TanStack Query

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "next/navigation";
// import { string } from "zod";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    setUser,
    setError,
    setLoading,
    login: loginStore,
    logout: logoutStore,
    register: registerStore,
  } = useAuthStore();

  // Query to fetch the current user.
  const { refetch } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        setLoading(true);

        const reponse = await fetch("/api/auth/user");
        if (!reponse.ok) {
          if (reponse.status === 401) {
            setUser(null);
            return null;
          }
          throw new Error("Failed to fetch user");
        }

        const data = await reponse.json();
        setUser(data.user);
        return data.user;
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An error has occured"
        );
        return null;
      }
    },
    initialData: null,
    enabled: false,
  });

  // Mutation for Login
  const loginMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      await loginStore(email, password);
      return useAuthStore.getState().user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      router.push("/");
    },
  });

  // Mutation for Registration
  const registrationMutation = useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      await registerStore(name, email, password);
      return useAuthStore.getState().user;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      router.push("/");
    },
  });

  // Mutation for logout
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await logoutStore();
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      router.push("/login");
    },
  });

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login: loginMutation.mutate,
    register: registrationMutation.mutate,
    logout: logoutMutation.mutate,
    refreshUser: refetch,
    isAdmin: user?.role === "ADMIN",
  };
}
