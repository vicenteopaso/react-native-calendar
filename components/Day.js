import React, { Component, PropTypes } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import styles from './styles';

export default class Day extends Component {
  static defaultProps = {
    customStyle: {},
  }

  static propTypes = {
    caption: PropTypes.any,
    count: PropTypes.number,
    alert: PropTypes.bool,
    customStyle: PropTypes.object,
    filler: PropTypes.bool,
    event: PropTypes.object,
    isSelected: PropTypes.bool,
    isToday: PropTypes.bool,
    isWeekend: PropTypes.bool,
    onPress: PropTypes.func,
    showEventIndicators: PropTypes.bool,
  }

  dayCircleStyle = (isWeekend, isSelected, isToday, event) => {
    const { customStyle } = this.props;
    const dayCircleStyle = [styles.dayCircleFiller, customStyle.dayCircleFiller];

    if (isSelected) {
      if (isToday) {
        dayCircleStyle.push(styles.currentDayCircle, customStyle.currentDayCircle);
      } else {
        dayCircleStyle.push(styles.selectedDayCircle, customStyle.selectedDayCircle);
      }
    }

    return dayCircleStyle;
  }

  dayTextStyle = (isWeekend, isSelected, isToday, event) => {
    const { customStyle } = this.props;
    const dayTextStyle = [styles.day, customStyle.day];

    if (isToday && !isSelected) {
      dayTextStyle.push(styles.currentDayText, customStyle.currentDayText);
    } else if (isSelected) {
      dayTextStyle.push(styles.selectedDayText, customStyle.selectedDayText);
    }

    if (event) {
      dayTextStyle.push(styles.hasEventText, customStyle.hasEventText, event.hasEventText)
    }
    return dayTextStyle;
  }

  render() {
    let { caption, customStyle, count } = this.props;
    const {
      alert,
      filler,
      event,
      isWeekend,
      isSelected,
      isToday,
      showEventIndicators,
    } = this.props;

    return filler
    ? (
        <TouchableWithoutFeedback>
          <View style={[styles.dayButtonFiller, customStyle.dayButtonFiller]}>
            <Text style={[styles.day, customStyle.day]} />
          </View>
        </TouchableWithoutFeedback>
      )
    : (
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={[styles.dayButton, customStyle.dayButton]}>
            {count &&
              <View style={[
                styles.eventIndicatorFiller,
                customStyle.eventIndicatorFiller,
                event && styles.eventIndicator,
                event && customStyle.eventIndicator,
                event && event.eventIndicator]}
              >
                <Text style={customStyle.eventIndicatorText}>{count}</Text>
              </View>
            }
            <View style={this.dayCircleStyle(isWeekend, isSelected, isToday, event)}>
              <Text style={this.dayTextStyle(isWeekend, isSelected, isToday, event)}>{caption}</Text>
            </View>
            {alert && alert == true &&
              <View style={[
                styles.eventIndicatorFiller,
                customStyle.eventIndicatorFiller,
                event && styles.alertIndicator,
                event && customStyle.alertIndicator,
                event && event.alertIndicator]}
              />
            }
          </View>
        </TouchableOpacity>
      )
  }
}
