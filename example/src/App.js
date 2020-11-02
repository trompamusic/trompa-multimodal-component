import React, { useState }  from 'react';
import Default from './usecases/Default';
import Choir from './usecases/Choir';
import Enthusiast from './usecases/Enthusiast';
import Mixed from './usecases/Mixed';

const components = { Default, Choir, Enthusiast, Mixed };

const App = () => {
  const [useCase, setUseCase] = useState('Default');
  const Component             = components[useCase];

  return (
    <React.Fragment>
      <header className="header">
        <h4>Choose use-case:</h4>
        {Object.keys(components).map(name => (
          <button onClick={() => setUseCase(name)}>{name}</button>
        ))}
      </header>
      <Component />
    </React.Fragment>
  );
};

export default App;
