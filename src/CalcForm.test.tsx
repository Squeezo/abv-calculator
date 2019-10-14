import * as React from 'react';
import { shallow } from 'enzyme';
import CalcForm  from './CalcForm';
import { GetAbv } from './CalcForm';

describe("CalcForm Component", ()=> {
  it('CalcForm displays the default value', () => {
  const calcForm = shallow(<CalcForm />);
  let v = calcForm.find('.abv');
  expect(v.text()).toEqual('5.25%');
  });

  /*

  validate that input recieves numbers
  validate that input min is 1.000
  validate that input max is 1.999
  validate that input length < 5


  */ 

  it('renders as expected', ()=> {
  const calcForm = shallow(<CalcForm />);  
  expect(calcForm).toMatchSnapshot();
  })
});

describe('GetAbv function', () => {
  it('returns the correct value for valid inputs', () => {
    expect(GetAbv({ og: 1.056, fg: 1.015 })).toEqual(5.38);
  });

  it('gracefully handles nulls', () => {
    expect(GetAbv({ fg: 1.015 })).toEqual(0);
    expect(GetAbv({ og: 1.058 })).toEqual(0);
  });

  it('block values under 1.000',()=>{
    expect(GetAbv({ og: 1.056, fg: 0.9999 })).toEqual(0);
    expect(GetAbv({ og: 0.9999, fg: 1.008 })).toEqual(0);
    expect(GetAbv({ og: 0.9999, fg: 0.9999 })).toEqual(0);
  });

  it('block values over 1.999',()=>{
    expect(GetAbv({ og: 1.056, fg: 2.000 })).toEqual(0);
    expect(GetAbv({ og: 2.000, fg: 1.008 })).toEqual(0);
    expect(GetAbv({ og: 2.000, fg: 2.000 })).toEqual(0);
  });

});