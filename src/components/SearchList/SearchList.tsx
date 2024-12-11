import React, {Fragment, useEffect} from 'react';
import {useSearch} from '../../hooks';
import {FlatList, ListRenderItem, StyleSheet, ViewStyle} from 'react-native';
import SearchBar from '../SearchBar';
// import EmptyList from '../EmptyList';

interface SearchListProps<T extends {id: string}> {
  style?: ViewStyle; // Additional styles for the card
  data: T[]; // Generic data prop
  isLoading?: boolean;
  renderListItem: ListRenderItem<T>;
  filter: (filterValue: string | null) => void;
  renderSeparator: () => React.ReactNode;
  renderEmptyView?: () => React.ReactNode;
  LoadingView: () => React.ReactNode;
}

const ITEM_LENGTH = 300;
const SEPARATOR_LENGTH = 16;

const SearchList = <T extends {id: string}>({
  data,
  isLoading,
  filter,
  renderListItem,
  renderSeparator,
  renderEmptyView,
  LoadingView,
}: SearchListProps<T>) => {
  const {query, updateQuery, debouncedQuery} = useSearch<string>();

  useEffect(() => {
    filter(debouncedQuery);
  }, [debouncedQuery, filter]);

  const getItemLayout = (_: ArrayLike<T> | null | undefined, index: number) => {
    return {
      index,
      offset: (ITEM_LENGTH + SEPARATOR_LENGTH) * index,
      length: ITEM_LENGTH,
    };
  };

  return (
    <Fragment>
      <SearchBar onChange={updateQuery} value={query ?? ''} />
      <Fragment>
        {isLoading ? (
          <LoadingView />
        ) : (
          <FlatList
            data={data}
            renderItem={renderListItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            ItemSeparatorComponent={renderSeparator}
            getItemLayout={getItemLayout}
            removeClippedSubviews={true}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            windowSize={5}
            ListEmptyComponent={renderEmptyView}
          />
        )}
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
