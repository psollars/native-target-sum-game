import React from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';

export default class Game extends React.Component {
  target = 10 + Math.floor(40 * Math.random());
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.target}>{this.target}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    marginTop: 22
  },
  target: {
    width: Dimensions.get('window').width-20,
    padding: 10,
    margin: 10,
    fontSize: 40,
    textAlign: 'center',
    backgroundColor: '#ff22ff'
  }
});
