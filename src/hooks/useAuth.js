import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCurrentUser,
  signInUser,
  signUpUser,
  signInUserGoogle,
  signOutUser,
} from "../services/apiAuth";
import { useEffect } from "react";
import supabase from "../services/supabase";
import toast from "react-hot-toast";

// Query key for user data
export const USER_QUERY_KEY = ["user"];

// Hook to get current user
export function useUser() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: USER_QUERY_KEY,
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return { user, isLoading, error };
}

// Hook for signing in
export function useSignIn() {
  const queryClient = useQueryClient();

  const { mutate: signIn, isPending: isSigningIn } = useMutation({
    mutationFn: ({ email, password }) => signInUser(email, password),
    onSuccess: () => {
      // Refetch user data after successful sign in
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
      toast.success("User successfully logged in!");
    },
    onError: (err) => toast.error(err.message),
  });

  return { signIn, isSigningIn };
}

// Hook for google OAuth sign in
export function useSignInGoogle() {
  const queryClient = useQueryClient();

  const { mutate: signInGoogle, isPending: isSigningInGoogle } = useMutation({
    mutationFn: signInUserGoogle,
    onSuccess: () => {
      // Refetch user data after successful sign in
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
      // toast.success("User successfully logged in!");
    },
    onError: (err) => toast.error(err.message),
  });

  return { signInGoogle, isSigningInGoogle };
}

// Hook for signing up
export function useSignUp() {
  const queryClient = useQueryClient();

  const { mutate: signUp, isPending: isSigningUp } = useMutation({
    mutationFn: ({ email, password }) => signUpUser(email, password),
    onSuccess: () => {
      // Refetch user data after successful sign up
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
      toast.success("User successfully signed up!");
    },
    onError: (err) => toast.error(err.message),
  });

  return { signUp, isSigningUp };
}

// Hook for signing out
export function useSignOut() {
  const queryClient = useQueryClient();

  const { mutate: signOut, isPending: isSigningOut } = useMutation({
    mutationFn: signOutUser,
    onSuccess: () => {
      // Clear user data from cache
      queryClient.setQueryData(USER_QUERY_KEY, null);
      toast.success("User successfully signed out!");
    },
    onError: (err) => toast.error(err.message),
  });

  return { signOut, isSigningOut };
}

// Hook to listen for auth state changes
export function useAuthStateListener() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
        // Update the user query cache
        queryClient.setQueryData(USER_QUERY_KEY, session?.user ?? null);
      }
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);
}
