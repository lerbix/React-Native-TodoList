import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskListScreen from './screens/TaskListScreen';
import AddTaskScreen from './screens/AddTaskScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tasks" component={TaskListScreen} />
      <Stack.Screen name="Add Task" component={AddTaskScreen} />
    </Stack.Navigator>
  );
}


export default AppNavigation; 