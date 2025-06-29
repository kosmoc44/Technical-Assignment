import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/context/useLanguageContext";
import { useNotesStore } from "@/store/notesStore";
import { ArrowDownWideNarrow } from "lucide-react";

export const SortName: React.FC = () => {
  const { t } = useLanguage();
  const setSortType = useNotesStore((state) => state.setSortType);
  const sortType = useNotesStore((state) => state.sortType);

  const getSortLabel = () => {
    switch (sortType) {
      case "name":
        return t("sortByName");
      case "date":
        return t("sortByDate");
      case "priority":
        return t("sortByPriority");
      default:
        return t("sort");
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <ArrowDownWideNarrow />
          <span>{getSortLabel()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setSortType("name")}>
          {t("sortByName")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSortType("date")}>
          {t("sortByDate")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSortType("priority")}>
          {t("sortByPriority")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortName;
