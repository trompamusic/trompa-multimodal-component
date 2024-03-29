import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import gql from 'graphql-tag';
import MultiModalComponent, { SearchConfig, searchTypes, SearchResult } from '../src/index';

class CustomType {
  static name = 'SoftwareApplication';

  static filters = [];

  static searchAllQuery = gql`
    query($query: String!, $first: Int = 9999) {
      allResults: searchMetadataText(onTypes: [SoftwareApplication], onFields: [title], substring: $query, first: $first) {
        ... on SoftwareApplication {
          identifier
          format
          _searchScore
        }
      }
    }
  `;

  static searchQuery = gql`
    query($filter: _SoftwareApplicationFilter) {
      results: SoftwareApplication(filter: $filter, first: 50) {
        __typename
        ... on SoftwareApplication {
          identifier
          name
          title
          creator
          source
        }
      }
    }
  `;
}

class PostprocessCustomType {
  static name = 'MusicComposition';

  static filters = [];

  static preprocessQuery = query => {
    return `(?i).*${query}.*`;
  }

  static searchAllQuery = gql`
    query($query: String!) {
      allResults: ItemList(identifier:"e91489d7-a776-40dd-8abf-0c934922bd99") {
        identifier
        name
        itemListElement(filter:{name_regexp:$query}) {
          identifier
          name
        }
      }
    }
  `;

  static searchQuery = gql`
    query($filter: _ThingInterfaceFilter) {
      results: ItemList(identifier:"e91489d7-a776-40dd-8abf-0c934922bd99") {
        identifier
        name
        itemListElement(filter: $filter, first: 50) {
          identifier
          name
        }
      }
    }
  `;

  static processSearchResult = result => {
    // Find the itemListElements of this ItemList, instead of a list of ItemLists
    if (Array.isArray(result) && result[0]) {
      return result[0].itemListElement;
    }

    return [];
  }
}

const BlockQuote = ({ children }) => {
  return (
    <div style={{ backgroundColor: '#fff', borderLeft: `6px solid rgb(63 81 181)`, padding: 16, marginBottom: 8 }}>
      <Typography variant="caption">{children}</Typography>
    </div>
  );
};

const MultiModalComponentSelect = ({ config, i18n, placeholderText, production, renderSearchResult }) => {
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
          uri={production ? 'https://api.trompamusic.eu' : 'https://api-test.trompamusic.eu'}
          config={config}
          placeholderText={placeholderText}
          renderSearchResult={renderSearchResult}
          i18n={i18n}
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

const ex5Config = new SearchConfig({
  searchTypes: [CustomType],
});

const ex6Config = new SearchConfig({
  searchTypes: [CustomType, searchTypes.MusicComposition],
});

const ex7Config = new SearchConfig({
  searchTypes: [PostprocessCustomType],
});

const App = () => {
  const [production, setProduction] = useState(false);

  return (
    <section className="section">
      <FormControlLabel
        control={
          <Switch
            checked={production}
            onChange={() => setProduction(!production)}
            name="production"
            color="primary"
          />
        }
        label="Production"
      />
      <Paper style={{ padding: 16, backgroundColor: '#f1f1f1', marginBottom: 64 }} color="red" variant="outlined">
        <Typography variant="h6" gutterBottom>Examples:</Typography>
        <BlockQuote>
          As a user I want to be able to find a single type (Person) with related facets.
        </BlockQuote>
        <MultiModalComponentSelect
          config={ex1Config}
          i18n={{
            'en-US': { searchBar: { placeholder_text: 'Search for Persons in the CE' } },
            'nl-NL': { searchBar: { placeholder_text: 'Zoek naar Personen in de CE' } },
          }}
          production={production}
        />
        <BlockQuote>
          As a user I want to be able to find multiple types (AudioObject and VideoObject) with related facets.
        </BlockQuote>
        <MultiModalComponentSelect config={ex2Config} placeholderText="Search for Music and Video recordings in the CE" production={production} />
        <BlockQuote>
          As a user I want to be able to find music compositions with related facets.
        </BlockQuote>
        <MultiModalComponentSelect config={ex3Config} production={production} />
        <BlockQuote>
          As a user I want to be able to find scores with related facets.
        </BlockQuote>
        <MultiModalComponentSelect config={ex4Config} placeholderText="Search for scores" production={production} />
        <BlockQuote>
          As a user I want to be able to find software applications using a custom type.
        </BlockQuote>
        <MultiModalComponentSelect
          config={ex5Config}
          placeholderText="Search for software applications"
          production={production}
          renderSearchResult={(type, item, onClick) => <SearchResult type="SOFTWARE" title={item.title} variant="default" onClick={() => onClick(item)} />}
        />
        <BlockQuote>
          As a developer I want to be able to customise the search results
        </BlockQuote>
        <MultiModalComponentSelect
          config={ex6Config}
          placeholderText="Search for software applications and MusicCompositions"
          production={production}
          renderSearchResult={(type, item, onClick) => {
            if (type === CustomType.name) {
              return <div onClick={() => onClick(item)}>CustomType: {item.title}</div>;
            }

            return <div onClick={() => onClick(item)}>MusicComposition: {item.title}</div>;
          }}
        />
        <BlockQuote>
          As a developer I want to be able to post-process search results.
        </BlockQuote>
        <MultiModalComponentSelect config={ex7Config} production={production} />
      </Paper>
      <Paper style={{ padding: 16, backgroundColor: '#f1f1f1', marginBottom: 64 }} color="red" variant="outlined">
        <Typography variant="h6" gutterBottom>Use cases:</Typography>
        <BlockQuote>
          Give me all scores with synth audios: I can find musical scores (DigitalDocument) with associated synthesized audios (AudioObject with creator: “https://www.voiceful.io/”).
        </BlockQuote>
        <MultiModalComponentSelect config={uc1Config} placeholderText="Search for scores with associated synthesized audios" production={production} />
        <BlockQuote>
          I can find synthesized audios (AudioObject with creator: “https://www.voiceful.io/”) for a given score, DigitalDocument with id: “x”
        </BlockQuote>
        <MultiModalComponentSelect config={uc2Config} placeholderText="Search for audio recordings for a given score" production={production} />
        <BlockQuote>
          I have this synth audio, give me the score from which it was created: I can find musical score (DigitalDocument) from which a synthesized audio, AudioObject with creator: “https://www.voiceful.io/”, was created.
        </BlockQuote>
        <MultiModalComponentSelect config={uc3Config} placeholderText="Search for a score" production={production} />
      </Paper>
    </section>
  );
};

export default App;
