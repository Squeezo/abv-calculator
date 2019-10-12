import * as React from 'react';

interface Props {}

interface State {
  og: number;
  fg: number;
  abv: number;
};

export default class CalcForm extends React.Component<Props, State> {
  state: State = {
    og: 1.055,
    fg: 1.015,
    abv: 5.25
  };

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
      let name= e.currentTarget.name;
      let value = e.currentTarget.value;
      this.setState(Object.assign({}, this.state, { [name]: value } ));
  };

  render () {
    return (
      <fieldset>
        <legend>Enter your gravity values below:</legend>
        <div className='form'>
          <div className='fields'>
            <div>
                <label htmlFor='og'>OG:</label><input name='og' id='og' type='number' step={0.001} value={this.state.og} onChange={this.handleChange} />
            </div>
            <div>
                <label htmlFor='fg'>FG: </label><input name='fg' id='fg' type='number' step={0.001} value={this.state.fg} onChange={this.handleChange} />
            </div>
           
          </div>
          <div className='abv-display'>
            <span>ABV: </span>
            <span className='abv'>{calc(this.state.og, this.state.fg)}%</span>
          </div>
          
        </div>


      </fieldset>
    );
  }
}

function calc(og: number, fg: number) : number {
  return Math.floor(((og - fg) * 131.25) * 100) / 100;
}