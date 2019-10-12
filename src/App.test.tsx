import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme'; 
import CalcForm from './CalcForm';

describe("App Component", ()=> {

  it('contains a div with a class of .app', ()=>{
    const app = shallow(<App />);
    expect(app.find('.app')).toHaveLength(1);
  });

  it('renders a single CalcForm component', ()=> {
    const app = shallow(<App />);
    expect(app.find(CalcForm)).toHaveLength(1);
  });

  it('renders as expected', ()=> {
    const app = shallow(<App />);
    expect(app).toMatchSnapshot();
  });
});