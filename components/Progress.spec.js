import React from 'react';
import renderer from 'react-test-renderer';
import Progress from './Progress';

describe('<Progress />', () => {
  it('renders correctly', async () => {
    const tree = renderer.create(<Progress />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
