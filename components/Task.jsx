import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';



const TaskItem = ({ task, onToggleStatus, onDelete, onSwipeRight }) => {
  const { id, title, description, completed } = task;

  return (

    <View style={styles.taskContainer}>
      <TouchableOpacity
        onPress={() => onToggleStatus(id)}
        style={[styles.statusButton, { backgroundColor: completed ? '#2EC4B6' : '#FF9F1C' }]}
      >
        <Ionicons name={completed ? 'md-checkmark' : 'hourglass'} size={24} color='white' />
      </TouchableOpacity>

      <View style={styles.taskDetails}>
        <Text style={styles.taskTitle}>{title}</Text>
        <Text>{description}</Text>
      </View>

      <TouchableOpacity
        onPress={() => onDelete(id)}
        style={styles.deleteButton}
      >
        <Ionicons name='md-trash' size={24} color='red' />
      </TouchableOpacity>
    </View>

  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#EDE7D9',
    borderRadius: 10,
    marginBottom: 10,
  },
  statusButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskDetails: {
    flex: 1,
    paddingHorizontal: 10,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TaskItem;
