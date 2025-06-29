import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useLanguage } from "@/context/useLanguageContext";
import { Languages, Search } from "lucide-react";
import SearchInput from "./Search";
import { useNotesStore } from "@/store/notesStore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

export const ComponentName: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { setSearchQuery } = useNotesStore();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ru" : "en");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between">
        {isSearchOpen ? (
          <SearchInput onClose={handleCloseSearch} />
        ) : (
          <>
            <div className="flex items-center gap-4">
              <Button onClick={toggleLanguage}>
                <Languages />
                {language === "en" ? "RU" : "EN"}
              </Button>
              <ModeToggle />
            </div>
            <h1 className="text-2xl font-medium">{t("Notes")}</h1>
            <div className="flex items-center gap-2">
              <Button onClick={() => setIsSearchOpen(true)} variant="outline">
                <Search />
              </Button>
              {user ? (
                <Button onClick={handleLogout}>{t("logout")}</Button>
              ) : (
                <Link to="/signin">
                  <Button>{t("login")}</Button>
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default ComponentName;
