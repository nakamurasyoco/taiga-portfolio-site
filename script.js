const gallery = document.getElementById("gallery");
const projectCount = document.getElementById("project-count");
const cardTemplate = document.getElementById("project-card-template");

const normalizeText = (value, fallback = "") => {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
};

const createCard = (project) => {
  const fragment = cardTemplate.content.cloneNode(true);
  const image = fragment.querySelector(".card-image");
  const meta = fragment.querySelector(".card-meta");
  const title = fragment.querySelector(".card-title");
  const description = fragment.querySelector(".card-description");

  const safeTitle = normalizeText(project.title, "Untitled Work");
  const safeCategory = normalizeText(project.category, "Design");
  const safeYear = normalizeText(project.year, "");

  image.src = project.image;
  image.alt = safeTitle;
  title.textContent = safeTitle;
  description.textContent = normalizeText(
    project.description,
    "説明は後から追加できます。"
  );
  meta.textContent = safeYear ? `${safeCategory} / ${safeYear}` : safeCategory;

  return fragment;
};

const renderProjects = (projects) => {
  gallery.innerHTML = "";
  projects.forEach((project) => gallery.appendChild(createCard(project)));
  projectCount.textContent = `${projects.length}件の作品を掲載中`;
};

const renderError = (message) => {
  gallery.innerHTML = `<p>${message}</p>`;
  projectCount.textContent = "";
};

const loadProjects = () => {
  try {
    const projects = window.PROJECTS;
    if (!Array.isArray(projects)) {
      throw new Error("window.PROJECTS is not an array.");
    }
    renderProjects(projects);
  } catch (error) {
    console.error(error);
    renderError(
      "作品データを読み込めませんでした。data/projects.js を確認してください。"
    );
  }
};

loadProjects();
