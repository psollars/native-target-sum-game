import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Text, View } from 'react-native';

export default class Game extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.target}>{this.target}</Text>
        <View style={styles.numberContainer}>
          {this.randomNumbers.map((randomNumber, index) => 
            (<Text style={styles.number} key={index}>{randomNumber}</Text>)
          )}
        </View>
      </View>
    );
  }

  static propTypes = {
    guessButtonCount: PropTypes.number.isRequired
  };

  randomNumbers = Array
    .from({ length: this.props.guessButtonCount })
    .map(() => 1 + Math.floor(10 * Math.random()));

  target = this.randomNumbers
    .slice(0, this.props.guessButtonCount - 2)
    .reduce((accumulator, currentElement) => accumulator + currentElement, 0);

} // end of component

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
  },
  numberContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    padding: 10,
    margin: 5,
    textAlign: 'center',
    width: (Dimensions.get('window').width/2)-15,
    backgroundColor: '#fff',
    fontSize: 22
  }
});
