/** Legacy contact URLs redirect to /contact. Use this on any in-app href. */
export function canonicalAppPath(path: string): string {
  if (path === "/free-audit" || path === "/contact-us") return "/contact";
  return path;
}
