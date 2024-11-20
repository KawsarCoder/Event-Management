import { getPlaiceholder } from "plaiceholder";

async function getBlurData(imageSrc) {
  const buffer = await fetch(imageSrc).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const data = await getPlaiceholder(buffer);

  return data;
}

export { getBlurData };
