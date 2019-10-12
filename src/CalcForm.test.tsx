import * as React from 'react';
import { shallow } from 'enzyme';
import CalcForm from './CalcForm';

test('CalcForm changes the text after click', () => {
  const calcForm = shallow(<CalcForm />);

  // Interaction demo
  expect(checkbox.text()).toEqual('Off');
  checkbox.find('input').simulate('change');
  expect(checkbox.text()).toEqual('On');

  // Snapshot demo
  expect(checkbox).toMatchSnapshot();
});