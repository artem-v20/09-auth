import css from './NoteList.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api/clientApi';
import type { Note } from '../../types/note';
import { RiDeleteBin2Line } from 'react-icons/ri';
import Link from 'next/link';

interface NoteListProps {
  notes: Note[];
}

const NoteList = ({ notes }: NoteListProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
  return (
    <ul className={css.list}>
      {notes.map(note => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link className={css.link} href={`/notes/${note.id}`}>
              View details
            </Link>
            <button
              className={css.button}
              onClick={() => mutation.mutate(note.id)}
            >
              <RiDeleteBin2Line />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
