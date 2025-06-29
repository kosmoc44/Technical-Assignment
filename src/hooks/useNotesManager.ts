import { useState } from "react";
import { type Priority, type Note, useNotesStore } from "@/store/notesStore";

export default function useNotesManager() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const { addNote, editNote } = useNotesStore();

  const handleAddOrEditNote = (
    title: string,
    content: string,
    priority: Priority
  ) => {
    if (editingNote) {
      editNote(editingNote.id, title, content, priority);
    } else {
      addNote(title, content, priority);
    }
    setIsModalOpen(false);
    setEditingNote(null);
  };

  return { isModalOpen, setIsModalOpen, handleAddOrEditNote, editingNote, setEditingNote };
}
