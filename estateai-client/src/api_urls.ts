// if development
const baseServerUrl = process.env.NODE_ENV === "production" ? "https://estate-ai.herokuapp.com/" :  'http://localhost:5000/'

export const urlConstants = {
    heatmapcordURL: `${baseServerUrl}api/heatmapRequest`
}