import { Document, Model, Schema } from 'mongoose';
import { parse } from 'superagent';

import { Service } from '@tsed/di';

import { DatabaseService } from './db.service';

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

@Service()
export class DistancesService {
    private busModel: Model<ICOORDINATES, {}>;
    private beachModel: Model<ICOORDINATES, {}>;
    private schoolModel: Model<ICOORDINATES, {}>;
    private trainModel: Model<ICOORDINATES, {}>;
    private highwayModel: Model<ICOORDINATES, {}>;
    private quartersModel: Model<IQUARTERS, {}>;

    constructor(private databaseService: DatabaseService) {
    }
    async getAllMinDistance(LATITUDE: number, LONGITUDE: number) {
        var bus = await this.getBusMinDistance(LATITUDE, LONGITUDE)
        var beach = await this.getBeachMinDistance(LATITUDE, LONGITUDE)
        var highway = await this.getHighwayMinDistance(LATITUDE, LONGITUDE)
        var school = await this.getSchoolMinDistance(LATITUDE, LONGITUDE)
        var train = await this.getTrainMinDistance(LATITUDE, LONGITUDE)
        return  { bus, beach, highway, school, train }
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


