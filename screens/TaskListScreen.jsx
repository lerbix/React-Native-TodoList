import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Button, Text, SafeAreaView, StyleSheet, FlatList, ScrollView, Animated } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import TaskItem from '../components/Task';
import { useNavigation } from '@react-navigation/native';
import { storeTasks, retrieveTasks } from '../SecureStore';
import { GestureHandlerRootView, RectButton, } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';


const TaskListScreen = () => {

  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);


  useEffect(() => {
    retrieveTasks().then((storedTasks) => {
      setTasks(storedTasks);
    });
  }, []);


  useEffect(() => {
    storeTasks(tasks);
  }, [tasks]);


  const handleToggleStatus = (taskId) => {
    // Recherchez la tâche dans la liste des tâches en utilisant son ID
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        // Si l'ID correspond, modifiez le statut de la tâche
        return {
          ...task,
          completed: !task.completed, // Inversez le statut actuel
        };
      }
      return task;
    });

    // Mettez à jour la liste des tâches avec le statut modifié
    setTasks(updatedTasks);

    // Mettez à jour SecureStore ici pour enregistrer la liste avec le statut modifié
    storeTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    // Supprimez la tâche ayant l'ID correspondant de la liste des tâches
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    // Vous pouvez également mettre à jour SecureStore ici pour enregistrer la liste sans la tâche supprimée
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    storeTasks(updatedTasks);
  };


  const handleAddTaskNavigation = () => {
    // Navigate to the "AddTaskScreen" and pass a callback function to refresh the task list
    navigation.navigate('Add Task', {
      refreshTaskList: () => {
        retrieveTasks().then((storedTasks) => {
          setTasks(storedTasks);
        });
      },
    });
  };

  const handleDeleteAllTasks = () => {
    setTasks([]);
    storeTasks([]);
  };


  const renderLeftActions = (progress, dragX, item, text) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });

    const handleClick = () => {
      handleToggleStatus(item.id);
    }
    return (
      <RectButton style={styles.leftAction} onPress={handleClick} >
        <View style={styles.actionLeftContainer}>
          <Animated.Text
            style={styles.actionLeft}>
            {text}
          </Animated.Text>
        </View>
      </RectButton>
    );
  };

  const renderRightActions = (progress, dragX, item, text) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });

    const handleClick = () => {
      handleDeleteTask(item.id);
    }
    return (
      <RectButton style={styles.leftAction} onPress={handleClick} >
        <View style={styles.actionRightContainer}>
          <Animated.Text
            style={styles.actionRight}>
            Supprimer
          </Animated.Text>
        </View>
      </RectButton>
    );
  };

  console.log('tasks: ' + tasks.length);
  console.log('taskes compl : ' + tasks.filter((task) => task.completed).length)

  console.log('taskes en attente : ' + tasks.filter((task) => !task.completed).length)


  return (

    <View style={styles.container}>

      {/* Buttons Tasks */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#548C85' }]}
          onPress={handleAddTaskNavigation}
        >
          <AntDesign name="pluscircleo" size={24} color="white" />
          <Text style={styles.buttonText}>Ajouter une tâche</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#DE172E' }]}
          onPress={handleDeleteAllTasks}
        >
          <AntDesign name="delete" size={24} color="white" />
          <Text style={styles.buttonText}>Supprimer toutes les tâches</Text>
        </TouchableOpacity>
      </View>


      {/* Pending Tasks */}
      <View style={styles.tasksContainer}>
        <View style={styles.TitleContainer}>
          <Ionicons name="hourglass" size={25} color="black" />
          <Text style={styles.sectionHeader}>En attente</Text>
        </View>

        <GestureHandlerRootView>

          {tasks.filter((task) => !task.completed).length > 0 ? (

            <FlatList
              data={tasks.filter((task) => !task.completed)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Swipeable renderLeftActions={(progress, dragX) => renderLeftActions(progress, dragX, item, text = 'Terminer')}

                  renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item)}

                >
                  <TaskItem task={item} onToggleStatus={handleToggleStatus} onDelete={handleDeleteTask} />
                </Swipeable>
              )}
            />
          ) : (

            <View style={styles.noDataMessageContainer}>
              <AntDesign name="exclamationcircle" size={25} color="gray" />
              <Text style={styles.noDataMessageText}>Aucune tâche en attente</Text>
            </View>

          )}
        </GestureHandlerRootView>
      </View>



      <View style={styles.tasksContainer}>
        {/* Completed Tasks */}

        <View style={styles.TitleContainer}>
          <Ionicons name="checkmark-circle" size={25} color="black" />
          <Text style={styles.sectionHeader}>Terminées</Text>
        </View>


        <GestureHandlerRootView>
          {tasks.filter((task) => task.completed).length > 0 ? (
            <FlatList
              data={tasks.filter((task) => task.completed)}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (

                <Swipeable renderLeftActions={(progress, dragX) => renderLeftActions(progress, dragX, item, text = 'En attente')}

                  renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item)}

                >
                  <TaskItem task={item} onToggleStatus={handleToggleStatus} onDelete={handleDeleteTask} />
                </Swipeable>
              )}
            />
          ) : (

            <View style={styles.noDataMessageContainer}>
              <AntDesign name="exclamationcircle" size={25} color="gray" />
              <Text style={styles.noDataMessageText}>Aucune tâche términées </Text>
            </View>
          )}

        </GestureHandlerRootView>


      </View>


    </View >

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF',
  },

  tasksContainer: {
    flex: 3,
    marginHorizontal: 10,
    marginBottom: 10,
  },

  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    gap: 10,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,

  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
  },

  noDataMessageContainer: {
    marginTop: 70,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  TitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-center',
    gap: 10,
    alignItems: 'center',
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#EDE7D9',
    borderRadius: 10,
  },

  noDataMessageText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },

  actionLeft: {
    fontWeight: '600',

  },

  actionLeftContainer: {
    backgroundColor: '#fb8500',
    padding: 20,
    borderRadius: 10,
    marginRight: 10,
  },

  actionRightContainer: {
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 10,
    marginLeft: 10,
  },

  actionRight: {
    color: 'white',
  }


});

export default TaskListScreen;


