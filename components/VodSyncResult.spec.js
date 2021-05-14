import React from 'react';
import renderer from 'react-test-renderer';
import VodSyncResult from './VodSyncResult';

describe('<VodSyncResult />', () => {
  it('renders correctly', async () => {
    const tree = renderer
      .create(<VodSyncResult result={'random result'} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
