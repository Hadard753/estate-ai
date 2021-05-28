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

  constructor(private databaseService: DatabaseService) { 
  }

  
  async getBusDistances(LATITUDE: number, LONGITUDE: number) {
    if (this.busModel === undefined) {
      const busSchema: Schema = new Schema(
        { 
          LATITUDE : {type:String},
          LONGITUDE : {type:String},
        });

      this.busModel = this.databaseService.db.model<ICOORDINATES>('Bus_coordinate',busSchema,'Bus_coordinates');
    }

   
    const result = this.getMinDist(await this.busModel.find({}), LATITUDE, LONGITUDE);
    return result;
  }


getMinDist(coor:ICOORDINATES[],LATITUDE: number, LONGITUDE: number ):number{ 
const distances = coor.map((doc:any) => {
    return this.calcDistance(LATITUDE, LONGITUDE, doc.LATITUDE, doc.LONGITUDE)
    }
);
return Math.min(...distances);
}


 calcDistance(LATITUDE1 : number, LONGITUDE1  : number, LATITUDE2 : number, LONGITUDE2  : number ): number{
        
    const dLONGITUDE = this.toRad(LONGITUDE2) - this.toRad(LONGITUDE1);
    const dLATITUDE = this.toRad(LATITUDE2) - this.toRad(LATITUDE1);
    const a = Math.sin(dLATITUDE/2)**2 + Math.cos(LATITUDE1) *Math.cos(LATITUDE2) *Math.sin(dLONGITUDE/2)**2
    const c = 2 *Math.asin(Math.sqrt(a))
    return 6371* c

    }
    private toRad(x:number):number {return x * Math.PI /180;}
}


