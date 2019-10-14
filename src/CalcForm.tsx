import * as React from 'react';

interface State {
  og: number;
  fg: number;
};

export default class CalcForm extends React.Component<{}, State> {
  state: State = {
    og: 1.055,
    fg: 1.015
  };

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
      let name= e.currentTarget.name;
      let value = e.currentTarget.value;
      this.setState(Object.assign({}, this.state, { [name]: Number.parseFloat(value) } ));
  };

  render () {
    return (
      <fieldset>
        <legend>Enter your gravity values below:</legend>
        <div className='form'>
          <div className='fields'>
            <div>
                <label htmlFor='og'>OG:</label>
                <input name='og' id='og' type='number' step={0.001} min={1.00} max={1.999} value={this.state.og} onChange={this.handleChange} />
            </div>
            <div>
                <label htmlFor='fg'>FG: </label><input name='fg' id='fg' type='number' step={0.001} value={this.state.fg} onChange={this.handleChange} />
            </div>
           
          </div>
          <div className='abv-display'>
            <span>ABV: </span>
            <span className='abv'>{GetAbv({ og: this.state.og, fg: this.state.fg })}%</span>
          </div>
          
        </div>


      </fieldset>
    );
  }
}

export const GetAbv = ({ og, fg }: { og: number; fg: number; }) : any => {
  if (!og || !fg) return 0;
  if((og && typeof(og) === 'string') || (fg && typeof(fg) === 'string')) return 0;
  if((og && og < 1) || (fg && fg < 1)) return 0;
  if((og && og > 1.999) || (fg && fg > 1.999)) return 0;
  return Math.floor(((og - fg) * 131.25) * 100) / 100;
}