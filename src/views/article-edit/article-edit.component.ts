import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleService } from '../../app/services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractFormComponent } from '../../app/tools/abstract-form-component';

@Component({
  selector: 'app-article-edit',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './article-edit.component.html',
  styleUrl: './article-edit.component.css'
})
export class ArticleEditComponent extends AbstractFormComponent {
  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    src: new FormControl(null),
    lien: new FormControl("", {validators: [Validators.required], nonNullable: true}),
    titre: new FormControl("", {validators: [Validators.required], nonNullable: true}),
    alt: new FormControl("", {validators: [Validators.required], nonNullable: true}),
    description: new FormControl("", {validators: [Validators.required]})
  });

  pics: string[] = new Array(11) // crée un tableau de la taille souhaitée
    .fill(0) // affecte la même valeur à tous les éléments du tableau
    .map((v,i) => `pic${(i+1).toString().padStart(2,'0')}.jpg`) // transforme chaque valeur en utilisant ici leur index

  constructor(private service: ArticleService, private router: Router, route: ActivatedRoute) {
    super();
    route.paramMap.subscribe(param => {
      const id: number = +param.get('id')!
      if(id) service.byId(id).subscribe({
        // résultat obtenu à chaque changement quand tout se passe bien
        next: result => this.form.patchValue(result),
        // annonce qu'il n'y aura plus de changement emit
        complete: () => console.log("Fin des appels"),
        // en cas d'erreur lors d'une tentative de changement
        error: e => router.navigate(['/editor/0'])
      })
    })
  }




  onSubmit$(): void {
    this.service[this.form.value.id ? 'update' : 'save'](this.form.value)
      .subscribe(() => this.router.navigate(['/home']))
  }

}
