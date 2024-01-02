import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


const App: React.FC = () => {
	const authToken = localStorage.getItem('authToken');
	const [isAuthenticated, setIsAuthenticated] = useState(!!authToken);
	const onLogin = () => {
		setIsAuthenticated(true);
	}

	return (
		<Router>
			<Routes>
				<Route path='/login' element={isAuthenticated ? <Navigate to='/posts' /> : <LoginPage onLogin={onLogin} />} />
				<Route path='/posts' element={!isAuthenticated ? <Navigate to='/login' /> : <Dashboard />} />
				<Route path='/' element={<Navigate to='/login' />} />
			</Routes>
		</Router>
	);
}

export default App;
