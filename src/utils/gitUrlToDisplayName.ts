export function gitUrlToDisplayName(
  repositoryUrl: string | null | undefined,
  maxLen: number = 32
): string | undefined {
  if (!repositoryUrl) return undefined;

  let s = repositoryUrl.trim();
  if (!s) return undefined;

  // Backend гарантирует: начинается с http/https и заканчивается на .git
  s = s.replace(/^https?:\/\//i, '');
  s = s.replace(/\.git\/?$/i, '');

  // Удалить домен: host/owner/repo -> owner/repo
  const firstSlash = s.indexOf('/');
  if (firstSlash >= 0) {
    s = s.slice(firstSlash + 1);
  }

  s = s.replace(/^\/+/, '');

  // Обрезка: ограничить длину, отрезая начало
  if (s.length > maxLen) {
    s = s.slice(s.length - maxLen);
  }

  return s;
}

