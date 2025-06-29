import Header from "@/components/shared/Header/Header";
import Notes from "@/components/shared/Notes/Notes";
import { Plus } from "lucide-react";
import Modal from "@/components/shared/Modal/Modal";
import { Button } from "./components/ui/button";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import SignIn from "./components/auth/signIn/SignIn";
import SignUp from "./components/auth/signUp/SignUp";
import useNotesManager from "./hooks/useNotesManager";
import { useAuthStore } from "./store/authStore";

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { user } = useAuthStore();

  const {
    isModalOpen,
    setIsModalOpen,
    handleAddOrEditNote,
    editingNote,
    setEditingNote,
  } = useNotesManager();

  if (isHomePage && !user) {
    return <Navigate to="/signin" />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
      {isHomePage && user && (
        <>
          <Notes
            setIsModalOpen={setIsModalOpen}
            setEditingNote={setEditingNote}
          />
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
      )}
    </>
  );
}

export default App;
