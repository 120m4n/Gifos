/* -------------------------------------------------------------------------- */
/*                               GIPHY API INFO                               */
/* -------------------------------------------------------------------------- */

/* ------------------------- FORMATS ------------------------- */
/*  https://api.giphy.com/v1/gifs/trending?api_key=deN938U4Ef66YPDtShWaEralFVTOaOlc&limit=25&rating=g  */
let api_key = 'deN938U4Ef66YPDtShWaEralFVTOaOlc',
    urlApi = 'https://api.giphy.com/v1',
    urlTrendingGifs = `${urlApi}/gifs/trending?api_key=${api_key}&limit=12`,
    urlSrchSuggests = `${urlApi}/gifs/search/tags?api_key=${api_key}&q=`;
    urlTrendingTerms = `${urlApi}/trending/searches?api_key=${api_key}`;
    

async function getApiInfo(url) {
    const response = await fetch(url);
    const json = await response.json();
    let data = json.data;

    return data;
}
