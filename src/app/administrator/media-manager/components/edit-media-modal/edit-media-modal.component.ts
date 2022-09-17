import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-media-modal',
  templateUrl: './edit-media-modal.component.html',
  styleUrls: ['./edit-media-modal.component.scss']
})
export class EditMediaModalComponent implements OnInit {

  closeEditMedia() {
    this.modalService.dismissAll();
  }

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  submit() {
  }

}
