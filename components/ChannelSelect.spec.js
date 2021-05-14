import React from 'react';
import renderer from 'react-test-renderer';
import ChannelSelect from './ChannelSelect';

describe('<ChannelSelect />', () => {
  it('renders correctly', async () => {
    const tree = renderer.create(<ChannelSelect />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
