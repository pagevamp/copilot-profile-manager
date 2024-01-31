export function getTimeAgo(dateString: string): string {
  const currentDate = new Date();
  const inputDate = new Date(dateString);

  const timeDifferenceInSeconds = Math.floor((currentDate.getTime() - inputDate.getTime()) / 1000);

  if (timeDifferenceInSeconds < 60) {
    return 'just now';
  } else if (timeDifferenceInSeconds < 3600) {
    const minutes = Math.floor(timeDifferenceInSeconds / 60);
    return `${minutes}m`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hours = Math.floor(timeDifferenceInSeconds / 3600);
    return `${hours}h`;
  } else if (timeDifferenceInSeconds < 2592000) {
    const days = Math.floor(timeDifferenceInSeconds / 86400);
    return `${days}d`;
  } else if (timeDifferenceInSeconds < 31536000) {
    const months = Math.floor(timeDifferenceInSeconds / 2592000);
    return `${months}mo`;
  } else {
    const years = Math.floor(timeDifferenceInSeconds / 31536000);
    return `${years}y`;
  }
}
