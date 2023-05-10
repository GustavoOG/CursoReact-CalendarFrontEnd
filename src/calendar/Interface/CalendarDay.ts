export interface User {
    uid: string;
    name: string;
  }
  export interface CalendarDay {
    id: number|null;
    title: string;
    notes: string;
    start: Date;
    end: Date;
    bgColor: string;
    user: User | null;
  }
  