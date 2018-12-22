import { NgModule } from '@angular/core';
import { SortPipe } from './sort/sort';
import { SearchPipe } from './search/search';
@NgModule({
	declarations: [SortPipe,
    SearchPipe],
	imports: [],
	exports: [SortPipe,
    SearchPipe]
})
export class PipesModule {}
