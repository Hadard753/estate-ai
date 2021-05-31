import { Model, Schema, Document } from 'mongoose';
import { Service } from '@tsed/di';
import { DatabaseService } from './db.service';
import { parse } from 'superagent';
import { query, Router } from 'express';
import { HeatMapService } from './heatmap.service';
import { AssetScoreService } from './assetscore.service';
import { name } from 'faker';
import { Const, Name } from '@tsed/common';
import { DistancesService } from './distances.service';

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

@Service()
export class CombinationService {
    private busModel: Model<ICOORDINATES, {}>;
    private beachModel: Model<ICOORDINATES, {}>;
    private schoolModel: Model<ICOORDINATES, {}>;
    private trainModel: Model<ICOORDINATES, {}>;
    private highwayModel: Model<ICOORDINATES, {}>;
    private quartersModel: Model<IQUARTERS, {}>;
    private neiborhoodModel: Model<INEIGHBORHOOD, {}>;

    constructor(private databaseService: DatabaseService) {
    }

    //returns all neiborhoods of rooms with the score gives in the params
    async getAllSameScoreNeiorhoods(ROOMS: string, SCORE: string) {

        if (this.neiborhoodModel === undefined) {
            const neiborhoodSchema: Schema = new Schema(
                {
                    LAT: { type: String },
                    LONG: { type: String },
                    NEIGHBORHOOD: {type: String},
                });

            this.neiborhoodModel = this.databaseService.db.model<INEIGHBORHOOD>('neighborhood', neiborhoodSchema, 'neighborhoods');
        }
        
        const result = await this.neiborhoodModel.find({ [ROOMS]: SCORE });
        return result
    }
    
    //returns neiborhoods distances with the same neiborhood score 
    async getDistancesByNeiborhood(ROOMS: string, SCORE: string, AREASCORE: string){
        var toFunc =  await this.getAllSameScoreNeiorhoods(ROOMS, SCORE)
        const w =  await this.getDistancesNeiborhoods(toFunc, AREASCORE)
        return  w
    }

//To whoever - I am trying to get either all distances or distances according to a certain subject (BUS, BEACH etc) but it keeps giving me pending promises
//When I get for a specific lat long its easy, but for some reason for a lot of values like Im trying below, it doesn't come back
//I can't find a way to bring back the calculates function (because it is async..) Do I have to create a func that isn't sync? :()

    //returns area scores for chosen neiborhoods
    async getDistancesNeiborhoods(allNeiborhoods: INEIGHBORHOOD[], AREASCORE: string){
        const distancesS =   new DistancesService(this.databaseService)
        switch (AREASCORE) {
            case 'BUS':
                const ret_val =  allNeiborhoods.map( (doc: any) => {return  (distancesS.getBusMinDistance(doc.LATITUDE, doc.LONGITUDE))})
                break;

            return ret_val
        }
        
       
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


