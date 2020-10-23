import { EventInput } from '@fullcalendar/angular';

let eventGuid = 0;

export const INITIAL_EVENTS: EventInput[] = [];

export function createEventId() {
  return String(eventGuid++);
}