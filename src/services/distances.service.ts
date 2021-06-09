import { Document, Model, Schema } from 'mongoose';
import { parse } from 'superagent';
import { Service } from '@tsed/di';
import { DatabaseService } from './db.service';
import { arrayUnique } from 'class-validator';
import { UniqueItems } from '@tsed/common';
import { uniqueId } from 'lodash';
import { AssetScoreService } from './assetscore.service';

export enum ScoreEnum {
    'D',
    'C',
    'B',
    'A'
}
export interface ICOORDINATES extends Document {
    LATITUDE: String;
    LONGITUDE: String;
}
export interface IQUARTERS extends Document {
    EREA: String;
    Q1: String;
    Q2: String;
    Q3: String;
}
export interface INEIGHBORHOOD extends Document {
    LATITUDE: String;
    LONGITUDE: String;
    PERCENTAGE_SCORE: String;
    R2_SCORE_GROUP: String;
    NEIGHBORHOOD: String;
}
export interface INEIGHBORHOODDISTINCT extends Document {
    LAT: String;
    LONG: String;
    NEIGHBORHOOD: String;
}
@Service()
export class DistancesService {
    private busModel: Model<ICOORDINATES, {}>;
    private beachModel: Model<ICOORDINATES, {}>;
    private schoolModel: Model<ICOORDINATES, {}>;
    private trainModel: Model<ICOORDINATES, {}>;
    private highwayModel: Model<ICOORDINATES, {}>;
    private quartersModel: Model<IQUARTERS, {}>;
    private neiborhoodModel: Model<INEIGHBORHOOD, {}>;
    private neiborhoodDistinctModel: Model<INEIGHBORHOODDISTINCT, {}>;

    constructor(private databaseService: DatabaseService, private assetscoreService: AssetScoreService) {

    }

    async search(LATITUDE: number, LONGITUDE: number, ROOMS: string){
        var neiborHood = await this.assetscoreService.getAssetScore(ROOMS, LATITUDE, LONGITUDE)
        var neiborHoodScors = await this.getAllMinDistance(LATITUDE, LONGITUDE)
        var neiborHoodBetterDistances = await this.getAllDistancesByNeiborhood(ROOMS, neiborHood._doc.GENERAL_SCORE, neiborHoodScors.bus.toString(), neiborHoodScors.beach.toString(), neiborHoodScors.highway.toString(), neiborHoodScors.school.toString(), neiborHoodScors.train.toString())
        return {neiborHood, neiborHoodScors, neiborHoodBetterDistances}

    }

    async getAllNeiborhoodsDistances() {

        if (this.neiborhoodDistinctModel === undefined) {
            const neiborhoodDistinctSchema: Schema = new Schema(
                {
                    LAT: { type: String },
                    LONG: { type: String },
                    NEIGHBORHOOD: { type: String },
                });

            this.neiborhoodDistinctModel = this.databaseService.db.model<INEIGHBORHOODDISTINCT>('neighborhood_cords', neiborhoodDistinctSchema, 'neighborhood_cord');
        }
        var neiborhoods = await this.neiborhoodDistinctModel.find({});
        var results: any[] = await Promise.all(neiborhoods.map(async (doc: any): Promise<any> => {
            var name = doc.NEIGHBORHOOD
            var lat = doc.LAT
            var long = doc.LONG
            var scores = await this.getAllMinDistance(lat, long)
            return { name, scores }
        }));
        return results
    }
    async getAllSameScoreNeiorhoods(ROOMS: string, SCORE: string) {

        if (this.neiborhoodModel === undefined) {
            const neiborhoodSchema: Schema = new Schema(
                {
                    LAT: { type: String },
                    LONG: { type: String },
                    NEIGHBORHOOD: { type: String },
                });

            this.neiborhoodModel = this.databaseService.db.model<INEIGHBORHOOD>('neighborhood', neiborhoodSchema, 'neighborhoods');
        }


        switch (ROOMS) {
            case '':
                return await this.neiborhoodModel.find({ GENERAL_SCORE: SCORE });
            case '1':
                return await this.neiborhoodModel.find({ ONEBR_GENERAL_SCORE: SCORE });
            case '2':
                return await this.neiborhoodModel.find({ TWOBR_GENERAL_SCORE: SCORE });
            case '3':
                return await this.neiborhoodModel.find({ THREEBR_GENERAL_SCORE: SCORE });
            case '4':
                return await this.neiborhoodModel.find({ FOURBR_GENERAL_SCORE: SCORE });
            case '5':
                return await this.neiborhoodModel.find({ FIVEBR_GENERAL_SCORE: SCORE });
            case '6':
                return await this.neiborhoodModel.find({ SIXBR_GENERAL_SCORE: SCORE });
            default:
                return;
        }
    }

