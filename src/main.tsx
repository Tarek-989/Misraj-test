import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query';
import client from './apolloClient';
import { ApolloProvider } from '@apollo/client';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</ApolloProvider>
	</React.StrictMode>,
)
