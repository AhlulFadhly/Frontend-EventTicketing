export interface DashboardSummary {

  totalEvents: number;

  publishedEvents: number;

  waitingApprovalEvents: number;

  draftEvents: number;

  cancelledEvents: number;

  ticketSold: number;

  revenue: number;

  myEvents: DashboardEvent[];

}

export interface DashboardEvent {

  eventId: number;

  title: string;

  ticketsSold: number;

  revenue: number;

}