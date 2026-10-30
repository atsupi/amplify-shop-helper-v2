import { useAuthenticator } from "@aws-amplify/ui-react";

export function useUser() {
  const { user } = useAuthenticator((context) => ({
    user: context.user,
  }));

  return {
    username: user?.username ?? undefined,
    user,
  };
}