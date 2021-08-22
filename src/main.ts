import './styles.scss'
import { Plugin } from 'obsidian';
import { 
  CardViewModeSettings, 
  CardViewModeSettingTab, 
  CardViewModeCommands 
} from './settings';


export default class CardViewModePlugin extends Plugin {
  settings: CardViewModeSettings;

  async onload() {
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
    // const el = document.getElementById('plugin-card-view-mode');
    // if (el) el.remove();
    document.body.classList.remove('plugin-card-view-mode');
    document.body.classList.remove('plugin-card-view-mode-cardtitle');

    // document.body.removeClass('plugin-card-view-mode', 'plugin-card-view-mode-cardtitle');
  }

  addStyle = () => {
    // const css = document.createElement('style');
    // css.id = 'plugin-card-view-mode-cardtitle';
    // document.getElementsByTagName("head")[0].appendChild(css);

    // document.body.classList.add('plugin-card-view-mode');
    // this.updateStyle();

    const css = document.createElement('style');
    css.id = 'plugin-card-view-mode';
    document.getElementsByTagName("head")[0].appendChild(css);

    document.body.classList.add('plugin-card-view-mode');
    document.body.classList.add('plugin-card-view-mode-cardtitle');
    this.updateStyle();
  }
  
  updateStyle = () => {
    // 1. remove style before changing
    // this.removeStyle();
    // これやるとスタイル更新されない

    // 2-a. update boolean settings
    document.body.classList.toggle('plugin-card-view-mode-cardtitle', this.settings.cardTitle);

    // 2-b. updaate custom css properties
    const el = document.getElementById('plugin-card-view-mode');
    if (!el) throw "plugin-card-view-mode element not found!";
    else {
        el.innerText = `
        body.plugin-card-view-mode.theme-light{
          --cardview-card-color-active: rgb(${this.settings.colorActiveCardLight});
          --cardview-card-color-non-active: rgb(${this.settings.colorNonActiveCardLight});
          --cardview-background-color-default: rgb(${this.settings.colorBackGroundLight});
        }
        body.plugin-card-view-mode.theme-dark{
          --cardview-card-color-active: rgb(${this.settings.colorActiveCardDark});
          --cardview-card-color-non-active: rgb(${this.settings.colorNonActiveCardDark});
          --cardview-background-color-default: rgb(${this.settings.colorBackGroundDark});
        }
        `;
    }
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

  // fixifr = () => {  
  //   //　iframeタグのElementリストをifrObjsオブジェクトに取り込む  
  //   var ifrObjs=document.getElementsByTagName("iframe");  
  //  // iframeタグが複数個ある場合、各iframeタグについて表示されるページの高さにiframeの高さを調整する 
  //   for(let i=0; i<ifrObjs.length;i++){
  //        var ifrObj = ifrObjs.item(i);
  //        ifrObj.height = `ifrObj.contentDocument.body.scrollHeight`;
  //    }
  // }


}

