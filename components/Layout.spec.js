import React from 'react';
import renderer from 'react-test-renderer';
import Layout from './Layout';

describe('<Layout />', () => {
  it('renders correctly', async () => {
    const tree = renderer.create(<Layout />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
