import {utils} from '../utils.js';
import {select, settings} from '../settings.js';
import BaseWidget from './BaseWidget.js';

export class DatePicker extends BaseWidget{
  constructor(wrapper) {
    super(wrapper, utils.dateToStr(new Date()));

    const thisWidget = this;
    // console.log('Date- this.value', thisWidget.value);
    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.datePicker.input);

    thisWidget.initPlugin();
  }

  initPlugin() {
    const thisWidget = this;

    thisWidget.minDate = new Date(thisWidget.value);
    thisWidget.maxDate = utils.addDays(
      thisWidget.minDate,
      settings.datePicker.maxDaysInFuture
    );

    const options = {
      defaultDate: thisWidget.minDate,
      minDate: thisWidget.minDate,
      maxDate: thisWidget.maxDate,
      locale: {
        firstDayOfWeek: 1
      },
      disable: [
        function(date) {
          // return true to disable
          return date.getDay() === 1;
        }
      ],
      onChange: function(selectedDates, dateStr, // eslint-disable-next-line  no-unused-vars
        instance) {
        thisWidget.value = dateStr;
      }
    };

    // eslint-disable-next-line no-undef
    flatpickr(thisWidget.dom.input, options);
  }

  parseValue(value) {
    return value;
  }

  isValid() {
    return true;
  }

  renderValue() {

  }
}
