import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';

export default class GuessButton extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Text style={styles.number}>{this.props.number}</Text>
      </TouchableOpacity>
    );
  }

  static propTypes = {
    number: PropTypes.number.isRequired
  };

  handlePress = () => {
    console.log(this.props.number);
  }

} // end of component


const styles = StyleSheet.create({
  number: {
    padding: 10,
    margin: 5,
    textAlign: 'center',
    width: (Dimensions.get('window').width/2)-15,
    backgroundColor: '#fff',
    fontSize: 22
  }
});
