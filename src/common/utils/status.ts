import { Status } from '@prisma/client';

export function canChangeStatus(oldStatus: Status, newStatus: Status): boolean {
  const statusList = Object.values(Status);
  const oldStatusIndex = statusList.indexOf(oldStatus);
  const newStatusIndex = statusList.indexOf(newStatus);
  return newStatusIndex >= oldStatusIndex;
}

export function canEditElement(status: Status): boolean {
  return status === Status.DRAFT || status === Status.PUBLISHED;
}

export function isPublished(status: Status): boolean {
  return status === Status.PUBLISHED;
}
