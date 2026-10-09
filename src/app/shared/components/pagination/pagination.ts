import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  totalItems = input.required<number>();
  pageSize = input<number>(5);
  currentPage = input<number>(1);

  pageChange = output<number>();

  totalPages = computed(() =>
    Math.ceil(this.totalItems() / this.pageSize())
  );

  pages = computed(() =>
    Array.from(
      { length: this.totalPages() },
      (_, index) => index + 1
    )
  );

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.pageChange.emit(page);
    }
  }

  previousPage(): void {
    this.goToPage(this.currentPage() - 1);
  }

  nextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }
}
