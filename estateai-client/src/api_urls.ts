// if development
const baseServerUrl = process.env.NODE_ENV === "production" ? "https://estate-ai.herokuapp.com/" :  'http://localhost:5000/'

export const urlConstants = {
    heatmapcordURL: `${baseServerUrl}api/heatmapRequest`,
    improvementsURL: `${baseServerUrl}api/distances/combinations/all`,
    distancesURL: `${baseServerUrl}api/distances`,
    searchURL: `${baseServerUrl}api/search`,
    assetPredictionURL: `${baseServerUrl}api/assetscore`,
    neighborhoodsDistances: `${baseServerUrl}api/distances/neiborhoods/all`
}