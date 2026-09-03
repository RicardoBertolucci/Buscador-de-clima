const sectionSuccess = document.querySelector(".weather__success");

export function clearInput(input) {
  input.value = "";
}

export function clearWeatherInformation() {
  sectionSuccess.hidden = true;
}

export async function loadStatusCity() {
  const sectionLoading = document.querySelector(".weather__loading");

  // Caso o atributo exista
  if (sectionLoading.hasAttribute("hidden")) {
    return (sectionLoading.hidden = false);
  }

  // Caso não exista
  return (sectionLoading.hidden = true);
}

// SECTION STATUS CURRENT
const showCityStatusCurrently = ({ name, data }) => {
  const sectionCurrent = document.querySelector(".weather__city-container");
  const nameCity = document.querySelector(".weather__city-name");
  const chanceRain = document.querySelector(".weather__city-rain span");
  const temperature = document.querySelector(".weather__city-temp");
  const now = data.current.time;
  const hourCurrent = Number(now.slice(11, 13));

  nameCity.textContent = name;

  chanceRain.textContent = `${data.hourly.precipitation_probability[hourCurrent]}%`;

  temperature.textContent = `${Math.trunc(data.current.temperature_2m)}°`;

  const resultShowIcon = climaPorCodigo(
    data.current.weather_code,
    "weather__icon-current",
  );

  sectionCurrent.insertAdjacentHTML("beforeend", resultShowIcon.svg);
};

export async function showSuccess({ name, data }) {
  if (sectionSuccess.hasAttribute("hidden")) sectionSuccess.hidden = false;

  showCityStatusCurrently({ name, data });
}






const FORMAS = {
  limpo: `
    <g stroke="#f7b733" stroke-width="4" stroke-linecap="round">
      <line x1="32" y1="5" x2="32" y2="12" />
      <line x1="32" y1="52" x2="32" y2="59" />
      <line x1="5" y1="32" x2="12" y2="32" />
      <line x1="52" y1="32" x2="59" y2="32" />
      <line x1="13" y1="13" x2="18" y2="18" />
      <line x1="46" y1="46" x2="51" y2="51" />
      <line x1="51" y1="13" x2="46" y2="18" />
      <line x1="18" y1="46" x2="13" y2="51" />
    </g>
    <circle cx="32" cy="32" r="14" fill="url(#g-sol)" />`,

  parcialmenteNublado: `
    <g stroke="#f7b733" stroke-width="3.5" stroke-linecap="round">
      <line x1="24" y1="4" x2="24" y2="10" />
      <line x1="4" y1="24" x2="10" y2="24" />
      <line x1="10" y1="10" x2="14" y2="14" />
      <line x1="38" y1="10" x2="34" y2="14" />
      <line x1="44" y1="24" x2="38" y2="24" />
    </g>
    <circle cx="24" cy="24" r="11" fill="url(#g-sol)" />
    <g fill="url(#g-nv2)">
      <circle cx="26" cy="44" r="10" />
      <circle cx="38" cy="38" r="13" />
      <circle cx="48" cy="45" r="9" />
      <rect x="24" y="44" width="26" height="10" rx="5" />
    </g>`,

  nublado: `
    <g fill="url(#g-nv)">
      <circle cx="22" cy="38" r="12" />
      <circle cx="36" cy="30" r="15" />
      <circle cx="47" cy="39" r="10" />
      <rect x="20" y="38" width="29" height="12" rx="6" />
    </g>`,

  nevoa: `
    <g fill="url(#g-nb)" opacity=".9">
      <circle cx="24" cy="30" r="11" />
      <circle cx="38" cy="26" r="13" />
      <rect x="22" y="28" width="28" height="10" rx="5" />
    </g>
    <g stroke="#9aa8b8" stroke-width="4" stroke-linecap="round" opacity=".75">
      <line x1="14" y1="44" x2="44" y2="44" />
      <line x1="20" y1="52" x2="50" y2="52" />
    </g>`,

  garoa: `
    <g fill="url(#g-nv)">
      <circle cx="22" cy="30" r="11" />
      <circle cx="36" cy="24" r="14" />
      <circle cx="46" cy="31" r="9" />
      <rect x="20" y="30" width="27" height="11" rx="5.5" />
    </g>
    <g stroke="#5fa8e5" stroke-width="3" stroke-linecap="round">
      <line x1="24" y1="47" x2="22" y2="52" />
      <line x1="34" y1="47" x2="32" y2="52" />
      <line x1="44" y1="47" x2="42" y2="52" />
    </g>`,

  chuva: `
    <g fill="url(#g-cf)">
      <circle cx="21" cy="27" r="12" />
      <circle cx="36" cy="21" r="15" />
      <circle cx="47" cy="28" r="10" />
      <rect x="19" y="27" width="29" height="12" rx="6" />
    </g>
    <g stroke="#2b7ec4" stroke-width="4" stroke-linecap="round">
      <line x1="20" y1="44" x2="15" y2="57" />
      <line x1="30" y1="44" x2="25" y2="57" />
      <line x1="40" y1="44" x2="35" y2="57" />
      <line x1="50" y1="44" x2="45" y2="57" />
    </g>`,

  tempestade: `
    <g fill="url(#g-tp)">
      <circle cx="21" cy="27" r="12" />
      <circle cx="36" cy="21" r="15" />
      <circle cx="47" cy="28" r="10" />
      <rect x="19" y="27" width="29" height="12" rx="6" />
    </g>
    <path d="M34 39 L22 55 L30 55 L26 63 L42 45 L33 45 Z" fill="#ffc93c" />`,

  neve: `
    <g fill="url(#g-ne)">
      <circle cx="22" cy="28" r="11" />
      <circle cx="36" cy="22" r="14" />
      <circle cx="46" cy="29" r="9" />
      <rect x="20" y="28" width="27" height="11" rx="5.5" />
    </g>
    <g stroke="#8fd0f0" stroke-width="2.5" stroke-linecap="round">
      <g>
        <line x1="21" y1="45" x2="21" y2="55" />
        <line x1="17" y1="47" x2="25" y2="53" />
        <line x1="25" y1="47" x2="17" y2="53" />
      </g>
      <g>
        <line x1="34" y1="45" x2="34" y2="55" />
        <line x1="30" y1="47" x2="38" y2="53" />
        <line x1="38" y1="47" x2="30" y2="53" />
      </g>
      <g>
        <line x1="47" y1="45" x2="47" y2="55" />
        <line x1="43" y1="47" x2="51" y2="53" />
        <line x1="51" y1="47" x2="43" y2="53" />
      </g>
    </g>`,
};

