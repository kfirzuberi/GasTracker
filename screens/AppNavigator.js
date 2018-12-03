import { createStackNavigator, createAppContainer } from 'react-navigation';


import NewRecordScreen from './NewRecordScreen';
import RecordsListScreen from './RecordsListScreen';


const AppNavigator = createStackNavigator({
  NewRecordScreen: { screen: NewRecordScreen },
  HomeScreen: { screen: RecordsListScreen },
});

export default createAppContainer(AppNavigator);