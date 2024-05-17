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
      className="cursor-pointer select-none text-3xl border-2 border-solid border-transparent hover:border-L-D-P rounded-full px-1 py-1.5 hover:bg-L-D-P hover:bg-opacity-15"
    >
      {theme === 'light' ? '☀️' : '🌙'}
    </span>
  );
}
