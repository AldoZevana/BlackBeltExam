import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import styles from './PirateStyle.module.css'

const PirateForm = () => {
  const [name, setName] = useState('');
  const [ImgUrl, setImgUrl] = useState('');
  const [treasure, setTreasure] = useState(0);
  const [catchPhrase, setCatchPhrase] = useState('');
  const [position, setPosition] = useState('Captain');
  const [pegLeg, setPegLeg] = useState(true);
  const [eyePatch, setEyePatch] = useState(true);
  const [hookHand, setHookHand] = useState(true);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const FormHandler = (e) => {
    e.preventDefault();
    let formErrors = {};
    if (name.length < 3) formErrors.name = { message: 'Name must be at least 3 characters long!' };
    if (!ImgUrl) formErrors.ImgUrl = { message: 'Image URL is required!' };

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    axios.post('http://localhost:8000/api/pirate/new', 
      { name, ImgUrl, position, hookHand, pegLeg, eyePatch, catchPhrase, treasure })
      .then((res) => {
        console.log(res.data);
        setName('');
        setCatchPhrase('');
        setTreasure(0);
        setImgUrl('');
        setPosition('Captain');
        setEyePatch(true);
        setPegLeg(true);
        setHookHand(true);
        setErrors({});
        navigate(`/pirate/${res.data._id}`);
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div>
      <h1>Add Pirate</h1>
      <Link to="/pirates">Crew Board</Link>
      <form onSubmit={FormHandler} className={styles.dflex}>
        <div>

        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" value={ImgUrl} onChange={(e) => setImgUrl(e.target.value)} />
          {errors.ImgUrl && <p>{errors.ImgUrl.message}</p>}
        </div>
        <div>
          <label># of Treasure Chests:</label>
          <input type="number" value={treasure} onChange={(e) => setTreasure(e.target.value)} />
          {errors.treasure && <p>{errors.treasure.message}</p>}
        </div>
        <div>
          <label>Pirate Catchphrase:</label>
          <input type="text" value={catchPhrase} onChange={(e) => setCatchPhrase(e.target.value)} />
          {errors.catchPhrase && <p>{errors.catchPhrase.message}</p>}
        </div>
        </div>
        <div>

        <div>
          <label>Crew Position:</label>
          <select value={position} onChange={(e) => setPosition(e.target.value)}>
            <option value="Captain">Captain</option>
            <option value="First Mate">First Mate</option>
            <option value="Quarter Master">Quarter Master</option>
            <option value="Boatswain">Boatswain</option>
            <option value="PowderMonkey">Powder Monkey</option>
          </select>
        </div>
        <div>
          <label>Peg Leg:</label>
          <input type="checkbox" checked={pegLeg} onChange={(e) => setPegLeg(e.target.checked)} />
        </div>
        <div>
          <label>Eye Patch:</label>
          <input type="checkbox" checked={eyePatch} onChange={(e) => setEyePatch(e.target.checked)} />
        </div>
        <div>
          <label>Hook Hand:</label>
          <input type="checkbox" checked={hookHand} onChange={(e) => setHookHand(e.target.checked)} />
        </div>
        <input type="submit" value="Add Pirate" />
        </div>
      </form>
    </div>
  );
};

export default PirateForm;
