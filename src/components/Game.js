import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Text, View } from 'react-native';

import GuessButton from './GuessButton';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIds: [],
      counter: this.props.initialCounter
    };
  }

  componentDidMount = () => {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => {
        return { counter: prevState.counter -= 1};
      }, () => {
        if (this.state.counter === 0) {
          clearInterval(this.intervalId);
        }
      });
    }, 1000);
  };

  componentWillUpdate = (nextProps, nextState) => {
    if (nextState.selectedIds !== this.state.selectedIds || nextState.counter === 0) {
      this.gameStatus = this.determineGameStatus(nextState);
      if (this.gameStatus !== 'PLAYING') {
        clearInterval(this.intervalId);
      }
    } 
  };

  componentWillUnmount = () => {
    clearInterval(this.intervalId);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={ [styles.target, styles[`STATUS_${this.gameStatus}`]] }>{this.target}</Text>
        <View style={styles.numberContainer}>
          {this.randomNumbers.map((randomNumber, index) => 
            (<GuessButton 
              key={index}
              id={index} 
              number={randomNumber}
              handleSelect={this.selectNumber} 
              isSelected={this.isNumberSelected(index) || this.gameStatus !== 'PLAYING'}
            />)
          )}
        </View>
        <View>
          <Text>{this.gameStatus !== 'PLAYING' && this.gameStatus === 'WON' && `:)` }</Text>
          <Text>{this.gameStatus !== 'PLAYING' && this.gameStatus === 'LOST' && `:(` }</Text>
        </View>
        <View>
          <Text>{this.state.counter}</Text>
          <Text>{this.gameStatus}</Text>
        </View>
      </View>
    );
  }

  static propTypes = {
    guessButtonCount: PropTypes.number.isRequired,
    initialCounter: PropTypes.number.isRequired
  };

  gameStatus = 'PLAYING';

  determineGameStatus = (nextState) => {
    const sumOfSelected = nextState.selectedIds
      .reduce((accumulator, currentElement) => {
        return accumulator + this.randomNumbers[currentElement]
      }, 0);
    if (nextState.counter === 0) {
      return 'LOST';
    } else if (sumOfSelected < this.target) {
      return 'PLAYING';
    } else if (sumOfSelected === this.target) {
      return 'WON';
    } else if (sumOfSelected > this.target) {
      return 'LOST';
    }
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

  // sumOfSelected = (nextState) => {
  //   return 
  // };

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
    textAlign: 'center'
  },
  numberContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center'
  },
  STATUS_PLAYING: {
    backgroundColor: '#bfdaef'
  },
  STATUS_WON: {
    backgroundColor: '#70d891'
  },
  STATUS_LOST: {
    backgroundColor: '#dd6a35'
  },
});
