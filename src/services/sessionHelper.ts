import { getCurrentUser } from "@libs/session";

export async function validateUser(id: string) {
  const user = await getCurrentUser();
  console.log(user);
  console.log(id);
  if (user) {
    if (user.id !== id) {
      throw new Error("Este usuário não tem permissão");
    }
  } else {
    throw new Error("Usuário não autenticado");
  }
}
