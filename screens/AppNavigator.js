import { createStackNavigator, createAppContainer } from 'react-navigation';
import NewRecordScreen from './NewRecordScreen';
import RecordsListScreen from './RecordsListScreen';


const AppNavigator = createStackNavigator({
  HomeScreen: { screen: RecordsListScreen },
  NewRecordScreen: { screen: NewRecordScreen },
});

export default AppNavigator;