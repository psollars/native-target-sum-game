import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Text, View } from 'react-native';

import GuessButton from './GuessButton';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIds: []
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.target}>{this.target}</Text>
        <View style={styles.numberContainer}>
          {this.randomNumbers.map((randomNumber, index) => 
            (<GuessButton 
              key={index}
              id={index} 
              number={randomNumber}
              handleSelect={this.selectNumber} 
              isSelected={this.isNumberSelected(index)}
            />)
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

  selectNumber = (numberIndex) => {
    this.setState((prevState) => ({
      selectedIds: [...prevState.selectedIds, numberIndex] 
    }));
  };

  isNumberSelected = (numberIndex) => {
    return this.state.selectedIds.indexOf(numberIndex) !== -1;
  };

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
    justifyContent: 'center'
  }
});
