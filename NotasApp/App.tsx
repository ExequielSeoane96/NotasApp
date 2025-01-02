import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import NoteCard from './components/NoteCard';
import { saveNotes, loadNotes, deleteNote } from './utils/storage';

// Definir el tipo para las notas
type Note = {
  id: number;
  title: string;
  description: string;
  color: string;
};

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [color, setColor] = useState<string>('#ffeb3b'); // Color por defecto

  useEffect(() => {
    const fetchNotes = async () => {
      const loadedNotes = await loadNotes();
      setNotes(loadedNotes);
    };
    fetchNotes();
  }, []);

  const handleAddNote = () => {
    if (title && description) {
      const newNote: Note = {
        id: Date.now(),
        title,
        description,
        color,
      };
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      saveNotes(updatedNotes);
      setTitle('');
      setDescription('');
    } else {
      Alert.alert('Error', 'Both title and description are required');
    }
  };

  const handleDeleteNote = async (id: number) => {
    const updatedNotes = await deleteNote(id, notes);
    setNotes(updatedNotes);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Add Note" onPress={handleAddNote} />
      
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <NoteCard note={item} onDelete={handleDeleteNote} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#f7f7f7',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
