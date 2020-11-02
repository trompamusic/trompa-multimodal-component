import React from 'react';
import { MultiModalComponent, SearchConfig, searchTypes } from 'trompa-multimodal-component';

const config = new SearchConfig({
  searchTypes: [searchTypes.AudioObject],
  fixedFilter: { contributor_starts_with: 'https://www.voiceful.io' },
});

export default () => {
  return (
    <MultiModalComponent
      config={config}
      onResultClick={item => console.log(item)}
    />
  );
};
