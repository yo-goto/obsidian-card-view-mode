import './styles.scss'
import { Plugin } from 'obsidian';
import { 
  CardViewModeSettings,
  DEFAULT_SETTINGS, 
  CardViewModeSettingTab, 
  CardViewModeCommands 
} from './settings';


export default class CardViewModePlugin extends Plugin {
  settings: CardViewModeSettings;
  style: HTMLStyleElement = document.head.createEl('style');

  async onload() {
      await this.loadSettings();
      if (!this.settings.disabled) this.enable();
      this.addSettingTab(new CardViewModeSettingTab(this.app, this));
      new CardViewModeCommands(this).addCommands();
  }

  onunload(){
    this.disable();
  }   

  enable = () => {
    // this.registerEvent(this.app.workspace.on('resize', this.handleResize));

    this.app.workspace.onLayoutReady(this.reallyEnable);
  }


  reallyEnable = () => {
    this.addStyle();
    // this.observeLeafWidth();
  }

  disable = () => {
    this.removeStyle(); 
  }

  async loadSettings() {
    this.settings = Object.assign(DEFAULT_SETTINGS, await this.loadData());
  }

  refresh = () => {
    this.updateStyle()
    // this.observeLeafWidth();
  }

  removeStyle = () => {
    const el = this.style;
    if (el) el.remove();
    document.body.classList.remove('plugin-card-view-mode');
    document.body.classList.remove('plugin-card-view-mode-cardtitle');
  }

  addStyle = () => {
    this.style.setAttribute('type', 'text/css');

    document.getElementsByTagName("head")[0].appendChild(this.style);
    document.body.classList.add('plugin-card-view-mode');
    this.updateStyle();
  }
  
  updateStyle = () => {
    // 1. remove style before changing
    // this.removeStyle();
    // これやるとスタイル更新されない

    // 2-a. update boolean settings
    document.body.classList.toggle('plugin-card-view-mode-cardtitle', this.settings.cardTitle);

    // 2-b. update custom css properties
    const el = this.style;
    if (!el) throw "plugin-card-view-mode element not found!";
    else {
        el.textContent = `
        body.plugin-card-view-mode {
          --cardview-embedded-title-border-right-color-edit: rgb(${this.settings.colorTitleCardEdge});
          --cardview-embedded-title-border-right-color-preview: rgb(${this.settings.colorTitleCardEdge});
        }
        body.plugin-card-view-mode.theme-light{
          --cardview-card-color-active: rgb(${this.settings.colorActiveCardLight});
          --cardview-card-color-non-active: rgb(${this.settings.colorNonActiveCardLight});
          --cardview-background-color-default: rgb(${this.settings.colorBackGroundLight});
          --header-color-background: rgb(${this.settings.colorTitleCardBackGroundLight});
        }
        body.plugin-card-view-mode.theme-dark{
          --cardview-card-color-active: rgb(${this.settings.colorActiveCardDark});
          --cardview-card-color-non-active: rgb(${this.settings.colorNonActiveCardDark});
          --cardview-background-color-default: rgb(${this.settings.colorBackGroundDark});
          --header-color-background: rgb(${this.settings.colorTitleCardBackGroundDark});
        }
        `;
    }
  }

  // handleResize = () => {
  //   if (this.app.workspace.layoutReady) {
  //     this.observeLeafWidth();
  //   }
  // }
 
  // observeLeafWidth = () => {
  //   const cardTitleWidthList = <NodeListOf<HTMLElement>>document.querySelectorAll('.embedded-note-titles .CodeMirror-scroll>h1[id*="title-"]');
  //   const paneLeafWidth = <NodeListOf<HTMLElement>>document.querySelectorAll('.CodeMirror-sizer .CodeMirror-lines>div[role="presentation"]');
    

  //   const resizeObserver = new ResizeObserver(entries => {
      
  //     for(let i = 0; i < entries.length; i++) {
  //       let entry = entries[i];
  //       if(entry.contentRect){
  //         cardTitleWidthList[i].style.width = String(entry.contentRect.width + 6) + `px`;
  //       }
  //     }
  //   });

  //   for(let k =0; k < paneLeafWidth.length; k++){
  //     resizeObserver.observe(paneLeafWidth[k]);
  //   }
  // }


}

