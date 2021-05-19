// if development
const baseServerUrl = process.env.SERVER_URL ||  'http://localhost:5000/'

export const urlConstants = {
    heatmapcordURL: `${baseServerUrl}api/heatmapRequest`
}