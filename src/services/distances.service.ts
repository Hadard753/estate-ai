import { Model, Schema, Document } from 'mongoose';
import { Service } from '@tsed/di';
import { DatabaseService } from './db.service';


export interface ICOORDINATES extends Document {
    LATITUDE: String;
    LONGITUDE: String;
}

@Service()
export class DistancesService {
    private busModel: Model<ICOORDINATES, {}>;
    private beachModel: Model<ICOORDINATES, {}>;
    private schoolModel: Model<ICOORDINATES, {}>;
    private trainModel: Model<ICOORDINATES, {}>;
    private highwayModel: Model<ICOORDINATES, {}>;

    constructor(private databaseService: DatabaseService) {
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


        const result = this.getMinDist(await this.busModel.find({}), LATITUDE, LONGITUDE);
        return result;
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


        const result = this.getMinDist(await this.beachModel.find({}), LATITUDE, LONGITUDE);
        return result;
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


        const result = this.getMinDist(await this.schoolModel.find({}), LATITUDE, LONGITUDE);
        return result;
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


        const result = this.getMinDist(await this.trainModel.find({}), LATITUDE, LONGITUDE);
        return result;
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


        const result = this.getMinDist(await this.highwayModel.find({}), LATITUDE, LONGITUDE);
        return result;
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


