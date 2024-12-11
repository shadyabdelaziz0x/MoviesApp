import React from 'react';
import {StyleSheet, TextInput, TextStyle} from 'react-native';

interface SearchBarProps {
  style?: TextStyle;
  placeholder?: string;
  placeholderTextColor?: string;
  value: string;
  onChange: (query: string) => void;
}

const SearchBar = ({
  style,
  placeholder,
  placeholderTextColor,
  value,
  onChange,
}: SearchBarProps) => {
  return (
    <TextInput
      style={[styles.searchBar, style]}
      placeholder={placeholder ?? 'Search for a movie...'}
      placeholderTextColor={placeholderTextColor ?? '#aaa'}
      value={value}
      onChangeText={onChange}
    />
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    color: '#333',
    fontSize: 16,
  },
});

export default React.memo(SearchBar);
