import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

export default function ChangeTheme() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = Cookies.get('theme');
    if (savedTheme) {
      return savedTheme;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('html').classList.add('dark');
    } else {
      document.querySelector('html').classList.remove('dark');
    }
    Cookies.set('theme', theme, { expires: 365 });
  }, [theme]);

  const handleChangeTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <span
      onClick={handleChangeTheme}
      className="text-3xl cursor-pointer select-none"
    >
      {theme === 'light' ? '☀️' : '🌙'}
    </span>
  );
}
