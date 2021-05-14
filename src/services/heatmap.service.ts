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
export class HeatMapService {
  private saleModel: Model<ISale, {}>;

  constructor(private databaseService: DatabaseService) { 
  }

  async getHeatMap() {
    if (this.saleModel === undefined) {
      const saleSchema: Schema = new Schema(
        { 
          LATITUDE : {type:String},
          LONGITUDE : {type:String},
          PERCENTAGE_SCORE :{type:String},
          R2_SCORE_GROUP :{type:String},
        });

      this.saleModel = this.databaseService.db.model<ISale>('sale',saleSchema,'sales');
    }

    const result = await this.saleModel.find({"DEALID":"33986"});
    return result
  }
}