const CONDICOES = {
  0: { texto: "Céu limpo", formas: FORMAS.limpo },
  1: { texto: "Predominantemente limpo", formas: FORMAS.limpo },
  2: { texto: "Parcialmente nublado", formas: FORMAS.parcialmenteNublado },
  3: { texto: "Nublado", formas: FORMAS.nublado },

  45: { texto: "Névoa", formas: FORMAS.nevoa },
  48: { texto: "Névoa com geada", formas: FORMAS.nevoa },

  51: { texto: "Garoa fraca", formas: FORMAS.garoa },
  53: { texto: "Garoa moderada", formas: FORMAS.garoa },
  55: { texto: "Garoa intensa", formas: FORMAS.garoa },
  56: { texto: "Garoa congelante fraca", formas: FORMAS.garoa },
  57: { texto: "Garoa congelante intensa", formas: FORMAS.garoa },

  61: { texto: "Chuva fraca", formas: FORMAS.chuva },
  63: { texto: "Chuva moderada", formas: FORMAS.chuva },
  65: { texto: "Chuva forte", formas: FORMAS.chuva },
  66: { texto: "Chuva congelante fraca", formas: FORMAS.chuva },
  67: { texto: "Chuva congelante forte", formas: FORMAS.chuva },
  80: { texto: "Pancadas de chuva fracas", formas: FORMAS.chuva },
  81: { texto: "Pancadas de chuva", formas: FORMAS.chuva },
  82: { texto: "Pancadas de chuva fortes", formas: FORMAS.chuva },

  71: { texto: "Neve fraca", formas: FORMAS.neve },
  73: { texto: "Neve moderada", formas: FORMAS.neve },
  75: { texto: "Neve forte", formas: FORMAS.neve },
  77: { texto: "Grãos de neve", formas: FORMAS.neve },
  85: { texto: "Pancadas de neve fracas", formas: FORMAS.neve },
  86: { texto: "Pancadas de neve fortes", formas: FORMAS.neve },

  95: { texto: "Tempestade", formas: FORMAS.tempestade },
  96: { texto: "Tempestade com granizo", formas: FORMAS.tempestade },
  99: { texto: "Tempestade com granizo forte", formas: FORMAS.tempestade },
};

const PADRAO = { texto: "Condição desconhecida", formas: FORMAS.nublado };

const climaPorCodigo = (codigo, classe) => {
  const condicao = CONDICOES[codigo] ?? PADRAO;

  return {
    texto: condicao.texto,
    svg: `<svg class="${classe}" viewBox="0 0 64 64" role="img" aria-label="${condicao.texto}">${condicao.formas}</svg>`,
  };
};



export async function showError() {
  const sectionError = document.querySelector(".weather__error");

  sectionError.hidden = true;
}




