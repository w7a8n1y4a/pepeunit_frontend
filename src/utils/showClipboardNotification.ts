export interface PointLike {
  clientX: number;
  clientY: number;
}

interface ClipboardNotificationOptions {
  text?: string;
  durationMs?: number;
}

const NOTIFICATION_ID = 'clipboard-notification';

const showClipboardNotification = (
  point: PointLike,
  options?: ClipboardNotificationOptions
) => {
  if (typeof document === 'undefined') {
    return;
  }

  const text = options?.text ?? 'Added to buffer';
  const durationMs = options?.durationMs ?? 1500;

  // Remove previous notification if it exists
  const existing = document.getElementById(NOTIFICATION_ID);
  if (existing) {
    existing.remove();
  }

  const el = document.createElement('div');
  el.id = NOTIFICATION_ID;
  el.textContent = text;

  el.className = 'clipboard-notification';

  // временно ставим в (0,0), реальную позицию посчитаем после измерения размеров
  el.style.left = '0px';
  el.style.top = '0px';
  el.style.visibility = 'hidden';

  document.body.appendChild(el);

  // Позиционируем в левом верхнем углу относительно курсора
  const rect = el.getBoundingClientRect();
  const offset = 12;
  const left = Math.max(0, point.clientX - rect.width - offset);
  const top = Math.max(0, point.clientY - rect.height - offset);

  el.style.left = `${left}px`;
  el.style.top = `${top}px`;
  el.style.visibility = 'visible';

  const fadeDuration = Math.min(250, durationMs);
  const visibleDuration = Math.max(0, durationMs - fadeDuration);

  window.setTimeout(() => {
    el.style.opacity = '0';
  }, visibleDuration);

  window.setTimeout(() => {
    el.remove();
  }, durationMs);
};

export default showClipboardNotification;


