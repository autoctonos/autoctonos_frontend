import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

export const sessionCallback = async ({
  session,
  token,
}: {
  session: Session;
  token: JWT;
}): Promise<Session> => {
  if (session.user) {
    session.user.id = token.id as string;
    session.user.userName = token.userName as string;
    session.user.firstName = token.firstName as string;
  }

  (session as any).access_token = token.access_token as string | undefined;

  return session;
};
