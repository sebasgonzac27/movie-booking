import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FunctionResponse } from '@app/shared/interfaces';
import { LayoutComponent } from '@app/shared/layouts';
import { MoviesService } from '@app/shared/services';

@Component({
  selector: 'app-movie-functions',
  imports: [CommonModule, LayoutComponent],
  templateUrl: './movie-functions.component.html',
  styleUrl: './movie-functions.component.scss',
})
export class MovieFunctionsComponent implements OnInit {
  functions: FunctionResponse[] = [];

  constructor(
    private readonly moviesService: MoviesService,
    private readonly activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadFunctions();
  }

  loadFunctions() {
    const slug = this.activatedRoute.snapshot.paramMap.get('slug');

    if (!slug) {
      return;
    }

    this.moviesService.getFunctionsByMovieSlug(slug).subscribe((functions) => {
      this.functions = functions;
    });
  }
}