    async getWantefNeiborhoods(allNeiborhoods: any, CURRENTSSUBSCORE: string) {
        switch (CURRENTSSUBSCORE) {
            case 'A':
                var cur = ScoreEnum.A
                break;
            case 'B':
                var cur = ScoreEnum.B
                break;
            case 'C':
                var cur = ScoreEnum.C
                break;
            case 'D':
                var cur = ScoreEnum.D
                break;
                break;
        }
        var results: any[] = await Promise.all(allNeiborhoods.map(async (obj: any) => {
            var score = obj.score
            switch (obj.score) {
                case 'A':
                    var temp_score = ScoreEnum.A
                    break;
                case 'B':
                    var temp_score = ScoreEnum.B
                    break;
                case 'C':
                    var temp_score = ScoreEnum.C
                    break;
                case 'D':
                    var temp_score = ScoreEnum.D
                    break;
                    break;
            }
            var lat = obj.lat
            var long = obj.long
            var name = obj.name
            return { temp_score, name, score }
        }))
        var resultsFiltered = []
        var neiborhoods = []
        results.forEach(element => {
            if ((element.temp_score > cur) && (!neiborhoods.includes(element.name))) {
                var name = element.name
                var score = element.score
                resultsFiltered.push({ name, score })
                neiborhoods.push(name)
            }
        });
        return resultsFiltered
    }

    async getDistancesNeiborhoods(allNeiborhoods: any, AREASCORE: string) {
        switch (AREASCORE) {
            case 'BUS':
                var results: any[] = await Promise.all(allNeiborhoods.map(async (doc: any): Promise<any> => {
                    var score = await this.getBusMinDistance(doc.LAT, doc.LONG);
                    var lat = doc.LAT
                    var long = doc.LONG
                    var name = doc.NEIGHBORHOOD
                    return { score, lat, long, name }
                }));
                break;
            case 'TRAIN':
                var results: any[] = await Promise.all(allNeiborhoods.map(async (doc: any): Promise<any> => {
                    var score = await this.getTrainMinDistance(doc.LAT, doc.LONG);
                    var lat = doc.LAT
                    var long = doc.LONG
                    var name = doc.NEIGHBORHOOD
                    return { score, lat, long, name }
                }));
                break;
            case 'HIGHWAY':
                var results: any[] = await Promise.all(allNeiborhoods.map(async (doc: any): Promise<any> => {
                    var score = await this.getHighwayMinDistance(doc.LAT, doc.LONG);
                    var lat = doc.LAT
                    var long = doc.LONG
                    var name = doc.NEIGHBORHOOD
                    return { score, lat, long, name }
                }));
                break;
            case 'SCHOOL':
                var results: any[] = await Promise.all(allNeiborhoods.map(async (doc: any): Promise<any> => {
                    var score = await this.getSchoolMinDistance(doc.LAT, doc.LONG);
                    var lat = doc.LAT
                    var long = doc.LONG
                    var name = doc.NEIGHBORHOOD
                    return { score, lat, long, name }
                }));
                break;
            case 'BEACH':
                var results: any[] = await Promise.all(allNeiborhoods.map(async (doc: any): Promise<any> => {
                    var score = await this.getBeachMinDistance(doc.LAT, doc.LONG);
                    var lat = doc.LAT
                    var long = doc.LONG
                    var name = doc.NEIGHBORHOOD
                    return { score, lat, long, name }

                }));
                break;
        }
        return results
    }

