import * as React from 'react'
import { PageProps } from 'gatsby'

import { Layout } from '../components/Layout/Layout'
import { Header } from '../components/Header/Header'
import { useProtocolsSearch } from '../common/hooks/useProtocolsSearch'
import { ProtocolsList } from '../components/ProtocolsList/ProtocolsList'
import { Search as SearchComponent } from '../components/Search/Search'
import { useQueryParam, StringParam } from 'use-query-params'
import { Protocol } from '../common/types'

import * as styles from './Search.module.scss'

type PageContext = {
  allProtocols: Protocol[]
  allLicences: string[]
}

const Search = ({ pageContext }: PageProps<{}, PageContext>) => {
  const [query, setQuery] = useQueryParam('q', StringParam)
  const { protocols, loading } = useProtocolsSearch(pageContext.allProtocols, query)

  return (
    <Layout primary>
      <Header>
        <SearchComponent bordered query={query} onSearch={(q) => setQuery(q, 'push')} />
      </Header>
      <div className="content">
        <h1 className={styles.title}>
          <mark className={styles.mark}>{query ? protocols.length : 'All'}</mark> protocols {query ? `found for "${query}"` : ''}
        </h1>
        <div className="grid-3">
          <main className={styles.main}>{loading ? 'Loading...' : <ProtocolsList protocols={protocols} />}</main>
          <aside className="hide-mobile">
            <h3>Filters</h3>
          </aside>
        </div>
      </div>
    </Layout>
  )
}
export default Search
