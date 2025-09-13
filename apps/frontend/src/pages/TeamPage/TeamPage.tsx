import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import { LiaEdit } from "react-icons/lia";

import TeamPageStyles from "./TeamPage.module.scss";

import Menu from "../../components/Menu/Menu";
import TeamSidebar from "../../components/TeamSidebar/TeamSidebar";
import TeamInfos from "../../components/TeamInfos/TeamInfos";

import { Team } from "../../utils/types/api";
import { fetchTeamById, updateTeam } from "../../utils/api/team";

import { useUser } from "../../contexts/UserContext";
import Announces from "../../components/Announces/Announces";
import { useAuth } from "../../utils/hooks/useAuth";

const TeamPage = () => {
  const { currentUser } = useUser();
  const { token } = useAuth();
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
        }, token ?? "");
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

  console.log({ teamProfile });
  
  return (
    <>
      <Menu />
      <div className={TeamPageStyles.banner}>
        <h1 className={TeamPageStyles.title}>Team {teamProfile?.name}</h1>
      </div>
      <div className={TeamPageStyles.container}>
        {teamProfile && (
          <TeamSidebar
            id={teamProfile._id || ""}
            email={teamProfile.leader?.email || ""}
            logo={teamProfile.logo}
            leader={teamProfile.leader}
            name={teamProfile.name ?? ""}
            createdAt={teamProfile.createdAt ?? ""}
            userCount={teamProfile.users ? teamProfile.users.length : 1}
          />
        )}
        <div className={TeamPageStyles.content}>
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

          <div className={TeamPageStyles.members}>
            <div className={TeamPageStyles.title}>Membres</div>
            {teamProfile?.users && teamProfile.users.length > 0
              ? teamProfile.users.map((user: any, index: number) => {
                  return (
                    <a
                      key={user._id ? String(user._id) : String(index)}
                      href={`/user/${user._id}`}
                      className={TeamPageStyles.member_link}
                    >
                      {user.riot_id ? user.riot_id : "N/A"}
                    </a>
                  );
                })
              : "Aucun membre"}
          </div>

          <div className={TeamPageStyles.description}>
            <div className={TeamPageStyles.header}>
              <div className={TeamPageStyles.title}>Description</div>
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
            <div className={TeamPageStyles.description_text}>
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
                      <div className={TeamPageStyles.button_container}>
                        <button
                          type="submit"
                          className={TeamPageStyles.save_button}
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
            teamId={teamProfile?._id ?? ""}
            leaderId={teamProfile?.leader?._id ?? ""}
            announces={teamProfile?.announces ?? []}
          />
        </div>
      </div>
    </>
  );
};

export default TeamPage;
