import { Route, Routes } from 'react-router-dom';
import Home from './views/home/index.js';
import MainLayout from './layouts/main';

function App() {
    return (
        <>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </MainLayout>
        </>
    );
}

export default App;