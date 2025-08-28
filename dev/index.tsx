import React from 'react';
import ReactDOM from 'react-dom/client';
import Alwan from '../alwan';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Alwan
            options={{
                toggle: false
            }}
        />
    </React.StrictMode>
);
