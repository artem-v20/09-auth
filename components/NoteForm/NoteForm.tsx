'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../lib/api';
import { RiTelegram2Fill } from 'react-icons/ri';
import css from './NoteForm.module.css';
import { NewNote } from '@/types/note';
import { useRouter } from 'next/navigation';
import { useNoteDraftStore } from '@/lib/store/noteStore';

const NoteForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.back();
      clearDraft();
    },
  });

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as unknown as NewNote;
    mutation.mutate(values);
  };

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({
      ...draft,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <label className={css.formGroup}>
        Title
        <input
          className={css.input}
          onChange={handleChange}
          value={draft.title}
          name="title"
          type="text"
        />
      </label>

      <label className={css.formGroup}>
        Content
        <textarea
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={handleChange}
          name="content"
        />
      </label>

      <label className={css.formGroup}>
        Tag
        <select
          className={css.select}
          onChange={handleChange}
          value={draft.tag}
          name="tag"
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </label>
      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={false}>
          <RiTelegram2Fill />
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
