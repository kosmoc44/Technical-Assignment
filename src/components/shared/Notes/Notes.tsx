import NotesItem from "@/components/shared/Notes/NotesItem/NotesItem";
import { useLanguage } from "@/context/useLanguageContext";
import { useNotesStore, type Note } from "@/store/notesStore";
import { useMemo } from "react";
import SortName from "./SortNotes";

interface NotesProps {
  setIsModalOpen: (isOpen: boolean) => void;
  setEditingNote: (note: Note | null) => void;
}

export const Notes: React.FC<NotesProps> = ({
  setIsModalOpen,
  setEditingNote,
}) => {
  const { t } = useLanguage();

  const notes = useNotesStore((state) => state.notes);
  const searchQuery = useNotesStore((state) => state.searchQuery);
  const getFilteredNotes = useNotesStore((state) => state.getFilteredNotes);
  const sortType = useNotesStore((state) => state.sortType);

  const filteredNotes = useMemo(() => {
    return getFilteredNotes();
  }, [getFilteredNotes, notes, searchQuery, sortType]);

  return (
    <section className="mt-7 container mx-auto flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium">{t("allNotes")}</h2>
        <SortName />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 ">
        {notes.length === 0 ? (
          <div className="col-span-3 text-center py-10 text-gray-500">
            {t("noNotes")}
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="col-span-3 text-center py-10 text-gray-500">
            {t("noMatchingNotes")}
          </div>
        ) : (
          filteredNotes.map((note) => (
            <NotesItem
              key={note.id}
              note={note}
              setIsModalOpen={setIsModalOpen}
              setEditingNote={setEditingNote}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Notes;
