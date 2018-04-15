import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(seconds: number,hour?:boolean): string {
    if(hour){
      let arH=moment.utc(seconds*1000).format('HH:mm').split(':');
      let hora=arH[0];
      let min=arH[1];
      if((parseInt(hora))>=1){
        return hora+" hr "+min+" min";    
      }
      return min+" min"; 
    }else{
      return moment.utc(seconds*1000).format('mm:ss');      
    }
  }

}
