import React, {Fragment, useEffect} from 'react';
import {useSearch} from '../../hooks';
import {FlatList, ListRenderItem, StyleSheet, ViewStyle} from 'react-native';
import SearchBar from '../SearchBar';
import EmptyList from '../EmptyList';

interface SearchListProps<T extends {id: string}> {
  style?: ViewStyle; // Additional styles for the card
  data: T[]; // Generic data prop
  renderListItem: ListRenderItem<T>;
  filter: (filterValue: string | null) => void;
}

const SearchList = <T extends {id: string}>({
  data,
  filter,
  renderListItem,
}: SearchListProps<T>) => {
  const {query, updateQuery, debouncedQuery} = useSearch<string>();

  useEffect(() => {
    filter(debouncedQuery);
  }, [debouncedQuery, filter]);
  return (
    <Fragment>
      <SearchBar onChange={updateQuery} value={query ?? ''} />
      <Fragment>
        <FlatList
          data={data}
          renderItem={renderListItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
        {data.length === 0 && <EmptyList style={styles.empty} />}
      </Fragment>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  empty: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchList;
