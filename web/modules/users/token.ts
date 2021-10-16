interface Cookie {
  name: string;
  value: string;
  time: number;
}

export function setCookies(cookies: Cookie[]) {
  const Secure = "Secure;";
  const SameSite = "SameSite=Lax;";
  const Domain = `Domain=${process.env.DOMAIN};`;

  return cookies.map(
    (cookie) =>
      `${cookie.name}=${cookie.value}; ${Secure} ${Domain} ${SameSite} Max-Age=${cookie.time}; Path=/; HttpOnly;`
  );
}
