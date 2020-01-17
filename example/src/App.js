import React  from 'react';
import { MultiModalComponent } from 'trompa-multimodal-component';

const App = () => {
  return (
    <MultiModalComponent
      onResultClick={item => console.log(item)}
    />
  );
};

export default App;
