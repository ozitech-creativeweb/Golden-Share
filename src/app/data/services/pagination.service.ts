import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaginationService {
    private subject = new Subject<any>();

    setCurrentPage(pageNum: number) {
        this.subject.next(pageNum);
    }

    getCurrentPage(): Observable<any> {
        return this.subject.asObservable();
    }

    links(data: number, per_page: number, current_page: number = 1) {
        let no_of_pages, page_prev, page_next;
        no_of_pages = Math.ceil( (data) / per_page );

        page_prev = (current_page === 1 || (!current_page)) ? 1 : ( current_page - 1) ;
        page_next = (current_page === no_of_pages) ? no_of_pages : ( current_page + 1);

        const linkStatus = (page_prev === current_page) ? 'btn disabled' : '';
        const linkStatus2 = (page_next === current_page) ? 'btn disabled' : '';

        const linkObj = [];
        linkObj.push({
            'text': 'Prev',
            'num': page_prev,
            'link': '/page/' + page_prev,
            'linkStatus': linkStatus
        });

        let link, i, active;
        link = '';
        for (i = 1; i <= no_of_pages; i++) {
            if (current_page === i) {
                active = 'btn active disabled';
            } else if (!current_page && (i === 1)) {
                active = 'btn active disabled';
            } else {
                active = '';
            }

            linkObj.push({
                'text': i,
                'num': i,
                'link': '/page/' + i,
                'linkStatus': active
            });
        }

        linkObj.push({
            'text': 'Next',
            'num': page_next,
            'link': '/page/' + page_next,
            'linkStatus': linkStatus2
        });

        return  linkObj ;
    }
}
