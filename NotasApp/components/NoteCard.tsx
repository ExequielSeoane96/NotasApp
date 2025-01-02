import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Note = {
  id: number;
  title: string;
  description: string;
  color: string;
};

type NoteCardProps = {
  note: Note;
  onDelete: (id: number) => void;
};

const NoteCard = ({ note, onDelete }: NoteCardProps) => {
  return (
    <View style={[styles.card, { backgroundColor: note.color }]}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.description}>{note.description}</Text>
      <TouchableOpacity onPress={() => onDelete(note.id)} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '45%',
    margin: 8,
    padding: 10,
    borderRadius: 8,
    elevation: 5, // sombra para el estilo de la tarjeta
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginTop: 5,
  },
  deleteButton: {
    marginTop: 10,
    padding: 5,
    backgroundColor: '#ff4444',
    borderRadius: 5,
  },
  deleteText: {
    color: 'white',
  },
});

export default NoteCard;
