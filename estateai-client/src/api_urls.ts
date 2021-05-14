// if development
const baseServerUrl = 'http://localhost:5000/' || process.env.SERVER_URL

export const urlConstants = {
    heatmapcordURL: `${baseServerUrl}api/heatmapRequest`
}