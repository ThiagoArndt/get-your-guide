"use client";
import ProfileContent from "@containers/profile-container/profile-content";
import ProfileTripsContent from "@containers/profile-container/profile-trips-content";
import { getImageFromBuffer } from "@services/imageHelper";
import axios from "axios";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

function ProfilePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [profile, setProfile] = useState<ProfileInterface | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/api/get-profile", { id: id });

        if (res.status === 200) {
          setProfile(res.data);
        } else {
          setError("Profile not found");
        }
      } catch (e) {
        setError("Profile not found");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return notFound();
  }

  if (!profile) {
    // If profile is still loading
    return <p>Carregando...</p>;
  }

  return (
    <div className="flex flex-col gap-8">
      <ProfileContent
        image={profile.profile_image}
        username={profile.username}
      />
      <ProfileTripsContent trips={profile.trips} />
    </div>
  );
}

export default ProfilePage;
