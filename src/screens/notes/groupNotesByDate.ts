// Function to format date
import {Note} from '../../user';

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.toLocaleString('default', {month: 'long'}); // e.g., "July"
  return `${day} ${month}`;
};

// Group notes by date
export const groupNotesByDate = (notes: Note[]) => {
  const grouped: {[key: string]: Note[]} = {};

  notes.forEach(note => {
    const title = formatDate(note.id);
    if (!grouped[title]) {
      grouped[title] = [];
    }
    grouped[title].push(note);
  });

  // Convert grouped object to an array of { title, notes }
  return Object.keys(grouped).map(title => ({
    title,
    notes: grouped[title],
  }));
};
