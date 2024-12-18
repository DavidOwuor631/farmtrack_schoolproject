import { Component } from '@angular/core';
import { Product } from '../../models/Product';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { FilterComponent } from "../filter/filter.component";
import { ProductitemComponent } from "../productitem/productitem.component";

@Component({
  selector: 'app-productlist',
  standalone: true,
  imports: [SearchBarComponent, FilterComponent, ProductitemComponent],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.css'
})
export class ProductlistComponent {

  products: Product[] = [];
  filteredProducts: Product[] = [];

  ngOnInit(): void {
    // initializing product data
    this.products = [
      { id: 1, name: 'Tomatoes', price: 1.99, imageUrl: 'tomatoes.jpg' },
      { id: 2, name: 'Carrots', price: 0.99, imageUrl: 'carrots.jpg' },
      { id: 3, name: 'Lettuce', price: 1.50, imageUrl: 'lettuce.jpg' },
    ];
    this.filteredProducts = [...this.products]; // Copying products to filteredProducts
  }

  onSearch(term: string): void {
    this.applyFilters();
  }

  onFilterChange(filter: string): void {
    this.applyFilters();
  }

  onSortChange(sortBy: string): void {
    this.applyFilters(sortBy);
  }

  applyFilters(sortBy?: string): void {
    let filtered = this.products;

    // search, filter, and sorting logic here
    // Eg: sorting by price
    if (sortBy) {
      filtered = this.sortProducts(filtered, sortBy);
    }

    this.filteredProducts = filtered;
  }

  sortProducts(products: Product[], sortBy: string): Product[] {
    switch (sortBy) {
      case 'priceLowHigh':
        return products.sort((a, b) => a.price - b.price);
      case 'priceHighLow':
        return products.sort((a, b) => b.price - a.price);
      case 'nameAsc':
        return products.sort((a, b) => a.name.localeCompare(b.name));
      case 'nameDesc':
        return products.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return products;
    }

    
  }

}
