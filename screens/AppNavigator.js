import { createStackNavigator, createAppContainer } from 'react-navigation';
import NewRecordScreen from './NewRecordScreen';
import RecordsListScreen from './RecordsListScreen';
import RecordDetailsScreen from './RecordDetailsScreen';

const AppNavigator = createStackNavigator({
  HomeScreen: { screen: RecordsListScreen },
  NewRecordScreen: { screen: NewRecordScreen },
  RecordDetailsScreen: { screen: RecordDetailsScreen }
});

export default AppNavigator;