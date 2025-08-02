import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import TeamProfileStyles from "./TeamProfile.module.scss";

import Menu from "../Menu/Menu";
import TeamSidebar from "../TeamSidebar/TeamSidebar";
import TeamInfos from "../TeamInfos/TeamInfos";

import { Team } from "../../utils/types/api";
import { fetchTeamById } from "../../utils/api/team";

const TeamProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [teamProfile, setTeamProfile] = useState<Team | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      if (!id) return;

      try {
        const team = await fetchTeamById(id);

        setTeamProfile(team);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'équipe:", error);
      }
    };

    fetchTeam();
  }, [id]);

  if (!teamProfile) {
    return <div>Chargement du profil...</div>;
  }

  console.log("Profil de l'équipe:", teamProfile);

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
            name={teamProfile.name}
            createdAt={teamProfile.createdAt}
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
              status={teamProfile.status ?? "active"}
              website={teamProfile.website ?? "N/A"}
              users={teamProfile.users ?? []}
            />
          )}
          {/* <Announces
            userId={userProfile?._id ?? ""}
            announces={userProfile?.announces ?? []}
          /> */}
        </div>
      </div>
    </>
  );
};

export default TeamProfile;
