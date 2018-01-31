import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';

export default class GuessButton extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Text style={[ styles.number, this.props.isSelected ? styles.selected : null ]}>{this.props.number}</Text>
      </TouchableOpacity>
    );
  }

  static propTypes = {
    id: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    handleSelect: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired
  };

  handlePress = () => {
    if (!this.props.isSelected) {
      this.props.handleSelect(this.props.id);
      console.log(this.props.id);
    }
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
  },
  selected: {
    opacity: 0.3
  }
});
