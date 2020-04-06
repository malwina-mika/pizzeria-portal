import {select, templates, settings, classNames} from '../settings.js';
import {utils} from '../utils.js';
import {AmountWidget} from './AmountWidget.js';
import {DatePicker} from './DatePicker.js';
import {HourPicker} from './HourPicker.js';

export class Booking {
  constructor(bookingWidgetContainer) {
    const thisBooking = this;

    thisBooking.render(bookingWidgetContainer);
    thisBooking.initWidgets();
    thisBooking.getData();
    thisBooking.initActions();
  }

  getData() {
    const thisBooking = this;

    const startDateParam = settings.db.dateStartParamKey + '=' + utils.dateToStr(thisBooking.datePicker.minDate);
    const endDateParam = settings.db.dateEndParamKey + '=' + utils.dateToStr(thisBooking.datePicker.maxDate);

    const params = {
      booking: [
        startDateParam,
        endDateParam,
      ],
      eventsCurrent: [
        settings.db.notRepeatParam,
        startDateParam,
        endDateParam,
      ],
      eventsRepeat: [
        settings.db.repeatParam,
        endDateParam,
      ],
    };

    // console.log('getData params', params);

    const urls = {
      booking:       settings.db.url  + '/' + settings.db.booking
                                      + '?' + params.booking.join('&'),
      eventsCurrent: settings.db.url  + '/' + settings.db.event
                                      + '?' + params.eventsCurrent.join('&'),
      eventsRepeat:   settings.db.url + '/' + settings.db.event
                                      + '?' + params.eventsRepeat.join('&'),
    };

    Promise.all([
      fetch(urls.booking),
      fetch(urls.eventsCurrent),
      fetch(urls.eventsRepeat),
    ])
      .then(function(allResponses){
        const bookingsResponse = allResponses[0];
        const eventsCurrentResponse = allResponses[1];
        const eventsRepeatResponse = allResponses[2];
        return Promise.all([
          bookingsResponse.json(),
          eventsCurrentResponse.json(),
          eventsRepeatResponse.json(),
        ]);
      })
      .then(function([bookings, eventsCurrent, eventsRepeat]){
        thisBooking.parseData(bookings, eventsCurrent, eventsRepeat);
      });
  }

  parseData(bookings, eventsCurrent, eventsRepeat) { //eslint-disable-line no-unused-vars
    const thisBooking = this;

    thisBooking.booked = {};

    for(let item of bookings) {
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);

    }

    for(let item of eventsCurrent) {
      thisBooking.makeBooked(item.date, item.hour, item.duration, item.table);

    }

    const minDate = thisBooking.datePicker.minDate;
    const maxDate = thisBooking.datePicker.maxDate;

    for(let item of eventsRepeat) {
      if(item.repeat == 'daily') {
        for(let loopDate = minDate; loopDate <= maxDate; loopDate = utils.addDays(loopDate, 1)) {
          thisBooking.makeBooked(utils.dateToStr(loopDate), item.hour, item.duration, item.table);
        }
      }
    }

    console.log('thisBooking.booked', thisBooking.booked);

