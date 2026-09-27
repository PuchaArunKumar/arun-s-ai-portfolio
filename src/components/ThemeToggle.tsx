import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

// Text toggle rather than an icon: it names the theme you will switch to.
const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // next-themes only knows the resolved theme after hydration.
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === 'dark';
  const next = isDark ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className="ed-action no-print"
      aria-label={`Switch to ${next} theme`}
    >
      <span aria-hidden="true">{isDark ? '○' : '●'}</span>
      <span className="ed-action-label">{isDark ? 'Light' : 'Dark'}</span>
    </button>
  );
};

export default ThemeToggle;
