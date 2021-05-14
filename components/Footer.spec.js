import React from 'react';
import renderer from 'react-test-renderer';
import Footer from './Footer';

describe('<Footer />', () => {
  it('renders correctly', async () => {
    const tree = renderer.create(<Footer />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
