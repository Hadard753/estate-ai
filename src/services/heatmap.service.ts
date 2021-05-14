import { Model, Schema, Document } from 'mongoose';
import { Service } from '@tsed/di';
import { DatabaseService } from './db.service';

export interface IHeatMap extends Document {
  lat: Number;
  lng: Number;
  weight: Number;
}

@Service()
export class HeatMapService {
  private heatMapModel: Model<IHeatMap, {}>;

  constructor(private databaseService: DatabaseService) { 
  }

  async getHeatMap() {
    if (this.heatMapModel === undefined) {
      const heatmapSchema: Schema = new Schema(
        { 
          lat : {type:Number},
          lng : {type:Number},
          weight :{type:Number},
        });

      this.heatMapModel = this.databaseService.db.model<IHeatMap>('HeatMap',heatmapSchema,'HeatMaps');
    }

    const result = await this.heatMapModel.find({});
    return result
  }
}


