import { Model, Schema, Document } from 'mongoose';
import { Service } from '@tsed/di';
import { DatabaseService } from './db.service';

export interface ISale extends Document {
  LATITUDE: String;
  LONGITUDE: String;
  PERCENTAGE_SCORE: String;
  R2_SCORE_GROUP: String;
}

@Service()
export class AssetScoreService {
  private saleModel: Model<ISale, {}>;

  constructor(private databaseService: DatabaseService) { 
  }

  async getAssetScore(roomNum: string, lat: string, lon: string) {
    if (this.saleModel === undefined) {
      const saleSchema: Schema = new Schema(
        { 
          LATITUDE : {type:String},
          LONGITUDE : {type:String},
          PERCENTAGE_SCORE :{type:String},
          R2_SCORE_GROUP :{type:String},
        });

      this.saleModel = this.databaseService.db.model<ISale>('neighborhood',saleSchema,'neighborhoods');
    }

    const result = await this.saleModel.find({"YEAR": 2022});
    return result
  }

  // async getHeatMap(year: string) {
  //   if (this.saleModel === undefined) {
  //     const saleSchema: Schema = new Schema(
  //       { 
  //         LATITUDE : {type:String},
  //         LONGITUDE : {type:String},
  //         PERCENTAGE_SCORE :{type:String},
  //         R2_SCORE_GROUP :{type:String},
  //       });

  //     this.saleModel = this.databaseService.db.model<ISale>('neighborhood',saleSchema,'neighborhoods');
  //   }

  //   const result = await this.saleModel.find({"YEAR": year});
  //   return result
  // }
}


