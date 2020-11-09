import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import MultiModalComponent, { SearchConfig, searchTypes } from '../src/index';

const BlockQuote = ({ children }) => {
  return (
    <div style={{ backgroundColor: '#fff', borderLeft: `6px solid rgb(63 81 181)`, padding: 16, marginBottom: 8 }} >
      <Typography variant="caption">{children}</Typography>
    </div>
  );
};

const MultiModalComponentSelect = ({ config }) => {
  const [open, setOpen]         = useState(false);
  const [selected, setSelected] = useState();

  return (
    <React.Fragment>
      <div className="mmc-select">
        <Typography className="mmc-select-value">{selected ? selected.name : 'No selection'}</Typography>
        <Button variant="contained" size="small" color="primary" onClick={() => setOpen(true)}>
          Select
        </Button>
      </div>
      <Dialog PaperProps={{ style: { width: '100%' } }} open={open} keepMounted={false} onClose={() => setOpen(false)} maxWidth="md">
        <MultiModalComponent
          config={config}
          onResultClick={item => {
            setSelected(item);
            setOpen(false);
          }}
        />
      </Dialog>
    </React.Fragment>
  );
};

const uc1Config = new SearchConfig({
  searchTypes: [searchTypes.DigitalDocument],
  fixedFilter: {
    workExample_some: {
      identifier_in: ['56667d40-aa92-4106-a97e-9b28656c56e3', '7e36728d-6112-4deb-9240-1ff77e219f96', '25cdbfcb-af80-4fe6-9dc5-1ae47bcea5e0', 'b31c303e-3484-4787-896c-3c1048995103'],
    },
  },
});

const uc2Config = new SearchConfig({
  searchTypes: [searchTypes.AudioObject],
  fixedFilter: {
    creator_starts_with: 'https://www.voiceful.io',
    exampleOfWork      : { identifier: 'f7bd0cfc-0c34-4204-8435-47d81a825640' },
  },
});

const uc3Config = new SearchConfig({
  searchTypes: [searchTypes.DigitalDocument],
  fixedFilter: {
    workExample_some: { identifier: '56667d40-aa92-4106-a97e-9b28656c56e3' },
  },
});

const ex1Config = new SearchConfig({
  searchTypes: [searchTypes.Person],
});

const ex2Config = new SearchConfig({
  searchTypes: [searchTypes.AudioObject, searchTypes.VideoObject],
});

const ex3Config = new SearchConfig({
  searchTypes: [searchTypes.MusicComposition],
});

const ex4Config = new SearchConfig({
  searchTypes: [searchTypes.DigitalDocument],
});

const App = () => {
  return (
    <section className="section">
      <Paper style={{ padding: 16, backgroundColor: '#f1f1f1', marginBottom: 64 }} color="red" variant="outlined">
        <Typography variant="h6" gutterBottom>Examples:</Typography>
        <BlockQuote>
          As a user I want to be able to find a single type (Person) with related facets and filters.
        </BlockQuote>
        <MultiModalComponentSelect config={ex1Config} />
        <BlockQuote>
          As a user I want to be able to find multiple types (AudioObject and VideoObject) with related facets and filters.
        </BlockQuote>
        <MultiModalComponentSelect config={ex2Config} />
        <BlockQuote>
          As a user I want to be able to find music compositions with related facets and filters.
        </BlockQuote>
        <MultiModalComponentSelect config={ex3Config} />
        <BlockQuote>
          As a user I want to be able to find scores with related facets and filters.
        </BlockQuote>
        <MultiModalComponentSelect config={ex4Config} />
      </Paper>
      <Paper style={{ padding: 16, backgroundColor: '#f1f1f1', marginBottom: 64 }} color="red" variant="outlined">
        <Typography variant="h6" gutterBottom>Use cases:</Typography>
        <BlockQuote>
          Give me all scores with synth audios: I can find musical scores (DigitalDocument) with associated synthesized audios (AudioObject with creator: “https://www.voiceful.io/”).
        </BlockQuote>
        <MultiModalComponentSelect config={uc1Config} />
        <BlockQuote>
          I can find synthesized audios (AudioObject with creator: “https://www.voiceful.io/”) for a given score, DigitalDocument with id: “x”
        </BlockQuote>
        <MultiModalComponentSelect config={uc2Config} />
        <BlockQuote>
          I have this synth audio, give me the score from which it was created: I can find musical score (DigitalDocument) from which a synthesized audio, AudioObject with creator: “https://www.voiceful.io/”, was created.
        </BlockQuote>
        <MultiModalComponentSelect config={uc3Config} />
      </Paper>
    </section>
  );
};

export default App;
