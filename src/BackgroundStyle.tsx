import { Cloudinary } from "@cloudinary/url-gen/index";

const cld = new Cloudinary({
  cloud: { cloudName: "dreftv0ue" },
  url: { secure: true },
});
const imgId = "tgd-bg";
const image = cld.image(imgId);
const bgFilter = "rgb(255, 180, 89,0.5)";

const url = image.toURL();
const BGStyle = {
  backgroundImage: `linear-gradient(${bgFilter}, ${bgFilter}),` + `url(${url})`,
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export default BGStyle;
