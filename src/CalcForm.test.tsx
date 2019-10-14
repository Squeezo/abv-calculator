import * as React from 'react';
import { shallow } from 'enzyme';
import CalcForm  from './CalcForm';
import { GetAbv } from './CalcForm';
import { exact } from 'prop-types';

describe("CalcForm Component", ()=> {
  it('CalcForm displays the default value', () => {
    const calcForm = shallow(<CalcForm />);
    let v = calcForm.find('.abv');
    expect(v.text()).toEqual('5.25%');
  });

  it('displays the appropriate message when og input is too high',()=>{
    const calcForm = shallow(<CalcForm />);
    calcForm.find('#og').simulate('change', {
      currentTarget: { name: 'og', value: 2.00}
    });
    
    expect(calcForm.find('.message').text()).toMatch("Gravity must be 1.999 or less");
  });
  
  it('displays the appropriate message when og input is too low',()=>{
    const calcForm = shallow(<CalcForm />);
    calcForm.find('#og').simulate('change', {
      currentTarget: { name: 'og', value: 0.99}
    });
    
    expect(calcForm.find('.message').text()).toMatch("Gravity must be greater than 0.999");
  });

  it('displays the appropriate message when fg input is too high',()=>{
    const calcForm = shallow(<CalcForm />);
    calcForm.find('#fg').simulate('change', {
      currentTarget: { name: 'fg', value: 2.00}
    });
    
    expect(calcForm.find('.message').text()).toMatch("Gravity must be 1.999 or less");
  });
  
  it('displays the appropriate message when fg input is too low',()=>{
    const calcForm = shallow(<CalcForm />);
    calcForm.find('#fg').simulate('change', {
      currentTarget: { name: 'fg', value: 0.99}
    });
    
    expect(calcForm.find('.message').text()).toMatch("Gravity must be greater than 0.999");
  });

  it('reset the error message when a valid input is entered',()=>{
    const calcForm = shallow(<CalcForm />);
    calcForm.find('#fg').simulate('change', {
      currentTarget: { name: 'fg', value: 1.008}
    });
    
    expect(calcForm.find('.message').text()).toMatch('');
  });

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