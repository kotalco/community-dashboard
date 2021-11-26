import { StatusData } from '@interfaces/StatusData';

export enum Status {
  POD_INITIALIZING = 'PodInitializing',
  CONTAINER_CREATIING = 'ContainerCreating',
  TERMINATING = 'Terminating',
  NOT_FOUND = 'NotFound',
  ERROR = 'Error',
  PENDING = 'Pending',
  RUNNING = 'Running',
  DISCONNECTED = 'Disconnected',
}

export const getStatus = (value: Status): StatusData => {
  switch (value) {
    case Status.CONTAINER_CREATIING:
      return { status: value, label: 'Creating Container', color: '#F59E0B' };
    case Status.POD_INITIALIZING:
      return { status: value, label: 'Initializing Pod', color: '#F59E0B' };
    case Status.TERMINATING:
      return { status: value, label: 'Terminating', color: '#F59E0B' };
    case Status.NOT_FOUND:
      return { status: value, label: 'Not Found', color: '#EF4444' };
    case Status.ERROR:
      return { status: value, label: 'Error', color: '#EF4444' };
    case Status.PENDING:
      return { status: value, label: 'Pending', color: '#6B7280' };
    case Status.RUNNING:
      return { status: value, label: 'Running', color: '#10B981' };
    default:
      return {
        status: Status.DISCONNECTED,
        label: 'Disconnected',
        color: 'red',
      };
  }
};
