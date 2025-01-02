import AsyncStorage from '@react-native-async-storage/async-storage';

// Definir el tipo para las notas
type Note = {
  id: number;
  title: string;
  description: string;
  color: string;
};

// Función para guardar las notas
export const saveNotes = async (notes: Note[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(notes);
    await AsyncStorage.setItem('@notes', jsonValue);
  } catch (e) {
    console.error('Error saving notes', e);
  }
};

// Función para cargar las notas
export const loadNotes = async (): Promise<Note[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem('@notes');
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error loading notes', e);
    return [];
  }
};

// Función para eliminar una nota
export const deleteNote = async (id: number, notes: Note[]): Promise<Note[]> => {
  try {
    const updatedNotes = notes.filter(note => note.id !== id);
    await saveNotes(updatedNotes);
    return updatedNotes;
  } catch (e) {
    console.error('Error deleting note', e);
    return notes;
  }
};
