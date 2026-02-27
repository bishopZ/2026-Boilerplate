const skipLinkStyle: React.CSSProperties = {
  position: 'fixed',
  top: '-100%',
  left: '4px',
  zIndex: 9999,
  backgroundColor: '#3182ce',
  color: '#ffffff',
  padding: '8px 16px',
  fontWeight: 'bold',
  borderRadius: '6px',
  textDecoration: 'none',
  fontSize: '14px',
};

const focusStyle: React.CSSProperties = {
  ...skipLinkStyle,
  top: '4px',
  outline: '2px solid #3182ce',
  outlineOffset: '2px',
};

/**
 * Visually hidden anchor that appears on first Tab press.
 * Uses a plain <a> element to guarantee it's in the browser's
 * natural tab order before any other interactive element.
 */
export const SkipLink = () => (
  <a
    href="#main-content"
    style={skipLinkStyle}
    onFocus={(ev) => { Object.assign(ev.currentTarget.style, focusStyle); }}
    onBlur={(ev) => { Object.assign(ev.currentTarget.style, skipLinkStyle); }}
  >
    Skip to main content
  </a>
);
