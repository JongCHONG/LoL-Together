"use client";

import React, { useState, useEffect } from "react";

import PlayersStyles from "./players.module.scss";
import ProfileCard from "@/components/ProfileCard/ProfileCard";

type User = {
  riot_infos: {
    profileIconId: number;
    tier?: string;
    rank?: string;
    wins?: number;
    losses?: number;
  };
  riot_id: string;
  tagline: string;
  discord?: string; 
};

const page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("http://localhost:4000/api/users/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUsers(data);
          console.log("Utilisateurs récupérés:", data);
        } else {
          setError(
            data.message || "Erreur lors de la récupération des utilisateurs"
          );
        }
      } catch (error) {
        console.error("Erreur lors du fetch:", error);
        setError("Erreur de connexion au serveur");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className={PlayersStyles.banner}>
        <h1 className={PlayersStyles.title}>Choisir ton partenaire</h1>
      </div>
      <div className={PlayersStyles.container}>
        {loading && <p>Chargement des joueurs...</p>}

        {error && <p style={{ color: "red" }}>Erreur: {error}</p>}

        {!loading && !error && (
          <div className={PlayersStyles.usersList}>
            {users.length > 0 ? (
              users.map((user: User, index: number) => (
                <ProfileCard
                  key={index}
                  name={user.riot_id}
                  title={`#${user.tagline}`}
                  handle={user.discord || "N/A"}
                  wins={user.riot_infos.wins || 0}
                  losses={user.riot_infos.losses || 0}
                  tier={(user.riot_infos.tier && user.riot_infos.rank) ? `${user.riot_infos.tier} ${user.riot_infos.rank}` : "Non classé"}
                  contactText="Voir plus"
                  avatarUrl={`https://ddragon.leagueoflegends.com/cdn/13.24.1/img/profileicon/${user.riot_infos.profileIconId}.png`}
                  showUserInfo={true}
                  enableTilt={true}
                  onContactClick={() => console.log("Contact clicked")}
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

export default page;
