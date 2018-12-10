const configuration = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { longitude, latitude, accuracy } = position.coords;

                resolve({ longitude, latitude, accuracy });
            },
            error => reject(error), configuration);
    });
}

export default {
    getCurrentPosition,

};