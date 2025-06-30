import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNotesStore, type Note } from "@/store/notesStore";
import { Pencil, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";
import { useLanguage } from "@/context/useLanguageContext";
import { AnimatePresence, motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";

interface NotesItemProps {
  note: Note;
  setIsModalOpen: (isOpen: boolean) => void;
  setEditingNote: (note: Note | null) => void;
}

export const NotesItem: React.FC<NotesItemProps> = ({
  note,
  setIsModalOpen,
  setEditingNote,
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const deleteNote = useNotesStore((state) => state.deleteNote);
  const searchQuery = useNotesStore((state) => state.searchQuery);
  const toggleNoteStatus = useNotesStore((state) => state.toggleNoteStatus);
  const { t } = useLanguage();

  const handleDelete = () => {
    setIsDeleting(true);
    setIsDeleteDialogOpen(false);

    setTimeout(() => {
      deleteNote(note.id);
    }, 500);
  };

  const handleEdit = () => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const priorityStyles = {
    low: "bg-green-500 text-neutral-900",
    medium: "bg-yellow-400 text-neutral-900",
    high: "bg-red-500",
  };

  return (
    <AnimatePresence>
      {!isDeleting && (
        <motion.div
          key={note.id}
          ref={cardRef}
          initial={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 0.9,
            height: 0,
            paddingTop: 0,
            paddingBottom: 0,
            marginBottom: 0,
          }}
          transition={{ duration: 0.3 }}
          className="p-4 shadow-md rounded-md dark:border-1 mb-4"
        >
          <div className="flex flex-col gap-2 mb-4">
            <h1 className="text-md font-medium border-b-1">{note.title}</h1>
            <span className="text-sm text-gray-600">
              {new Date(note.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-gray-700 mb-4 border-b-1">{note.content}</p>
          <div className="flex flex-col sm:flex-row items-center gap-4 md:justify-between">
            <div className="flex items-start flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-md font-medium">{t("priority")}:</span>
                <Badge className={`px-4 ${priorityStyles[note.priority]}`}>
                  {t(note.priority)}
                </Badge>
              </div>
              <div className="flex items-center gap-2 cursor-pointer w-full">
                <span className="text-md font-medium">{t("status")}:</span>
                <div className="flex items-center gap-2">
                  <label
                    htmlFor={`status-${note.id}`}
                    className="text-sm font-medium"
                  >
                    <Badge
                      variant={
                        note.status === "completed" ? "default" : "secondary"
                      }
                      className={`min-w-[80px] justify-center ${
                        note.status === "completed"
                          ? "bg-blue-100 text-blue-700 "
                          : "bg-gray-100 text-gray-800 "
                      }`}
                    >
                      {note.status === "completed"
                        ? t("completed")
                        : t("active")}
                    </Badge>
                  </label>
                  <Checkbox
                    id={`status-${note.id}`}
                    checked={note.status === "completed"}
                    onCheckedChange={() => toggleNoteStatus(note.id)}
                    className={
                      note.status === "completed"
                        ? "border-0 data-[state=checked]:bg-blue-700"
                        : "text-gray-500 border-gray-400"
                    }
                  />
                </div>
              </div>
            </div>
            {!searchQuery ? (
              <div className="flex items-center gap-2">
                <Button
                  className="bg-blue-700 hover:bg-blue-600 hover:text-white text-white"
                  variant="outline"
                  onClick={handleEdit}
                >
                  <Pencil /> {t("edit")}
                </Button>
                <Button
                  className="bg-red-700 hover:bg-red-600 hover:text-white text-white"
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(true)}
                >
                  <Trash2 /> {t("delete")}
                </Button>
                <DeleteConfirmationDialog
                  isOpen={isDeleteDialogOpen}
                  onOpenChange={setIsDeleteDialogOpen}
                  onConfirm={handleDelete}
                  title={`${t("deleteNote")}"${note.title}"?`}
                  description={t("deleteConfirmation")}
                />
              </div>
            ) : null}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotesItem;
