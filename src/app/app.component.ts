import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, CdkDropListGroup, CdkDropList, CdkDrag, ]
})
export class AppComponent {

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  doing = ['Study']

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  paused = ["Play videogames"]

  dragging:boolean = false;

  drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  dragStart() {
    
    this.dragging = true;
  }

  dragEnd() {
    
    this.dragging = false;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if(this.dragging == true){
      const scrollElement = document.querySelector('.horizontal-scroll');
      if(scrollElement){
        const rect = scrollElement.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const shouldScroll = offsetX < rect.width * 0.1 || offsetX > rect.width * 0.9;
      
        if (shouldScroll) {
          const direction = offsetX < rect.width * 0.1 ? -1 : 1;
          scrollElement.scrollLeft += direction * 10; // adjust scroll speed here
        }
      }
    }
  }
  
}
