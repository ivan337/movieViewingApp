import { useTheme } from '@/provider/ThemeProvider';

const HomePage = () => {
    const { toggleTheme } = useTheme();

    return (
        <div>
            Home
            <button
                className="login__header-button"
                onClick={() => toggleTheme()}
            >
                test
            </button>
        </div>
    );
};

export default HomePage;
