import { Card } from '@components';
import { AboutUs, Error404, MainPage } from '@pages';

import React from 'react';

class App extends React.Component {
  render() {
    return (
      <>
        <MainPage />
        <AboutUs />
        <Error404 />
        <Card />
      </>
    );
  }
}

export default App;
