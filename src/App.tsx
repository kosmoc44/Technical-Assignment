import Header from "@/components/shared/Header/Header";
import Notes from "@/components/shared/Notes/Notes";
import { Plus } from "lucide-react";
import Modal from "@/components/shared/Modal/Modal";
import { useState } from "react";
import { Button } from "./components/ui/button";
import { type Priority, type Note, useNotesStore } from "@/store/notesStore";

function App() {
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

  return (
    <>
      <Header />
      <Notes setIsModalOpen={setIsModalOpen} setEditingNote={setEditingNote} />

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingNote(null);
          }}
          onAddNote={handleAddOrEditNote}
          editingNote={editingNote}
        />
      )}
      <Button
        size="lg"
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-10 right-10 rounded-lg"
      >
        <Plus />
      </Button>
    </>
  );
}

export default App;
