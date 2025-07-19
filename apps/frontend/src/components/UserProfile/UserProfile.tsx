import { useParams } from "react-router-dom";

import UserProfileStyles from "./UserProfile.module.scss";
import { useEffect, useState } from "react";
import { fetchUserById } from "../../utils/api/user";
import { User } from "../../utils/types/api";
import Menu from "../Menu/Menu";
import Sidebar from "../Sidebar/Sidebar";
import UserInfos from "../UserInfos/UserInfos";
import Announces from "../Announces/Announces";

const UserProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [userProfile, setUserProfile] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const userProfile = await fetchUserById(id);
      console.log("Profil de l'utilisateur:", userProfile);
      setUserProfile(userProfile);
    };

    fetchData();
  }, [id]);

  if (!userProfile) {
    return <div>Chargement du profil...</div>;
  }

  return (
    <>
      <Menu />
      <div className={UserProfileStyles.banner}>
        <h1 className={UserProfileStyles.title}>
          Bienvenue, {userProfile?.riot_id}
        </h1>
      </div>
      <div className={UserProfileStyles.container}>
        {userProfile?.riot_infos && (
          <Sidebar
            riotId={userProfile.riot_id}
            tagline={userProfile.tagline}
            riotInfos={userProfile.riot_infos}
          />
        )}
        <div className={UserProfileStyles.content}>
          {userProfile?.riot_infos && <UserInfos userProfile={userProfile} />}
          <Announces
            userId={userProfile?._id ?? ""}
            announces={userProfile?.announces ?? []}
          />
        </div>
      </div>
    </>
  );
};

export default UserProfile;
