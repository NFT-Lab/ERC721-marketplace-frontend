import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BuyData } from '../art-detail-page.component';

@Component({
  selector: 'app-buy-dialog',
  templateUrl: './buy-dialog.component.html',
  styleUrls: ['./buy-dialog.component.css'],
})
export class BuyDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BuyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BuyData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
