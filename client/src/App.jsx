import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PirateForm from './components/PirateForm';
import './App.css';
import DisplayPirates from './components/DisplayPirates';
import Pirate from './components/Pirate';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/pirate/new" element={<PirateForm />} />
                <Route default path="/pirates" element={<DisplayPirates />} />
                <Route path="/" element={<DisplayPirates />} />
                <Route path="/pirate/:id" element={<Pirate />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
