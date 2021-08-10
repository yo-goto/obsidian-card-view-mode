import './styles.scss'
import { Plugin } from 'obsidian';
import { CardViewModeSettings, CardViewModeSettingTab, CardViewModeCommands } from './settings';


export default class CardViewModePlugin extends Plugin {
  settings: CardViewModeSettings;

  async onload() {
      // load settings
      this.settings = Object.assign(new CardViewModeSettings(), await this.loadData());

      // if it's not disabled in the settings, enable it
      if (!this.settings.disabled) this.enable();

      // add the settings tab
      this.addSettingTab(new CardViewModeSettingTab(this.app, this));
      // add the commands
      new CardViewModeCommands(this).addCommands();
  }

  onunload(){
    this.disable();
  }   

  enable = () => {
    this.registerEvent(this.app.workspace.on('resize', this.handleResize));

    // wait for layout to be ready to perform the rest
    this.app.workspace.layoutReady ? this.reallyEnable() : this.app.workspace.on('layout-change', this.reallyEnable);
  }

  // really enable things (once the layout is ready)
  reallyEnable = () => {
    // we don't need the event handler anymore
    this.app.workspace.off('layout-ready', this.reallyEnable);
    this.addStyle();

    this.recalculateLeaves();
  }

  // shut down mode
  disable = () => {
    this.removeStyle();
  }

  // refresh funcion for when we change settings
  refresh = () => {
    this.updateStyle()

    this.recalculateLeaves();
  }

  // remove the stlying elements we've created
  removeStyle = () => {
    const el = document.getElementById('plugin-card-view-mode');
    if (el) el.remove();
    document.body.classList.remove('plugin-card-view-mode');
    document.body.classList.remove('plugin-card-view-mode-cardtitle');
  }

  // add the styling elements we need
  addStyle = () => {
    // add a css block for our settings-dependent styles
    const css = document.createElement('style');
    css.id = 'plugin-card-view-mode-cardtitle';
    document.getElementsByTagName("head")[0].appendChild(css);

    document.body.classList.add('plugin-card-view-mode');
    this.updateStyle();
  }
  
  updateStyle = () => {
    // if we've got rotate headers on, add the class which enables it
    document.body.classList.toggle('plugin-card-view-mode-cardtitle', this.settings.cardTitle);
  }

  handleResize = () => {
    if (this.app.workspace.layoutReady) {
      this.recalculateLeaves();
    }
  }

  recalculateLeaves = () => {
    const cardTitlehList = document.querySelectorAll('.embedded-note-titles .CodeMirror-scroll>h1[id*="title-"]');
    const cardWidthList = document.querySelectorAll('.CodeMirror-sizer .CodeMirror-lines>div[role="presentation"]');
    
    for (var i = 0; i < cardTitlehList.length; i++) {
      var node1 = <HTMLElement>cardTitlehList[i];
      var node2 = <HTMLElement>cardWidthList[i];
      // node1.style.width = `${node2.clientWidth}px !important`;
      node1.style.width = `${node2.clientWidth + 22}px`;
    }
  }
 
  // // overriden function for rootSplit child resize
  // onChildResizeStart = (leaf: any, event: any) => {

  //   const startWidth = leaf.containerEl.clientWidth;

  //   // the mousemove event to trigger while resizing
  //   const mousemove = (e: any) => {
  //     const deltaX = e.pageX - event.pageX;
  //     leaf.containerEl.style.width = `${startWidth + deltaX}px`;
  //   }

  //   // the mouseup event to trigger at the end of resizing
  //   const mouseup = () => {
  //     // remove these event listeners. We're done with them
  //     document.removeEventListener("mousemove", mousemove);
  //     document.removeEventListener("mouseup", mouseup);
  //   }

  //   // Add the above two event listeners
  //   document.addEventListener("mousemove", mousemove);
  //   document.addEventListener("mouseup", mouseup);
  
  // }


  //   SizeObserver = () => {
  //   const bodys = document.querySelectorAll('.CodeMirror-sizer .CodeMirror-lines>div[role="presentation"]');
  //   const test = document.querySelectorAll('.embedded-note-titles .CodeMirror-scroll>h1[id*="title-"]');
  //   const observer = new ResizeObserver((entries) => {
  //       console.log(entries); // このインスタンスで監視している要素のうち、受け取った変化が入ったオブジェクト
  
  //       entries.forEach((entry) => {
  //           const rect = entry.contentRect;
  //           var node3 = <HTMLElement>test[0];
  //           node3.style.width = `${rect.width + 22}px`;
            
  //           observer.unobserve(entry.target); // １つの要素の監視だけを終了
  //       });
  //       observer.disconnect(); // このインスタンスに関連づいている監視を全て終了
  //   });
  
  //   // 監視を開始
  //   observer.observe(bodys[0]);
  
  // }
  

}


