import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './PirateStyle.module.css'
function DisplayPirates() {
    const [pirates, setPirates] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/pirates")
            .then((res) => {
                const sortedPirates = res.data.sort((a, b) => a.name.localeCompare(b.name));
                setPirates(sortedPirates);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const handleDelete = (id, position) => {
        axios.delete(`http://localhost:8000/api/pirates/${id}`)
            .then((res) => {
                setPirates(pirates.filter(pirate => pirate._id !== id));
                if (position === 'Captain') {
                    assignRandomCaptain();
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const assignRandomCaptain = () => {
        const nonCaptains = pirates.filter(pirate => pirate.position !== 'Captain');
        if (nonCaptains.length > 0) {
            const randomPirate = nonCaptains[Math.floor(Math.random() * nonCaptains.length)];
            axios.put(`http://localhost:8000/api/pirates/edit/${randomPirate._id}`, { position: 'Captain' })
                .then((res) => {
                    const updatedPirates = pirates.map(pirate => pirate._id === randomPirate._id ? { ...pirate, position: 'Captain' } : pirate);
                    setPirates(updatedPirates);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    return (
        <div>
            <h1>Pirate Crew</h1>
            <Link to="/pirate/new">Add Pirate</Link>
            {pirates.map((pirate) => (
                <div key={pirate._id} className={styles.dflex}>
                        <img width={200} height={200} src={pirate.ImgUrl} alt={pirate.name} />
                        <div>

                    <div className={styles.dflex}>
                        <h3>{pirate.name}</h3>
                        <p>{pirate.position}</p>
                    </div>
                    <div>
                        <Link to={`/pirate/${pirate._id}`}>View Pirate</Link>
                        <button onClick={() => handleDelete(pirate._id, pirate.position)}>Walk the Plank</button>
                    </div>
                        </div>
                </div>
            ))}
        </div>
    );
}

export default DisplayPirates;
