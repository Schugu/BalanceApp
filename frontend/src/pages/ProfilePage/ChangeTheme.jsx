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
    <div
      tabIndex={2}
      aria-label={`Cambiar de tema, tema actual: ${theme}`} 
      onClick={handleChangeTheme}
      className="cursor-pointer select-none text-3xl border-2 border-solid border-transparent hover:border-L-D-P rounded-full px-1 py-1.5 hover:bg-L-D-P hover:bg-opacity-15"
    >
      <span aria-hidden='true'>{theme === 'light' ? '☀️' : '🌙'}</span>
    </div>
  );
}
