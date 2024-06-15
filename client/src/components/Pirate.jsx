import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from'./PirateStyle.module.css'

function Pirate() {
    const { id } = useParams();
    const [onePirate, setOnePirate] = useState({});
    const [pegLeg, setPegLeg] = useState(true);
    const [eyePatch, setEyePatch] = useState(true);
    const [hookHand, setHookHand] = useState(true);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pirate/${id}`)
            .then((res) => {
                setOnePirate(res.data);
                setPegLeg(res.data.pegLeg);
                setEyePatch(res.data.eyePatch);
                setHookHand(res.data.hookHand);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const updateField = (field, value) => {
        axios.put(`http://localhost:8000/api/pirates/edit/${id}`, { [field]: value })
            .then((res) => {
                setOnePirate(res.data);
                if (field === 'pegLeg') setPegLeg(value);
                if (field === 'eyePatch') setEyePatch(value);
                if (field === 'hookHand') setHookHand(value);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <h1>{onePirate.name}</h1>
            <div className={styles.dflex}>
              <div>
                <img src={onePirate.ImgUrl} alt={onePirate.name} />
                <h3>{onePirate.catchPhrase}</h3>
              </div>
              <div>

                <p>{onePirate.position}</p>
                <p>{onePirate.treasure} Treasure Chests</p>
                <div>
                    <label>Peg Leg:</label>
                    <input type="checkbox" checked={pegLeg} onChange={(e) => updateField('pegLeg', e.target.checked)} />
                </div>
                <div>
                    <label>Eye Patch:</label>
                    <input type="checkbox" checked={eyePatch} onChange={(e) => updateField('eyePatch', e.target.checked)} />
                </div>
                <div>
                    <label>Hook Hand:</label>
                    <input type="checkbox" checked={hookHand} onChange={(e) => updateField('hookHand', e.target.checked)} />
                </div>
              </div>
            </div>
        </div>
    );
}

export default Pirate;
