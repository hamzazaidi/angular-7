import {
  Directive,
  ViewContainerRef,
  ComponentFactoryResolver,
  Input,
  ComponentFactory,
  ElementRef,
  OnChanges,
  Renderer2,
  ComponentRef
} from '@angular/core';
import { LoadingComponent } from '../components/loading/loading.component';

@Directive({
  selector: '[appLoader]'
})
export class LoaderDirective implements OnChanges {
  loader: Loader;
  overlay: Overlay;
  root: Root;
  constructor(
    public vcr: ViewContainerRef,
    public factoryResolver: ComponentFactoryResolver,
    public el: ElementRef,
    public renderer: Renderer2
  ) {
    this.loader = new Loader(this.el.nativeElement, this.vcr, this.factoryResolver, this.renderer);
    this.overlay = new Overlay(this.el.nativeElement, this.renderer);
    this.root = new Root(this.el.nativeElement, this.renderer);

    this.root.applyStyles();
  }
  @Input() appLoader: boolean;


  ngOnChanges(changes) {
    if (!changes.appLoader.currentValue && !changes.appLoader.previousValue) { return; }
    if (changes.appLoader.currentValue === changes.appLoader.previousValue) { return; }
    if (changes.appLoader.currentValue) {
      this.loader.addLoader();
      this.overlay.createOverlay();
    } else {
      this.loader.removeLoader();
      this.overlay.removeOverlay();
    }
  }

}

class Loader {
  componentFactory: ComponentFactory<LoadingComponent>;
  componentRef: ComponentRef<LoadingComponent>;
  styles = [
    { styleName: 'position', styleValue: 'absolute' },
    { styleName: 'left', styleValue: '50%' },
    { styleName: 'top', styleValue: '35%' },
    { styleName: 'z-index', styleValue: '9999' }
  ];
  element: HTMLElement;
  constructor(
    public rootElement: HTMLElement,
    public vcr: ViewContainerRef,
    public factoryResolver: ComponentFactoryResolver,
    public renderer: Renderer2
  ) {
    this.componentFactory = this.factoryResolver.resolveComponentFactory(LoadingComponent);
  }

  addLoader() {
    this.componentRef = this.vcr.createComponent(this.componentFactory);
    this.element = this.componentRef.location.nativeElement;
    this.styles.forEach(s => this.renderer.setStyle(this.element, s.styleName, s.styleValue));
    this.rootElement.appendChild(this.element);
  }

  removeLoader() {
    this.rootElement.removeChild(this.element);
  }
}

class Root {
  styles = [
    { styleName: 'position', styleValue: 'relative' }
  ];
  constructor(
    public rootElement: HTMLElement,
    public renderer: Renderer2
  ) {}

  applyStyles() {
    this.styles.forEach(s => this.renderer.setStyle(this.rootElement, s.styleName, s.styleValue));
  }

  removeStyles() {
    this.styles.forEach(s => this.renderer.removeStyle(this.rootElement, s.styleName));
  }
}

class Overlay {
  styles = [
    { styleName: 'position', styleValue: 'absolute' },
    { styleName: 'top', styleValue: '0' },
    { styleName: 'left', styleValue: '0' },
    { styleName: 'width', styleValue: '100%' },
    { styleName: 'height', styleValue: '100%' },
    { styleName: 'background', styleValue: '#fff' },
    { styleName: 'opacity', styleValue: '0.7' },
  ];
  element: HTMLElement;
  constructor(
    public rootElement: HTMLElement,
    public renderer: Renderer2
  ) {}
  createOverlay() {
    this.element = this.renderer.createElement('div');
    this.styles.forEach(s => this.renderer.setStyle(this.element, s.styleName, s.styleValue));
    this.rootElement.appendChild(this.element);
  }

  removeOverlay() {
    this.rootElement.removeChild(this.element);
  }

}
