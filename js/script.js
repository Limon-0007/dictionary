const dictionary = async (searchText) => {
  try {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    searchTexts(data[1] ? data[1] : data[0]);
  } catch (error) {
    console.log(error);
  }
};

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("keyup", (event) => {
    const alertBox = document.getElementById("alert-box");
  if (event.key === "Enter") {
    loaderIcon(true);
    alertBox.classList.add("hidden");
    dictionary(searchInput.value);
  }
});

// click the button and get the input field
document.getElementById("search-btn").addEventListener("click", () => {
  loaderIcon(true);
  const searchInput = document.getElementById("search-input").value;
  const alertBox = document.getElementById("alert-box");
  if (searchInput === "") {
    alertBox.classList.remove("hidden");
    loaderIcon(false);
  } else {
    alertBox.classList.add("hidden");
    loaderIcon(true);
  }

  dictionary(searchInput);
});

// display results
const searchTexts = (texts) => {
  // console.log(texts);
  loaderIcon(false);
  const textDescription = document.getElementById("text-description");
  textDescription.innerText = "";
  textDescription.className = "bg-slate-700 md:w-2/4 mx-auto p-6 rounded-xl";
  textDescription.innerHTML = `
<h4 class="text-xl mt-2">Word - ${texts.word}</h4>
<h1 class="text-2xl mt-2">Parts of speech:</h1>
<p>${
    texts.meanings[0].partOfSpeech
      ? texts.meanings[0].partOfSpeech
      : "No data found"
  }</p>
<h1 class="text-2xl mt-2">Synonyms:</h1>
<p>${
    texts.meanings[0].synonyms[0]
      ? texts.meanings[0].synonyms[0]
      : "No data found"
  }</p>
<h1 class="text-2xl mt-2">Antonyms:</h1>
<p>${
    texts.meanings[0].antonyms[0]
      ? texts.meanings[0].antonyms[0]
      : "No data found"
  }</p>
<h1 class="text-2xl mt-2">Definition:</h1>
<p>${
    texts.meanings[0].definitions[0].definition
      ? texts.meanings[0].definitions[0].definition
      : "No data found"
  }</p>
`;
};

// progress
const loaderIcon = (loading) => {
  const progress = document.getElementById("loader");
  if (loading) {
    progress.classList.remove("hidden");
  } else {
    progress.classList.add("hidden");
  }
};
