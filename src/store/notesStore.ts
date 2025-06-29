import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Priority = "low" | "medium" | "high";
export type SortType = "name" | "date" | "priority";

export interface Note {
  id: string;
  title: string;
  content: string;
  priority: Priority;
  createdAt: string;
}

interface NotesState {
  notes: Note[];
  searchQuery: string;
  sortType: SortType;
  addNote: (title: string, content: string, priority: Priority) => void;
  deleteNote: (id: string) => void;
  editNote: (
    id: string,
    title: string,
    content: string,
    priority: Priority
  ) => void;
  setSearchQuery: (query: string) => void;
  setSortType: (sortType: SortType) => void;
  getFilteredNotes: () => Note[];
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      notes: [],
      searchQuery: "",
      sortType: "date",
      addNote: (title, content, priority) =>
        set((state) => ({
          notes: [
            ...state.notes,
            {
              id: Date.now().toString(),
              title,
              content,
              priority,
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        })),
      editNote: (id, title, content, priority) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, title, content, priority } : note
          ),
        })),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSortType: (sortType) => set({ sortType }),
      getFilteredNotes: () => {
        const { notes, searchQuery, sortType } = get();

        let filtered = [...notes];

        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          filtered = filtered.filter((note) =>
            note.title.toLowerCase().includes(query)
          );
        }

        switch (sortType) {
          case "name":
            filtered.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case "date":
            filtered.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
            break;
          case "priority": {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            filtered.sort(
              (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
            );
            break;
          }
          default:
            break;
        }
        return filtered;
      },
    }),
    {
      name: "notes-storage",
      partialize: (state) => ({
        notes: state.notes,
        sortType: state.sortType,
        searchQuery: state.searchQuery,
      }),
    }
  )
);
