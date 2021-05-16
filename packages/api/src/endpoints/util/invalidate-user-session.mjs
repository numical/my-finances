import { cookieConstants, extractJWT } from '../../authn/index.mjs';

const { COOKIE_NAME } = cookieConstants;

export default async ({ request, response, userId }) => {
  const cookie = request.cookies[COOKIE_NAME];
  if (cookie) {
    const jwt = await extractJWT(cookie);
    if (jwt.userId === userId) {
      response.clearCookie(COOKIE_NAME);
    }
  }
};
