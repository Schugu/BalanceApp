import { useTheme } from '../../context/ThemeContext.jsx';
import Cookies from 'js-cookie';

export default function ChangeTheme() {
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      document.querySelector('html').classList.toggle('dark', newTheme === 'dark');
      Cookies.set('theme', newTheme, { expires: 365 });
      return newTheme;
    });
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
