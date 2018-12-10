
import PositionService from '../services/PositionService';
import PlacesService from '../services/PlacesService';

const patterns = [{ id: 0, regex: /(sonol|סונול)/ },
{ id: 1, regex: /(paz|פז)/ },
{ id: 3, regex: /(dor alon|דור אלון)/ },
{ id: 2, regex: /(delek|דלק)/ }];

const findMatchStation = results => {
    for (let j = 0; j < results.length; j++) {
        for (let i = 0; i < patterns.length; i++) {
            if (patterns[i].regex.test(results[j].name)) {
                return patterns[i];
            }
        }
    }
};

const getClosestGasStation = async () => {
    const position = await PositionService.getCurrentPosition();

    const nereastGasStations = await PlacesService.getGasStations(position.latitude, position.longitude);
    const parsed = JSON.parse(nereastGasStations._bodyInit);

    if (parsed.results.length) {
        return {position,gasStation : findMatchStation(parsed.results)};
    }

    return {position};
};

export default {
    getClosestGasStation,

};