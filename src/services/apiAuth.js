import supabase, { supabaseUrl } from "./supabase";

export async function signup({
  fullName,
  email,
  password,
  role = "guest",
  guestId,
  nationalId,
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,

    options: {
      data: {
        fullName,
        avatar: "",
        role,
        guestId,
        nationalId,
      },
    },
  });
  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);

  //   console.log(data);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}


export async function updateCurrentUser({
  password,
  fullName,
  avatar,

}) {
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  // if (updates) updateData = { data: { updates } };
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { err } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (err) throw new Error(err.message);

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) throw new Error(error2.message);

  return updatedUser;
}
