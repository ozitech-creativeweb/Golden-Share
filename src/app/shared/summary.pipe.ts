import {Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'summary'
})

export class SummaryPipe implements PipeTransform {
    length: number;
    transform(value: string, limit: number) {
        const actualLimit = limit ? limit : 25;
        if (value && value.length <= actualLimit ) {
            return value;
        } else {
            return value && value.substr(0, actualLimit) + '...';
        }
    }
}
