import React  from 'react'
import { MultiModalComponent } from 'trompa-multimodal-component'

const App = () => {
    return (
      <MultiModalComponent
        uri="https://api-test.trompamusic.eu/"
        onResultClick={(item) => console.log(item)}
      />
    );
};

export default App;
