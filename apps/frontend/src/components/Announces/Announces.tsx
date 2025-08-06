import { useState, useCallback } from "react";
import { TfiAnnouncement } from "react-icons/tfi";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { LiaEdit } from "react-icons/lia";

import AnnounceModal from "../AnnouncesModal/AnnouncesModal";

import AnnouncesStyles from "./Announces.module.scss";

import { Announce, Team, User } from "../../utils/types/api";
import { deleteAnnounce } from "../../utils/api/announces";
import { useUser } from "../../contexts/UserContext";

interface AnnouncesProps {
  userId?: User["_id"];
  teamId?: Team["_id"];
  leaderId?: User["_id"];
  announces: Announce[];
}

const Announces = ({ userId, teamId, announces, leaderId }: AnnouncesProps) => {
  const [open, setOpen] = useState(false);
  const [editAnnounce, setEditAnnounce] = useState<Announce | null>(null);
  const [announcesList, setAnnouncesList] = useState<Announce[]>(announces);
  const { refreshUser, currentUser } = useUser();

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteAnnounce(id);
      setAnnouncesList((prev) => prev.filter((a) => a._id !== id)); // <-- MAJ locale
      refreshUser();
    },
    [refreshUser]
  );

  const handleEdit = useCallback((announce: Announce) => {
    setEditAnnounce(announce);
    setOpen(true);
  }, []);

  return (
    <div className={AnnouncesStyles.container}>
      <div className={AnnouncesStyles.header}>
        <h3 className={AnnouncesStyles.title}>Annonces</h3>
        {(currentUser?._id === userId || currentUser?._id === leaderId) && (
          <TfiAnnouncement
            onClick={() => setOpen(true)}
            size={24}
            title="Ajouter une annonce"
            cursor={"pointer"}
            color="gold"
          />
        )}
      </div>
      <div className={AnnouncesStyles.announcesList}>
        {announcesList.length > 0 ? (
          [...announcesList]
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((announce, index) => (
              <div key={index} className={AnnouncesStyles.announce}>
                <p>{announce.text}</p>

                <span className={AnnouncesStyles.date}>
                  {(currentUser?._id === userId ||
                    currentUser?._id === leaderId) && (
                    <>
                      <LiaEdit
                        onClick={() => handleEdit(announce)}
                        size={20}
                        title="Modifier l'annonce"
                        cursor={"pointer"}
                        color="gold"
                      />
                      <MdOutlineDeleteSweep
                        onClick={() => handleDelete(announce._id)}
                        size={20}
                        title="Supprimer l'annonce"
                        cursor={"pointer"}
                        color="red"
                      />
                    </>
                  )}
                  Publiée le {new Date(announce.createdAt).toLocaleString()}
                </span>
              </div>
            ))
        ) : (
          <center>
            <p>Aucune annonce pour le moment.</p>
          </center>
        )}
      </div>
      <AnnounceModal
        open={open}
        setOpen={setOpen}
        userId={userId}
        teamId={teamId}
        editAnnounce={editAnnounce}
        onAnnounceChange={(newAnnounce, mode) => {
          if (mode === "edit") {
            setAnnouncesList((prev) =>
              prev.map((a) => (a._id === newAnnounce._id ? newAnnounce : a))
            );
          } else {
            setAnnouncesList((prev) => [newAnnounce, ...prev]);
          }
          setEditAnnounce(null);
        }}
      />
    </div>
  );
};

export default Announces;
