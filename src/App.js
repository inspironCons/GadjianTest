import React, { Suspense } from 'react'
import './App.scss';

const DefaultLayout = React.lazy(()=> import('./container'))

function App() {

  const loader = () => <div className="loader">Loading...</div>

  return (
    <div className="app">
    <Suspense fallback={loader()}>
      <DefaultLayout />
    </Suspense>
    </div>
  );
}

export default App;
