import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import type { Priority, Note } from "@/store/notesStore";
import { X } from "lucide-react";
import { useLanguage } from "@/context/useLanguageContext";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNote: (title: string, content: string, priority: Priority) => void;
  editingNote?: Note | null;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onAddNote,
  editingNote,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [error, setError] = useState("");
  const { t } = useLanguage();

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setPriority(editingNote.priority);
    } else {
      setTitle("");
      setContent("");
      setPriority("medium");
    }
    setError("");
  }, [editingNote, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError(t("titleRequired"));
      return;
    }

    onAddNote(title, content, priority);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setPriority("medium");
    setError("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bg-white/60 dark:bg-neutral-900/60 inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-medium">{t("addNote")}</h2>
            <button onClick={onClose}>
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {t("title")} *
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg ${
                  error ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={t("noteTitle")}
              />
              {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {t("priority")}
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full px-4 py-2 border dark:bg-neutral-900  border-gray-300 rounded-lg"
              >
                <option value="high">{t("high")}</option>
                <option value="medium">{t("medium")}</option>
                <option value="low">{t("low")}</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">
                {t("content")}
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg min-h-[120px]"
                placeholder={t("noteContent")}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  resetForm();
                }}
              >
                {t("cancel")}
              </Button>
              <Button type="submit">
                {editingNote ? t("editNote") : t("addNote")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
