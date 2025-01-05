import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, Pressable } from 'react-native';
import NoteList from './components/NoteList';
import { saveNotes, loadNotes, deleteNote } from './utils/storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import NoteModal from './components/NoteModal';

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
  const [color, setColor] = useState<string>('#ffeb3b');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchNotes = async () => {
      const loadedNotes = await loadNotes();
      setNotes(loadedNotes);
    };
    fetchNotes();
  }, []);

  const addNote = () => {
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
      setModalVisible(false);
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
      {/* Button to open the modal */}
      <Pressable style={styles.fab} onPress={() => setModalVisible(true)}>
        <AntDesign name="pluscircle" size={40} color="white" />
      </Pressable>

      {/* Modal for adding new note */}
      <NoteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        title={title}
        description={description}
        color={color}
        setTitle={setTitle}
        setDescription={setDescription}
        setColor={setColor}
        addNote={addNote}
      />

      {/* List of notes */}
      <NoteList notes={notes} handleDeleteNote={handleDeleteNote} />
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
  fab: {
    position: 'absolute',
    top: '95%',
    left: '53%',
    transform: [{ translateX: -30 }, { translateY: -30 }],  // Ajusta el botón al centro
    backgroundColor: '#007bff',
    borderRadius: 50,
    padding: 20,
    elevation: 5,
    zIndex: 999,  // Asegura que el botón esté sobre otros elementos
  },
});
