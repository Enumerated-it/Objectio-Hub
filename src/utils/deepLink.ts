/**
 * Utility functions for Deep Linking and Clipboard operations
 */

export function getAnchorFromUrl(): string {
  if (typeof window === 'undefined') return '';
  const hash = window.location.hash;
  if (!hash) return '';
  // Remove leading '#' and optional leading '/' e.g. '#/pv-certif' or '#pv-certif'
  return hash.replace(/^#\/?/, '').trim();
}

export function setAnchorInUrl(anchor: string): void {
  if (typeof window === 'undefined') return;
  if (!anchor) {
    window.history.pushState(null, '', window.location.pathname);
  } else {
    window.location.hash = `#${anchor}`;
  }
}

export function getFullDeepLink(anchor: string): string {
  if (typeof window === 'undefined') return `#${anchor}`;
  return `${window.location.origin}${window.location.pathname}#${anchor}`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      textArea.remove();
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy to clipboard', err);
    return false;
  }
}
