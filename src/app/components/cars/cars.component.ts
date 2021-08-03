import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ICar} from "../../interfaces";
import {CarService} from "../../services";

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  form: FormGroup;
  cars: ICar[];

  constructor(private carService: CarService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      model: new FormControl(''),
      price: new FormControl(''),
      year: new FormControl('')
    })
    this.carService.getAll().subscribe(value => this.cars = value)
  }

  save(): void {
    this.carService.save(this.form.getRawValue())
      .subscribe(value => this.cars = [...this.cars, value], error => console.log(error))
  }
}
