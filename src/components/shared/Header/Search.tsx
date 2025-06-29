import { Button } from "@/components/ui/button";
import { useNotesStore } from "@/store/notesStore";
import { ArrowLeft, X } from "lucide-react";

interface SearchInputProps {
  onClose: () => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onClose }) => {
  const { searchQuery, setSearchQuery } = useNotesStore();

  const clearSearch = () => {
    setSearchQuery("");
  };
  return (
    <div className="w-full flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0"
        onClick={onClose}
      >
        <ArrowLeft size={20} />
      </Button>

      <div className="flex-1 flex items-center px-4 py-2 border rounded-lg bg-white dark:bg-neutral-900">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent outline-none"
          placeholder="Search..."
        />
      </div>
      {searchQuery && (
        <Button
          variant="ghost"
          size="icon"
          onClick={clearSearch}
          className="ml-2 shrink-0"
        >
          <X size={18} />
        </Button>
      )}
    </div>
  );
};

export default SearchInput;
