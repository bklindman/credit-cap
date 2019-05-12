import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material'; 

@Component({
  selector: 'app-dialog-add-more-accounts',
  templateUrl: './dialog-add-more-accounts.component.html',
  styleUrls: ['./dialog-add-more-accounts.component.scss']
})

export class DialogAddMoreAccountsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogAddMoreAccountsComponent>) {}

  ngOnInit() {}

}
