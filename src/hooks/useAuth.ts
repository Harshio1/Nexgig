import { useQuery } from "@tanstack/react-query";
import { apiMe } from "@/lib/api";

export function useAuth() {
  const { data, isLoading, isError, refetch } = useQuery({ queryKey: ['me'], queryFn: apiMe });
  const user = data?.user ?? null;
  const isAuthenticated = !!user;
  const role = (user?.role as 'client' | 'freelancer' | undefined) ?? undefined;
  return { user, role, isAuthenticated, isLoading, isError, refetch };
}


