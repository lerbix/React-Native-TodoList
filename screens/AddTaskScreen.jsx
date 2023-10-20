import { View, StyleSheet, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { storeTasks, retrieveTasks } from '../SecureStore';
import { AntDesign } from '@expo/vector-icons';


const AddTask = ({ route }) => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();


  const handleAddTask = async () => {
    if (title && description) {
      // Créez un nouvel objet de tâche avec un ID unique
      const newTask = {
        id: Date.now(),
        title: title,
        description: description,
        completed: false,
      };
      // Récupérez d'abord la liste des tâches existantes depuis SecureStore
      const existingTasks = await retrieveTasks();

      // Ajoutez la nouvelle tâche à la liste existante
      const updatedTasks = [...existingTasks, newTask];


      // Stockez la liste mise à jour dans SecureStore
      await storeTasks(updatedTasks).then(() => {
        console.log('Task successfully saved');
      });

      // Call the refreshTaskList callback to refresh the task list
      route.params.refreshTaskList();

      // Après avoir stocké la tâche, retournez à l'écran précédent
      navigation.goBack();
    } else {
      // Gérez le cas où le titre ou la description est manquant
      alert('Le titre et la description sont requis pour ajouter une tâche.');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Titre de la tâche :</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />

      <Text style={styles.label}>Description de la tâche :</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={(text) => setDescription(text)}
        multiline
      />


      <TouchableOpacity
        style={[styles.button]}
        onPress={handleAddTask}

      >
        <AntDesign name="pluscircleo" size={24} color="white" />
        <Text style={styles.buttonText}>Ajouter une tâche</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },


  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 15,
    marginTop: 10,
  },

  button: {
    backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
  },
});


export default AddTask;