import { BrowserRouter } from 'react-router-dom';
import Button from './components/Button';
import Card from './components/Card';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 p-10">
          <div className="p-10">
            <h1>Test Komponen</h1>
            <div className="flex gap-4">
              <Button
                variant="primary"
                onClick={() => {
                  console.log('primary di klik');
                }}
              >
                Primary Button
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  console.log('secondary di klik');
                }}
              >
                Secondary Button
              </Button>
            </div>
            <Card className="mt-10">
              <h2 className="font-bold text-xl mb-2">Baso Polos</h2>
              <p className="text-gray-600">Bakso sapi pilihan tanpa isian</p>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
