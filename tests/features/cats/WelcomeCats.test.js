import React from 'react';
import { shallow } from 'enzyme';
import { WelcomeCats } from '../../../src/features/cats';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<WelcomeCats />);
  expect(renderedComponent.find('.cats-welcome-cats').length).toBe(1);
});
