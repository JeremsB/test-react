import React from 'react';
import { shallow } from 'enzyme';
import { RandomCat } from '../../../src/features/cats';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<RandomCat />);
  expect(renderedComponent.find('.cats-random-cat').length).toBe(1);
});