    async getDistancesByRoomNeiborhood(ROOMS: string, SCORE: string, AREASCORE: string, CURRENTSSUBSCORE: string) {
        var toFunc = await this.getAllSameScoreNeiorhoods(ROOMS, SCORE)
        var scores = await this.getDistancesNeiborhoods(toFunc, AREASCORE)
        return await this.getWantefNeiborhoods(scores, CURRENTSSUBSCORE)
    }
    async getDistancesByNeiborhood(SCORE: string, AREASCORE: string, CURRENTSSUBSCORE: string) {
        var toFunc = await this.getAllSameScoreNeiorhoods("", SCORE)
        var scores = await this.getDistancesNeiborhoods(toFunc, AREASCORE)
        return await this.getWantefNeiborhoods(scores, CURRENTSSUBSCORE)
    }
    async getAllDistancesByNeiborhood(ROOMS: string, SCORE: string, busCurScore: string, beachCurScore: string, highwayCurScore: string, schoolCurScore: string, trainCurScore: string) {
        var toFunc
        if (ROOMS)
             toFunc = await this.getAllSameScoreNeiorhoods(ROOMS, SCORE)
        else
             toFunc = await this.getAllSameScoreNeiorhoods("", SCORE)

        var bus = await this.getWantefNeiborhoods(await this.getDistancesNeiborhoods(toFunc, 'BUS'), busCurScore ? busCurScore : 'B')
        var beach = await this.getWantefNeiborhoods(await this.getDistancesNeiborhoods(toFunc, 'BEACH'), beachCurScore ? beachCurScore : 'B')
        var highway = await this.getWantefNeiborhoods(await this.getDistancesNeiborhoods(toFunc, 'HIGHWAY'), highwayCurScore ? highwayCurScore : 'B')
        var school = await this.getWantefNeiborhoods(await this.getDistancesNeiborhoods(toFunc, 'SCHOOL'), schoolCurScore ? schoolCurScore : 'B')
        var train = await this.getWantefNeiborhoods(await this.getDistancesNeiborhoods(toFunc, 'TRAIN'), trainCurScore ? trainCurScore : 'B')

        return { bus, beach, highway, school, train }
    }
    

