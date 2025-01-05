import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

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
        <AntDesign name="delete" size={20} color="white" />
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
    elevation: 5,
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
    borderWidth: 0.5,
    padding: 5,
    width: '25%',
    left: '35%',
    backgroundColor: '#ff4444',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NoteCard;
