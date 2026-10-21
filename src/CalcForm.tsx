import { useState } from 'react';
import { getAbv, gravityMessage } from './abv';

export default function CalcForm() {
  const [og, setOg] = useState('1.055');
  const [fg, setFg] = useState('1.015');

  const ogValue = Number.parseFloat(og);
  const fgValue = Number.parseFloat(fg);
  const message = gravityMessage(ogValue) || gravityMessage(fgValue);

  return (
    <fieldset>
      <legend>Enter your gravity values below:</legend>
      <div className='form'>
        <div>
          <label htmlFor='og'>OG:</label>
          <input
            name='og'
            id='og'
            type='number'
            step={0.001}
            value={og}
            onChange={(e) => setOg(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='fg'>FG:</label>
          <input
            name='fg'
            id='fg'
            type='number'
            step={0.001}
            value={fg}
            onChange={(e) => setFg(e.target.value)}
          />
        </div>
        <div className='abv-display'>
          <span className='label'>ABV: </span>
          <span className='abv'>{getAbv({ og: ogValue, fg: fgValue })}%</span>
        </div>
      </div>
      <p className='message' aria-live='polite'>{message}</p>
    </fieldset>
  );
}
