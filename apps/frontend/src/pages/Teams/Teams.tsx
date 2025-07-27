import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TeamsStyles from "./Teams.module.scss";

import Menu from "../../components/Menu/Menu";
import { fetchTeams } from "../../utils/api/team";

import { Team } from "../../utils/types/api";
import TeamCard from "../../components/TeamCard/TeamCard";

import defaultAvatar from "../../assets/default-avatar.png";

const Teams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchTeams();
        setTeams(data);
        console.log("Équipes récupérées:", data);
      } catch (error) {
        console.error("Erreur lors du fetch:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Erreur de connexion au serveur"
        );
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  const handleContactClick = useCallback((teamId: string) => {
    navigate(`/team/${teamId}`);
  }, [navigate]);

  return (
    <>
      <Menu />
      <div className={TeamsStyles.banner}>
        <h1 className={TeamsStyles.title}>Rejoindre une équipe</h1>
      </div>

      <div className={TeamsStyles.container}>
        {loading && <p>Chargement des joueurs...</p>}

        {error && <p style={{ color: "red" }}>Erreur: {error}</p>}

        {!loading && !error && (
          <div className={TeamsStyles.teamsList}>
            {teams.length > 0 ? (
              teams.map((team: Team, index: number) => (
                <TeamCard
                  key={index}
                  name={team.name}
                  title={team.leader?.riot_id || "N/A"}
                  handle={team.discord || "N/A"}
                  website={team.website || "N/A"}
                  contactText="Voir plus"
                  avatarUrl={team.logo || defaultAvatar}
                  showUserInfo={true}
                  enableTilt={true}
                  membersCount={team.users ? team.users.length + 1 : 1}
                  status={team.status || "active"}
                  onContactClick={() => handleContactClick(team._id)}
                />
              ))
            ) : (
              <p>Aucun joueur trouvé</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Teams;