    async getAllMinDistance(LATITUDE: number, LONGITUDE: number) {
        var bus = await this.getBusMinDistance(LATITUDE, LONGITUDE)
        var beach = await this.getBeachMinDistance(LATITUDE, LONGITUDE)
        var highway = await this.getHighwayMinDistance(LATITUDE, LONGITUDE)
        var school = await this.getSchoolMinDistance(LATITUDE, LONGITUDE)
        var train = await this.getTrainMinDistance(LATITUDE, LONGITUDE)
        return { bus, beach, highway, school, train }
    }
    //Bus
    async getBusMinDistance(LATITUDE: number, LONGITUDE: number) {
        if (this.busModel === undefined) {
            const busSchema: Schema = new Schema(
                {
                    LATITUDE: { type: String },
                    LONGITUDE: { type: String },
                });

            this.busModel = this.databaseService.db.model<ICOORDINATES>('Bus_coordinate', busSchema, 'Bus_coordinates');
        }


        var AreaQ = await this.getQs('BUS')
        return this.getScore(AreaQ, this.getMinDist(await this.busModel.find({}), LATITUDE, LONGITUDE))
    }
    //Beach
    async getBeachMinDistance(LATITUDE: number, LONGITUDE: number) {
        if (this.beachModel === undefined) {
            const beachSchema: Schema = new Schema(
                {
                    LATITUDE: { type: String },
                    LONGITUDE: { type: String },
                });

            this.beachModel = this.databaseService.db.model<ICOORDINATES>('beach_coordinate', beachSchema, 'beach_coordinates');
        }

        var AreaQ = await this.getQs('BEACH')
        return this.getScore(AreaQ, this.getMinDist(await this.beachModel.find({}), LATITUDE, LONGITUDE))
    }
    //School
    async getSchoolMinDistance(LATITUDE: number, LONGITUDE: number) {
        if (this.schoolModel === undefined) {
            const schoolSchema: Schema = new Schema(
                {
                    LATITUDE: { type: String },
                    LONGITUDE: { type: String },
                });

            this.schoolModel = this.databaseService.db.model<ICOORDINATES>('schools_coordinate', schoolSchema, 'schools_coordinates');
        }


        var AreaQ = await this.getQs('SCHOOL')
        return this.getScore(AreaQ, this.getMinDist(await this.schoolModel.find({}), LATITUDE, LONGITUDE))
    }
    //Train
    async getTrainMinDistance(LATITUDE: number, LONGITUDE: number) {
        if (this.trainModel === undefined) {
            const trainSchema: Schema = new Schema(
                {
                    LATITUDE: { type: String },
                    LONGITUDE: { type: String },
                });

            this.trainModel = this.databaseService.db.model<ICOORDINATES>('Train_coordinate', trainSchema, 'Train_coordinates');
        }


        var AreaQ = await this.getQs('TRAIN')
        return this.getScore(AreaQ, this.getMinDist(await this.trainModel.find({}), LATITUDE, LONGITUDE))
    }
    //Train
    async getHighwayMinDistance(LATITUDE: number, LONGITUDE: number) {
        if (this.highwayModel === undefined) {
            const highwaySchema: Schema = new Schema(
                {
                    LATITUDE: { type: String },
                    LONGITUDE: { type: String },
                });

            this.highwayModel = this.databaseService.db.model<ICOORDINATES>('ayalon_coordinate', highwaySchema, 'ayalon_coordinates');
        }


        var AreaQ = await this.getQs('HIGHWAY')
        return this.getScore(AreaQ, this.getMinDist(await this.highwayModel.find({}), LATITUDE, LONGITUDE))
    }










    async getQs(AREA: String) {
        if (this.quartersModel === undefined) {
            const quartersSchema: Schema = new Schema(
                {
                    AREA: { type: String },
                    Q1: { type: String },
                    Q2: { type: String },
                    Q3: { type: String },
                });

            this.quartersModel = this.databaseService.db.model<IQUARTERS>('quarters_life_styles', quartersSchema, 'quarters_life_style');
        }

        return await this.quartersModel.find({}).where('AREA').equals(AREA)

    }




    //returns quarters for scores 
    getScore(Qa: IQUARTERS[], distance: number): String {
        return Qa.map((doc: any) => {
            if (distance < parseFloat(doc.Q1))
                return "A";
            else if (distance < parseFloat(doc.Q2))
                return "B";
            else if (distance < parseFloat(doc.Q3))
                return "C";
            return "D";
        }
        )[0];

    }


    //to get the minimum distanation from the entire list
    getMinDist(coor: ICOORDINATES[], LATITUDE: number, LONGITUDE: number): number {
        const distances = coor.map((doc: any) => {
            return this.calcDistance(LATITUDE, LONGITUDE, parseFloat(doc.LATITUDE), parseFloat(doc.LONGITUDE))
        }
        );
        return Math.min(...distances);
    }

    //function to calc distance Aviri
    calcDistance(LATITUDE1: number, LONGITUDE1: number, LATITUDE2: number, LONGITUDE2: number): number {

        const dLONGITUDE = this.toRad(LONGITUDE2) - this.toRad(LONGITUDE1);
        const dLATITUDE = this.toRad(LATITUDE2) - this.toRad(LATITUDE1);
        const a = (Math.sin(dLATITUDE / 2) * Math.sin(dLATITUDE / 2)) + Math.cos(LATITUDE1) * Math.cos(LATITUDE2) * (Math.sin(dLONGITUDE / 2) * Math.sin(dLONGITUDE / 2))
        const c = 2 * Math.asin(Math.sqrt(a))
        return 6371 * c

    }
    //to radians
    private toRad(x: number): number { return x * Math.PI / 180; }












}


