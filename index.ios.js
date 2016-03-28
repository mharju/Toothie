import React, {
  AppRegistry,
  Component,
  View
} from 'react-native'
import {Toothie} from './app/toothie.js'


class App extends Component
{
    render() {
        return (
            <Toothie />
        );
    }
}

AppRegistry.registerComponent('Toothie', () => App);
