import cookie from 'cookie';
import { IncomingMessage } from 'http';

export function parseCookies(ctx: { req?: IncomingMessage }) {
  return cookie.parse(ctx.req ? ctx.req.headers.cookie || '' : '');
}