    thisBooking.updateDOM();
  }

  makeBooked(date, hour, duration, table) {
    const thisBooking = this;

    if(typeof thisBooking.booked[date] == 'undefined') {
      thisBooking.booked[date] = {};
    }

    const startHour = utils.hourToNumber(hour);

    for(let hourBlock = startHour; hourBlock < startHour + duration; hourBlock += 0.5) {

      if(typeof thisBooking.booked[date][hourBlock] == 'undefined') {
        thisBooking.booked[date][hourBlock] = [];
      }

      if (typeof table == 'object') {
        for (let t of table) {
          thisBooking.booked[date][hourBlock].push(t);
        }
      } else {
        thisBooking.booked[date][hourBlock].push(table);
      }
    }
    thisBooking.updateDOM();
  }

  initActions() {
    const thisBooking = this;

    const tableBookedClass = classNames.booking.tableBooked;
    const tableSelectedClass = classNames.booking.tableSelected;

    for(let table of thisBooking.dom.tables) {

      table.addEventListener('click', function() {
        if(!table.classList.contains(tableBookedClass)) {
          if(table.classList.contains(tableSelectedClass)) {
            table.classList.remove(tableSelectedClass);
          } else {
            table.classList.add(tableSelectedClass);
            thisBooking.tableId = table.getAttribute(settings.booking.tableIdAttribute);
          }
        }
      });
    }



    thisBooking.dom.formBooking.addEventListener('submit', function(event) {

      event.preventDefault();
      if(thisBooking.tableId == undefined) {
        thisBooking.dom.forbidden.innerHTML = 'Wybierz stolik!';
      } else {
        if(thisBooking.isTableAvaible()){
          thisBooking.dom.forbidden.classList.add(classNames.booking.forbiddenBlue);
          thisBooking.dom.forbidden.innerHTML = 'Rezerwacja została dokonana!';
          window.setTimeout(function() {
            thisBooking.dom.forbidden.classList.remove(classNames.booking.forbiddenBlue); }
          , 2000);
          thisBooking.sendOrder();
        } else {
          thisBooking.dom.forbidden.innerHTML = 'Rezerwacja nie jest możliwa w wybranym przedziale czasowym';
        }
      }

      thisBooking.updateDOM();
      window.setTimeout(function() {
        const forbidden = document.querySelector(select.booking.forbidden);
        forbidden.innerHTML = ''; }
      , 2000);

    });
  }

  sendOrder() {
    const thisBooking = this;
    console.log('this booking', thisBooking);

    const url = settings.db.url + '/' + settings.db.booking;

    const payload = {
      date: thisBooking.datePicker.value,
      hour: thisBooking.hourPicker.value,
      // table: thisBooking.tableId,
      table: [],
      duration: thisBooking.hoursAmount.value,
      people: thisBooking.peopleAmount.value,
      starters: [],
      phone: thisBooking.dom.phone.value,
      address: thisBooking.dom.address.value,

    };


    for (let starter of thisBooking.dom.starters) {
      if (starter.checked) {
        payload.starters.push(starter.value);
      }
    }

    for (let table of thisBooking.dom.tables) {
      if (table.classList.contains(classNames.booking.tableSelected)) {
        thisBooking.tableId = table.getAttribute(settings.booking.tableIdAttribute);
        console.log('tableiD', thisBooking.tableId );
        console.log('table', table );
        if (!isNaN(thisBooking.tableId)) {
          thisBooking.tableId = parseInt(thisBooking.tableId);
        }
        payload.table.push(thisBooking.tableId);
      }
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    fetch(url, options)
      .then(function(response){
        return response.json();
      })
      .then(function(parsedResponse){
        console.log(parsedResponse);

        thisBooking.makeBooked(payload.date, payload.hour, payload.duration, payload.table);
        thisBooking.updateDOM();
      });

    thisBooking.tableId = undefined;
  }

  isTableAvaible() {
    const thisBooking = this;

    const endHour = thisBooking.hour + thisBooking.hoursAmount.value;

    const closeHour = settings.hours.close;

    let isTableAvaible = true;

    for(let i = thisBooking.hour; i < endHour; i += 1) {
      if(
        thisBooking.booked[thisBooking.date][i].includes(parseInt(thisBooking.tableId))
      ) {
        thisBooking.booked[thisBooking.date][i];
        return isTableAvaible = false;
      }
      if(endHour >= closeHour) {
        return isTableAvaible = false;
      }
    }

    return isTableAvaible;
  }

  updateDOM() {
    const thisBooking = this;

    thisBooking.date = thisBooking.datePicker.value;
    thisBooking.hour = utils.hourToNumber(thisBooking.hourPicker.value);

    let allAvailable = false;

    if(
      typeof thisBooking.booked[thisBooking.date] == 'undefined'
      ||
      typeof thisBooking.booked[thisBooking.date][thisBooking.hour] == 'undefined'
    ) {
      allAvailable = true;
    }

    for(let table of thisBooking.dom.tables) {
      let tableId = table.getAttribute(settings.booking.tableIdAttribute);

      if(!isNaN(tableId)){
        tableId = parseInt(tableId);
      }

      if(
        !allAvailable
      &&
        thisBooking.booked[thisBooking.date][thisBooking.hour].includes(tableId)
      ) {
        table.classList.add(classNames.booking.tableBooked);
        table.classList.remove(classNames.booking.tableSelected);

      } else {
        table.classList.remove(classNames.booking.tableBooked);
      }
    }
  }

  render(element) {
    const thisBooking = this;
    const generatedHTML = templates.bookingWidget();

    thisBooking.dom = {};
    thisBooking.dom.wrapper =  element;
    element.innerHTML = generatedHTML;

    thisBooking.dom.peopleAmount = thisBooking.dom.wrapper.querySelector(select.booking.peopleAmount);
    thisBooking.dom.hoursAmount = thisBooking.dom.wrapper.querySelector(select.booking.hoursAmount);
    thisBooking.dom.datePicker = thisBooking.dom.wrapper.querySelector(select.widgets.datePicker.wrapper);
    thisBooking.dom.hourPicker = thisBooking.dom.wrapper.querySelector(select.widgets.hourPicker.wrapper);

    thisBooking.dom.tables = thisBooking.dom.wrapper.querySelectorAll(select.booking.tables);

    thisBooking.dom.formBooking = thisBooking.dom.wrapper.querySelector(select.booking.formBooking);
    thisBooking.dom.formBookingSubmit = thisBooking.dom.wrapper.querySelector(select.booking.formBookingSubmit);
    thisBooking.dom.phone = thisBooking.dom.wrapper.querySelector(select.booking.phone);
    thisBooking.dom.address = thisBooking.dom.wrapper.querySelector(select.booking.address);
    thisBooking.dom.starters = thisBooking.dom.wrapper.querySelectorAll(select.booking.starters);
    thisBooking.dom.startersCheck = thisBooking.dom.wrapper.querySelectorAll(select.booking.startersCheck);
    thisBooking.dom.forbidden = thisBooking.dom.wrapper.querySelector(select.booking.forbidden);
  }

  initWidgets() {
    const thisBooking = this;
    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount, true);
    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);
    thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPicker);


    thisBooking.dom.wrapper.addEventListener('updated', function(){
      thisBooking.updateDOM();
    });
  }
}
