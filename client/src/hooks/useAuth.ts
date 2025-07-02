import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";

export function useAuth() {
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/auth/user"],
    queryFn: async () => {
      const res = await fetch("/api/auth/user");
      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }
      return res.json();
    },
    retry: false,
  });

  const logout = async () => {
    try {
      // Call your logout API route to clear server session/cookies
      await fetch("/api/auth/logout", { method: "POST" });

      // Invalidate the user query so `user` becomes undefined
      queryClient.invalidateQueries({
        queryKey: ["/api/auth/user"],
      });

      // Optionally, redirect to login
      setLocation("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    logout, // ✅ now available in your Header
  };
}
