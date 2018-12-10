const config = {
    radius: 1500,
    key: `AIzaSyDhQ07lVAQaV83qLQo6QyJt4H0KpHtZyYU`,
    type: `gas_station`,
    keyword: `gas`
}

const endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json`;

const getGasStations = (lat, lon) => {
    //32.0041473,34.8194882
    const URL = `${endpoint}?location=${lat},${lon}&radius=${config.radius}&keyword=${config.keyword}&key=${config.key}&type=${config.type}`;
    return fetch(URL);
};


export default {
    getGasStations,

};