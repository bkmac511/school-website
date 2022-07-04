import { Popover, PopoverTrigger } from '@chakra-ui/react';
import { css } from '@emotion/react';
import Link from 'next/link';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  useInstantSearch,
  Index,
} from 'react-instantsearch-hooks-web';
import { searchClient } from '../lib/instantSearch';
import { getArticlePathBySlug } from '../services/utils';

function Hit({ hit }) {
  return (
    <>
    <Link href={getArticlePathBySlug(hit.slug)} passHref>
      <a>
        <Highlight attribute="title" hit={hit} />
      </a>
    </Link>
    </>
  );
}

export default function Search() {
  return (
    <div
      css={css`
        width: 100%;
        position: relative;
      `}
    >
        <InstantSearch indexName="article" searchClient={searchClient}>
            <SearchBox />
          <EmptyQueryBoundary fallback={null}>
            <Hits hitComponent={Hit} />
          </EmptyQueryBoundary>
        </InstantSearch>
    </div>
  );
}

function EmptyQueryBoundary({ children, fallback }) {
  const { indexUiState } = useInstantSearch();

  if (!indexUiState.query) {
    return fallback;
  }

  return children;
}
