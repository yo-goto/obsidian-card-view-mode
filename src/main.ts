import './styles.scss'
import { Plugin } from 'obsidian';
import { CardViewModeSettings, CardViewModeSettingTab, CardViewModeCommands } from './settings';


export default class CardViewModePlugin extends Plugin {
  settings: CardViewModeSettings;

  async onload() {
      // load settings
      this.settings = Object.assign(new CardViewModeSettings(), await this.loadData());
      if (!this.settings.disabled) this.enable();
      this.addSettingTab(new CardViewModeSettingTab(this.app, this));
      new CardViewModeCommands(this).addCommands();
  }

  onunload(){
    this.disable();
  }   

  enable = () => {
    this.registerEvent(this.app.workspace.on('resize', this.handleResize));
    this.app.workspace.layoutReady ? this.reallyEnable() : this.app.workspace.on('layout-change', this.reallyEnable);
  }


  reallyEnable = () => {
    this.app.workspace.off('layout-ready', this.reallyEnable);
    this.addStyle();
    this.observeLeafWidth();
  }

  disable = () => {
    this.removeStyle();
    
  }

  refresh = () => {
    this.updateStyle()
    this.observeLeafWidth();
  }

  removeStyle = () => {
    const el = document.getElementById('plugin-card-view-mode');
    if (el) el.remove();
    document.body.classList.remove('plugin-card-view-mode');
    document.body.classList.remove('plugin-card-view-mode-cardtitle');
  }

  addStyle = () => {
    const css = document.createElement('style');
    css.id = 'plugin-card-view-mode-cardtitle';
    document.getElementsByTagName("head")[0].appendChild(css);

    document.body.classList.add('plugin-card-view-mode');
    this.updateStyle();
  }
  
  updateStyle = () => {
    document.body.classList.toggle('plugin-card-view-mode-cardtitle', this.settings.cardTitle);
  }

  handleResize = () => {
    if (this.app.workspace.layoutReady) {
      this.observeLeafWidth();
    }
  }
 
  observeLeafWidth = () => {
    const cardTitleWidthList = <NodeListOf<HTMLElement>>document.querySelectorAll('.embedded-note-titles .CodeMirror-scroll>h1[id*="title-"]');
    const paneLeafWidth = <NodeListOf<HTMLElement>>document.querySelectorAll('.CodeMirror-sizer .CodeMirror-lines>div[role="presentation"]');
    

    // コンストラクタとコールバック
    const resizeObserver = new ResizeObserver(entries => {
      
      for(let i = 0; i < entries.length; i++) {
        let entry = entries[i];
        if(entry.contentRect){
          cardTitleWidthList[i].style.width = String(entry.contentRect.width + 6) + `px`;
        }
      }
    });

    for(let k =0; k < paneLeafWidth.length; k++){
      resizeObserver.observe(paneLeafWidth[k]);
    }

  }
}


