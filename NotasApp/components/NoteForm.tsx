import React from 'react';
import { TextInput, Button, View, StyleSheet } from 'react-native';

type NoteFormProps = {
  title: string;
  description: string;
  color: string;
  setTitle: (text: string) => void;
  setDescription: (text: string) => void;
  setColor: (color: string) => void;
  addNote: () => void;
};

const NoteForm = ({
  title,
  description,
  color,
  setTitle,
  setDescription,
  setColor,
  addNote,
}: NoteFormProps) => {
  return (
    <View style={styles.formContainer}>
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
      <View style={styles.colorPicker}>
        <Button title="Yellow" onPress={() => setColor('#ffeb3b')} />
        <Button title="Green" onPress={() => setColor('#4caf50')} />
        <Button title="Orange" onPress={() => setColor('#ff9800')} />
        <Button title="Red" onPress={() => setColor('#f44336')} />
      </View>
      <Button title="Add Note" onPress={addNote} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  colorPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default NoteForm;
