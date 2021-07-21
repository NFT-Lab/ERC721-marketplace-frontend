import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SellData } from '../art-detail-page.component';

@Component({
  selector: 'app-sell-dialog',
  templateUrl: './sell-dialog.component.html',
  styleUrls: ['./sell-dialog.component.css'],
})
export class SellDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SellDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SellData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
