import { auth, currentUser, User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const handleAuth = () => {
  let isOffline = false;

  if (isOffline) {
    let userId = "offline_userId_123";
    return userId;
  } else {
    const { userId } = auth();

    if (!userId) {
      redirect("/");
    }

    return userId;
  }
};

export const handleCurrentUser = async () => {
  let isOffline = false;

  if (isOffline) {
    let user = {
      id: "offline_userId_123",
      fullName: "offlineUser1",
      firstName: "offline",
      lastName: "user",
      emailAddresses: [
        {
          emailAddress: "offline_user@email.com",
        },
      ],
      imageUrl: "/avatar.png",
    };
    return user;
  } else {
    let user = await currentUser();

    if (!user) {
      redirect("/");
    }

    return user;
  }
};
