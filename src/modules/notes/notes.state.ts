import { atom, useAtom } from 'jotai';
import type { Note } from './note.entity'; 

const notesAtom = atom<Note[]>([]);

export const useNoteStore = () => {
  const [notes, setNotes] = useAtom(notesAtom);
  const getAll = () => notes;
  const getOne = (id: number) => notes.find((note) => note.id === id);
  const set = (newNotes: Note[]) => {
    setNotes((oldNotes) => {
      const combineNotes = [...oldNotes, ...newNotes];
      const uniqueNotes: { [key: number]: Note } = {};

      for(const note of combineNotes) {
        uniqueNotes[note.id] = note;
      }

      return Object.values(uniqueNotes);
    });
  };
  const deleteNote = (id: number) => {
    const findChirdrenIds = (parentId: number): number[] => {
      const chirdrenIds = notes
        .filter((note)=>note.parentId == parentId)
        .map((child) => child.id);
      return chirdrenIds.concat(
        ...chirdrenIds.map((childId) => findChirdrenIds(childId)),
      );
    };

    const chirdrenIds = findChirdrenIds(id);
    setNotes((oldNotes) => 
      oldNotes.filter((note) => ![...chirdrenIds, id].includes(note.id)),
   );
  };
  const clear = () => setNotes([]);

  return { getAll, getOne, set, delete: deleteNote, clear };
};

// const store = useNoteStore();
// store.getAll();