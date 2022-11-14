import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private renderer!: Renderer2;
  private loaderEl: HTMLElement;
  private loaderTxt: HTMLElement;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loaderEl = this.renderer.selectRootElement('.ld', true);
    this.loaderTxt = this.renderer.selectRootElement('.ld__txt', true);
  }

  /**
   * @param {boolean} loaderShow hide or show loader
   * @param {string|number} txt  text or message to be displayed while showing the loader
   */
  showLoader(loaderShow: boolean = true, txt: string | number = `Loading...`) {
    this.renderer.setProperty(this.loaderTxt, 'innerHTML', txt);
    if (loaderShow) {
      this.renderer.setStyle(this.loaderEl, 'display', 'init');
      this.renderer.removeClass(this.loaderEl, 'ld__fade-out');
    } else {
      this.renderer.addClass(this.loaderEl, 'ld__fade--out');
      setTimeout(() => {
        this.renderer.setStyle(this.loaderEl, 'display', 'none');
      }, 800);
    }
  }
}
