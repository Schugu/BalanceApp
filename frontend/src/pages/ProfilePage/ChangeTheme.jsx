import { useEffect, useState } from "react";

export default function ChangeTheme() {
  const [theme, setTheme] = useState(() => {
    if (window.matchMedia('(prefers-colors-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.querySelector('html').classList.add('dark');
    } else {
      document.querySelector('html').classList.remove('dark');
    }
  }, [theme]);

  const handleChangeTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }

  return (
    <span
      onClick={handleChangeTheme}
      className="text-3xl cursor-pointer"
    >
    {theme === 'light' ? '☀️' : '🌙' }
    </span>
  )
}
