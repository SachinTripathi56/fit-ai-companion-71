// Backend APIs are developed separately using FastAPI.
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export const useLogin = () => {
  const setSession = useAuthStore((s) => s.setSession);
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.login(email, password),
    onSuccess: (res) => setSession(res.user, res.tokens.access_token, res.tokens.refresh_token),
  });
};

export const useRegister = () => {
  const setSession = useAuthStore((s) => s.setSession);
  return useMutation({
    mutationFn: authService.register,
    onSuccess: (res) => setSession(res.user, res.tokens.access_token, res.tokens.refresh_token),
  });
};

export const useForgotPassword = () =>
  useMutation({ mutationFn: (email: string) => authService.forgotPassword(email) });

export const useLogout = () => {
  const logout = useAuthStore((s) => s.logout);
  return () => {
    authService.logout().catch(() => {});
    logout();
  };
};
