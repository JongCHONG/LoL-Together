import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import { LiaEdit } from "react-icons/lia";

import TeamProfileStyles from "./TeamProfile.module.scss";

import Menu from "../Menu/Menu";
import TeamSidebar from "../TeamSidebar/TeamSidebar";
import TeamInfos from "../TeamInfos/TeamInfos";

import { Team } from "../../utils/types/api";
import { fetchTeamById, updateTeam } from "../../utils/api/team";

import { useUser } from "../../contexts/UserContext";
import Announces from "../Announces/Announces";

const TeamProfile = () => {
  const { currentUser } = useUser();

  const { id } = useParams<{ id: string }>();
  const [teamProfile, setTeamProfile] = useState<Team | null>(null);
  const [editDescription, setEditDescription] = useState<boolean>(false);
  const [descriptionText, setDescriptionText] =
    useState<string>("Aucune description");

  const handleSubmit = useCallback(
    async (values: { description: string }) => {
      try {
        if (!id) {
          console.error("Team ID is undefined. Cannot update team.");
          return;
        }
        setDescriptionText(values.description);
        setEditDescription(false);

        await updateTeam(id, {
          description: values.description,
        });
      } catch (error) {
        console.error("Failed to update team description:", error);
      }
    },
    [id]
  );

  useEffect(() => {
    const fetchTeam = async () => {
      if (!id) return;

      try {
        const team = await fetchTeamById(id);

        setTeamProfile(team);
        setDescriptionText(team.description || "Aucune description");
      } catch (error) {
        console.error("Erreur lors de la récupération de l'équipe:", error);
      }
    };

    fetchTeam();
  }, [id]);

  if (!teamProfile) {
    return <div>Chargement du profil...</div>;
  }

  return (
    <>
      <Menu />
      <div className={TeamProfileStyles.banner}>
        <h1 className={TeamProfileStyles.title}>Team {teamProfile?.name}</h1>
      </div>
      <div className={TeamProfileStyles.container}>
        {teamProfile && (
          <TeamSidebar
            logo={teamProfile.logo}
            leader={teamProfile.leader}
            name={teamProfile.name ?? ""}
            createdAt={teamProfile.createdAt ?? ""}
            userCount={teamProfile.users ? teamProfile.users.length : 1}
          />
        )}
        <div className={TeamProfileStyles.content}>
          {teamProfile && (
            <TeamInfos
              leaderId={teamProfile.leader?._id ?? ""}
              languages={teamProfile.languages ?? []}
              availabilities={
                teamProfile.availabilities ?? {
                  monday: false,
                  tuesday: false,
                  wednesday: false,
                  thursday: false,
                  friday: false,
                  saturday: false,
                  sunday: false,
                }
              }
              description={teamProfile.description ?? "N/A"}
              discord={teamProfile.discord ?? "N/A"}
              region={teamProfile.region ?? []}
              status={teamProfile.status ?? "En recrutement"}
              website={teamProfile.website ?? "N/A"}
              users={teamProfile.users ?? []}
              setTeamProfile={setTeamProfile}
            />
          )}

          <div className={TeamProfileStyles.members}>
            <div className={TeamProfileStyles.title}>Membres</div>
            {teamProfile?.users && teamProfile.users.length > 0
              ? teamProfile.users.map((user: any, index: number) => {
                  return (
                    <a
                      key={user._id ? String(user._id) : String(index)}
                      href={`/user/${user._id}`}
                      className={TeamProfileStyles.member_link}
                    >
                      {user.riot_id ? user.riot_id : "N/A"}
                    </a>
                  );
                })
              : "Aucun membre"}
          </div>

          <div className={TeamProfileStyles.description}>
            <div className={TeamProfileStyles.header}>
              <div className={TeamProfileStyles.title}>Description</div>
              {currentUser?._id === teamProfile.leader?._id && (
                <LiaEdit
                  onClick={() => setEditDescription(true)}
                  size={24}
                  title="Modifier les informations"
                  cursor={"pointer"}
                  color="gold"
                />
              )}
            </div>
            <div className={TeamProfileStyles.description_text}>
              {editDescription ? (
                <Formik
                  initialValues={{ description: descriptionText }}
                  onSubmit={handleSubmit}
                >
                  {({ values, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <textarea
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                      />
                      <div className={TeamProfileStyles.button_container}>
                        <button
                          type="submit"
                          className={TeamProfileStyles.save_button}
                        >
                          Enregistrer
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              ) : (
                descriptionText
              )}
            </div>
          </div>
          <Announces
            id={teamProfile?._id ?? ""}
            announces={teamProfile?.announces ?? []}
          />
        </div>
      </div>
    </>
  );
};

export default TeamProfile;
