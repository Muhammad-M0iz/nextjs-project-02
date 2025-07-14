'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from '../store/store';
import { useState } from 'react';

export default function Providers({ children }) {
  const [client] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        {children}
      </QueryClientProvider>
    </Provider>
  );
}
