import { useEffect, useState } from "react";

import UsersStyles from "./Users.module.scss";

import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Menu from "../../components/Menu/Menu";

import { fetchUsers } from "../../utils/api/user";
import { User } from "../../utils/types/api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useUser();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchUsers();
        setUsers(data);
        console.log("Utilisateurs récupérés:", data);
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

    loadUsers();
  }, []);

  const handleContactClick = (userId: string) => {
    if (currentUser?._id === userId) {
      navigate("/dashboard");
    } else {
      navigate(`/user/${userId}`);
    }
  };

  return (
    <>
      <Menu />
      <div className={UsersStyles.banner}>
        <h1 className={UsersStyles.title}>Choisir ton partenaire</h1>
      </div>
      <div className={UsersStyles.container}>
        {loading && <p>Chargement des joueurs...</p>}

        {error && <p style={{ color: "red" }}>Erreur: {error}</p>}

        {!loading && !error && (
          <div className={UsersStyles.usersList}>
            {users.length > 0 ? (
              users.map((user: User, index: number) => (
                <ProfileCard
                  key={index}
                  name={user.riot_id}
                  title={`#${user.tagline}`}
                  handle={user.discord || "N/A"}
                  wins={user.riot_infos?.wins ?? 0}
                  losses={user.riot_infos?.losses ?? 0}
                  tier={user.riot_infos?.tier || "Unranked"}
                  rank={user.riot_infos?.rank || ""}
                  contactText="Voir plus"
                  avatarUrl={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/${user.riot_infos?.profileIconId ?? 0}.png`}
                  showUserInfo={true}
                  enableTilt={true}
                  onContactClick={() => handleContactClick(user._id)}
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

export default Users;
