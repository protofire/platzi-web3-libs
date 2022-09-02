import { Route, Routes } from 'react-router-dom';
import Home from './views/home/index.js';
import MainLayout from './layouts/main';
import { createContext, useState } from 'react';

const LibContext = createContext();

function App() {
    const [lib, setLib] = useState('');
	return (
		<>
			<LibContext.Provider value={{lib, setLib}}>
				<MainLayout>
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
				</MainLayout>
			</LibContext.Provider>
		</>
	);
}

export { App, LibContext };
