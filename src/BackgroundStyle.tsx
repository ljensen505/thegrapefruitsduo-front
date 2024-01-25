import { Cloudinary } from "@cloudinary/url-gen/index";

const cld = new Cloudinary({
  cloud: { cloudName: "dreftv0ue" },
  url: { secure: true },
});
const imgId = "tgd-bg";
const image = cld.image(imgId);
const bgFilter = "rgb(255, 180, 89,0.5)";

const url = image.toURL();
const BGStyleMobile = {
  backgroundColor: bgFilter,
};

const BGStyleDesktop = {
  backgroundImage: `linear-gradient(${bgFilter}, ${bgFilter}),` + `url(${url})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
};

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

function isFixedBackgroundSupported() {
  const testEl = document.createElement("div");
  testEl.style.backgroundAttachment = "fixed";
  return testEl.style.backgroundAttachment === "fixed";
}

const BGStyleFinal =
  !isMobile() && isFixedBackgroundSupported() ? BGStyleDesktop : BGStyleMobile;
export default BGStyleFinal;
