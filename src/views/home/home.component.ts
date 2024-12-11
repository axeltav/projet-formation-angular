import { Component, inject } from '@angular/core';
import { ArticleComponent } from "./article/article.component";
import { ArticleService } from '../../app/services/article.service';
import { Article } from './article';
import { StepperComponent } from "../../components/stepper/stepper.component";
import { StepComponent } from "../../components/stepper/step/step.component";
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ArticleComponent, StepperComponent, StepComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  articles: Article[] = [];

  constructor(service: ArticleService) {
    service.all().subscribe(result => {this.articles = result;console.log(this.articles);})
  }


}
