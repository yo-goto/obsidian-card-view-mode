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
    this.app.workspace.onLayoutReady(this.reallyEnable);
  }

  reallyEnable = () => {
    this.addStyle();
  }

  disable = () => {
    this.removeStyle(); 
  }

  async loadSettings() {
    this.settings = Object.assign(DEFAULT_SETTINGS, await this.loadData());
  }

  refresh = () => {
    this.updateStyle()
  }

  removeStyle = () => {
    const el = this.style;
    if (el) el.remove();
    document.body.classList.remove('plugin-card-view-mode');
    document.body.classList.remove('plugin-card-view-mode-cardtitle');
    document.body.classList.remove('plugin-card-view-mode-dropshadow');
    document.body.classList.remove('plugin-card-view-mode-remove-pane-boudaries');
    document.body.classList.remove('plugin-card-view-mode-hide-scrollbar');
  }

  addStyle = () => {
    this.style.setAttribute('type', 'text/css');

    // add style in head tag
    document.getElementsByTagName("head")[0].appendChild(this.style);
    document.body.classList.add('plugin-card-view-mode');
    this.updateStyle();
  }
  
  updateStyle = () => {
    // a. update boolean settings
    document.body.classList.toggle('plugin-card-view-mode-cardtitle', this.settings.cardTitle);
    document.body.classList.toggle('plugin-card-view-mode-dropshadow', this.settings.cardDropShadow);
    document.body.classList.toggle('plugin-card-view-mode-remove-pane-boudaries', this.settings.removePaneBoundaries);
    document.body.classList.toggle('plugin-card-view-mode-hide-scrollbar', this.settings.hideScrollBar);

    // b. update custom css properties
    const el = this.style;
    if (!el) throw "plugin-card-view-mode element not found!";
    else {
        el.textContent = `
        body.plugin-card-view-mode {
          --cardview-card-border-radius: ${this.settings.cardCornerRadius}px;
          --cardview-embedded-title-border-radius: ${this.settings.cardTitleCornerRadius}px;
          --cardview-card-border-weight: ${this.settings.cardBorderWeight}px;
        }
        body.plugin-card-view-mode.theme-light{
          --cardview-card-color-active: rgb(${this.settings.colorActiveCardLight});
          --cardview-card-color-non-active: rgb(${this.settings.colorNonActiveCardLight});
          --cardview-background-color-default: rgb(${this.settings.colorBackGroundLight});
          --header-color-background: rgb(${this.settings.colorTitleCardBackGroundLight});
          --cardview-card-border-color: rgb(${this.settings.colorCardBorderLight});
          --cardview-embedded-title-border-right-color-edit: rgb(${this.settings.colorTitleCardEdgeLight});
          --cardview-embedded-title-border-right-color-preview: rgb(${this.settings.colorTitleCardEdgeLight});
        }
        body.plugin-card-view-mode.theme-dark{
          --cardview-card-color-active: rgb(${this.settings.colorActiveCardDark});
          --cardview-card-color-non-active: rgb(${this.settings.colorNonActiveCardDark});
          --cardview-background-color-default: rgb(${this.settings.colorBackGroundDark});
          --header-color-background: rgb(${this.settings.colorTitleCardBackGroundDark});
          --cardview-card-border-color: rgb(${this.settings.colorCardBorderDark});
          --cardview-embedded-title-border-right-color-edit: rgb(${this.settings.colorTitleCardEdgeDark});
          --cardview-embedded-title-border-right-color-preview: rgb(${this.settings.colorTitleCardEdgeDark});
        }
        `;
    }
  }
  
}

