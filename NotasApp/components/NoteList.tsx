import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import NoteCard from './NoteCard';

type Note = {
  id: number;
  title: string;
  description: string;
  color: string;
};

type NoteListProps = {
  notes: Note[];
  handleDeleteNote: (id: number) => void;
};

const NoteList = ({ notes, handleDeleteNote }: NoteListProps) => {
  return (
    <FlatList
      data={notes}
      renderItem={({ item }) => (
        <NoteCard note={item} onDelete={handleDeleteNote} />
      )}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flexDirection: 'column',
  },
});

export default NoteList;
