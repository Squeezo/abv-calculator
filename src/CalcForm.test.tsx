import * as React from 'react';
import { shallow } from 'enzyme';
import CalcForm from './CalcForm';

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