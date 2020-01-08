import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import ShowMoreButton from '../../shared/ShowMoreButton';
import Typography from '@material-ui/core/Typography';
import styles from './SearchResultProduct.styles';
import translate from 'react-i18next/dist/commonjs/translate';
import Avatar from '@material-ui/core/Avatar/Avatar';
import { SearchContext } from '../../components/SearchProvider/SearchProvider';

class SearchResultProduct extends Component {
  ellipsis = (textSource, maxLength) => {
    if (textSource.length >= maxLength) {
      return textSource.substr(0, maxLength) + '...'
    }

    return textSource;
  };

  render() {
    const { t, classes, data, count } = this.props;

    return (
      <SearchContext.Consumer>
        {({ searchPhrase, selectedCategory, setCategory }) => (
          <Fragment>
            {count !== 0 ? (
              <Fragment>
                <div className={classes.header}>
                  <Typography variant="h5">{t('product_result.product')} ({count})</Typography>
                  {selectedCategory === 'all' ? (
                    <ShowMoreButton onClick={event => setCategory(event, "Product")} />
                  ) : null}
                </div>
                <div className={classes.productResultsContainer}>
                  {data && data.map(({ identifier, source, description, name, image }) => (
                    <Paper key={identifier} className={classes.productContainer}>
                      <Fragment>
                        {image ? (
                          <Avatar className={classes.image} src={image} alt="Product thumbnail" />
                        ) : <Avatar className={classes.image} />}
                      </Fragment>
                      <div className={classes.contentContainer}>
                        <Fragment>
                          <Typography variant="h5" className={classes.name}>
                            {name ? name : t('empty_results.no_title')}
                          </Typography>
                          <Typography variant="subtitle2">
                            {source ? <Link href={source} target="_blank">{source}</Link> : t('empty_results.no_source')}
                          </Typography>
                          <Typography paragraph className={classes.description}>
                            {description ? this.ellipsis(description, 250) : t('empty_results.no_description')}
                          </Typography>
                        </Fragment>
                      </div>
                    </Paper>
                  ))}
                </div>
              </Fragment>
            ) : null}
            {count === 0 && selectedCategory === 'Product' ? (
              <Typography className={classes.noResultsText} variant="h4">
                No results for products relating to "{searchPhrase}"
              </Typography>
            ) : null}
          </Fragment>
        )}
      </SearchContext.Consumer>
    );
  }
}

export default translate('searchResults')(withStyles(styles)(SearchResultProduct));