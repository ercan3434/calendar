import { Component, OnInit } from '@angular/core';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi
} from "@fullcalendar/angular";
import { INITIAL_EVENTS, createEventId } from "../event-utils";
import trLocale from '@fullcalendar/core/locales/tr';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  calendarOptions: CalendarOptions = {
    locales: [ trLocale],
    height: "auto",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
    },
    initialView: "dayGridMonth",
    events: this.getEvents(), // alternatively, use the `events` setting to fetch from a feed
    weekends: true, // Whether to include Saturday/Sunday columns in any of the calendar views.
    editable: true, // Determines whether the events on the calendar can be modified.
    selectable: true, // Allows a user to highlight multiple days or timeslots by clicking and dragging.
    dayMaxEvents: true, // the number of events will be limited to the height of the day cell.
    lazyFetching: false, // Determines when event fetching should occur.
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
  };
  
  getEvents(): any {
    console.log("get");
    return INITIAL_EVENTS;
  }
  currentEvents: EventApi[] = [];

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt("Hatırlatıcı not giriniz");
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        `Notu silmek istediğinizden emin misiniz '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

}
