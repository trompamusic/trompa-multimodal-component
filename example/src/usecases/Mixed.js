import React from 'react';
import { MultiModalComponent, SearchConfig, searchTypes } from 'trompa-multimodal-component';

const config = new SearchConfig({
  searchTypes: [searchTypes.MusicComposition, searchTypes.DigitalDocument, searchTypes.AudioObject, searchTypes.VideoObject, searchTypes.Person],
});

export default () => {
  return (
    <MultiModalComponent
      config={config}
      onResultClick={item => console.log(item)}
    />
  );
};
