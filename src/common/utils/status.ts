import { Status } from '@prisma/client';

export function canChangeStatus(oldStatus: Status, newStatus: Status): boolean {
  if (oldStatus === newStatus) return true;
  switch (oldStatus) {
    case Status.DRAFT:
      return true;
    case Status.ARCHIVED:
      return newStatus === Status.DRAFT;
    case Status.PUBLISHED:
      return false;
  }
}

export function canEditElement(status: Status): boolean {
  return status === Status.DRAFT || status === Status.PUBLISHED;
}

export function isPublished(status: Status): boolean {
  return status === Status.PUBLISHED;
}
