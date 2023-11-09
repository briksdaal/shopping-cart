import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [test, setTest] = useState(5);
  return (
    <>
      <Header />
      <main>
        <Outlet context={[test, setTest]} />
      </main>
      <Footer />
    </>
  );
}

export default App;
