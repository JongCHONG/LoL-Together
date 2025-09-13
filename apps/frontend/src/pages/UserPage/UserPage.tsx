import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import UserPageStyles from "./UserPage.module.scss";

import { fetchUserById } from "../../utils/api/user";
import { User } from "../../utils/types/api";

import Menu from "../../components/Menu/Menu";
import UserSidebar from "../../components/UserSidebar/UserSidebar";
import UserInfos from "../../components/UserInfos/UserInfos";
import Announces from "../../components/Announces/Announces";

const UserPage = () => {
  const { id } = useParams<{ id: string }>();
  const [userProfile, setUserProfile] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      const userProfile = await fetchUserById(id);
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
      <div className={UserPageStyles.banner}>
        <h1 className={UserPageStyles.title}>
          Bienvenue, {userProfile?.riot_id}
        </h1>
      </div>
      <div className={UserPageStyles.container}>
        <UserSidebar
          riotId={userProfile.riot_id}
          tagline={userProfile.tagline}
          riotInfos={userProfile.riot_infos}
        />
        <div className={UserPageStyles.content}>
          <UserInfos userProfile={userProfile} />
          <Announces
            userId={userProfile?._id ?? ""}
            announces={userProfile?.announces ?? []}
          />
        </div>
      </div>
    </>
  );
};

export default UserPage;
