const CLOUD_NAME = "dx17lxzey";

export function getCloudinaryUrl(input, width = 600) {
  if (!input) return "";

  // Caso 1: ya es URL completa
  if (input.includes("res.cloudinary.com")) {
    return input.replace(
      "/upload/",
      `/upload/f_auto,q_auto,w_${width}/`
    );
  }

  // Caso 2: es public_id
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_${width}/${input}`;
}