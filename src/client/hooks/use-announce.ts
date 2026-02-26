import { useCallback, useRef, useEffect } from 'react';

const ANNOUNCER_ID = 'aria-live-announcer';

/**
 * Hook for announcing dynamic content to screen readers via an aria-live region.
 *
 * Usage:
 *   const announce = useAnnounce();
 *   announce('Item added to cart');
 */
export const useAnnounce = () => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!document.getElementById(ANNOUNCER_ID)) {
      const el = document.createElement('div');
      el.id = ANNOUNCER_ID;
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      el.setAttribute('aria-atomic', 'true');
      Object.assign(el.style, {
        position: 'absolute',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        clip: 'rect(0 0 0 0)',
        whiteSpace: 'nowrap',
      });
      document.body.appendChild(el);
    }
  }, []);

  const announce = useCallback((message: string) => {
    const el = document.getElementById(ANNOUNCER_ID);
    if (!el) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    el.textContent = '';
    timeoutRef.current = setTimeout(() => {
      el.textContent = message;
    }, 100);
  }, []);

  return announce;
};
