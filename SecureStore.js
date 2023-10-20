import * as SecureStore from 'expo-secure-store';

// Fonction pour stocker des tâches dans SecureStore
export const storeTasks = async (tasksToStore) => {
  try {
    const tasksJSON = JSON.stringify(tasksToStore);
    await SecureStore.setItemAsync('tasks', tasksJSON);
  } catch (error) {
    console.error('Erreur lors du stockage des tâches :', error);
  }
};

// Fonction pour récupérer des tâches depuis SecureStore
export const retrieveTasks = async () => {
  try {
    const tasksJSON = await SecureStore.getItemAsync('tasks');
    if (tasksJSON) {
      return JSON.parse(tasksJSON);
    } else {
      return [];
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches :', error);
    return [];
  }
};
