const configuration = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 };

const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
        let watchId = navigator.geolocation.watchPosition(position => {
            const { longitude, latitude, accuracy } = position.coords;
            navigator.geolocation.clearWatch(watchId);

            resolve({ longitude, latitude, accuracy });
        },error => reject(error), configuration);
    });
}

export default {
    getCurrentPosition,

};