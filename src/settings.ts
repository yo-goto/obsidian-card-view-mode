import { 
  App, 
  Plugin, 
  PluginSettingTab, 
  Setting, 
} from 'obsidian';


declare class CardViewModePlugin extends Plugin {
  settings: CardViewModeSettings;
  disable(): void;
  enable(): void;
  refresh(): void;
}


export interface CardViewModeSettings {
  disabled: boolean;
  cardTitle: boolean;
  colorBackGroundLight: string;
  colorBackGroundDark: string;
  colorActiveCardLight: string;
  colorActiveCardDark: string;
  colorNonActiveCardDark: string;
  colorNonActiveCardLight: string;
  colorTitleCardEdge: string;
  colorTitleCardBackGroundLight: string;
  colorTitleCardBackGroundDark: string;
  colorDiffBetweenActive: number;
}

export const DEFAULT_SETTINGS: CardViewModeSettings = {
  disabled: true,
  cardTitle: false,
  colorBackGroundLight: "255, 255, 255",
  colorBackGroundDark: "145, 145, 145",
  colorActiveCardLight: "255, 255, 255",
  colorActiveCardDark: "71, 71, 71",
  colorNonActiveCardDark: "71, 71, 71",
  colorNonActiveCardLight: "255, 255, 255",
  colorTitleCardEdge: "227, 76, 38",
  colorTitleCardBackGroundLight: "242, 242, 242",
  colorTitleCardBackGroundDark: "0, 0, 0",
  colorDiffBetweenActive: 20
}

export class CardViewModeSettingTab extends PluginSettingTab {
  plugin: CardViewModePlugin;
  constructor(app: App, plugin: CardViewModePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("Toggle Card View")
      .setDesc("Turns card view mode on or off globally")
      .addToggle(toggle => toggle.setValue(!this.plugin.settings.disabled)
        .onChange((value) => {
          this.plugin.settings.disabled = !value;
          this.plugin.saveData(this.plugin.settings);
          if (this.plugin.settings.disabled) {
            this.plugin.disable();
          }
          else {
            this.plugin.enable();
          }
        }
      )
    );

    new Setting(containerEl)
      .setName("Toggle Card Title")
      .setDesc("Experimental: View titles as cards. Enable this option with Embedded Note Title Plugin.")
      .addToggle(toggle => toggle.setValue(this.plugin.settings.cardTitle)
        .onChange((value) => {
          this.plugin.settings.cardTitle = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }
      )
    );


    new Setting(containerEl)
      .setName("Background Color in Light Mode")
      .setDesc("Specify background color in light mode")
      .controlEl.createEl(
        "input",
        {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorBackGroundLight)
        },
        (el) => {
            el.value = rgbToHex(this.plugin.settings.colorBackGroundLight);
            el.oninput = ({ target }) => {
                let color = hexToRgb((target as HTMLInputElement).value);

                if (!color) return;
                this.plugin.settings.colorBackGroundLight = `${color.r}, ${color.g}, ${color.b}`;
                this.plugin.saveData(this.plugin.settings)
                this.plugin.refresh();
            };
        }
    );
    
    new Setting(containerEl)
      .setName("Background Color in Dark Mode")
      .setDesc("Specify background color in dark mode")
      .controlEl.createEl(
        "input",
        {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorBackGroundDark)
        },
        (el) => {
            el.value = rgbToHex(this.plugin.settings.colorBackGroundDark);
            el.oninput = ({ target }) => {
                let color = hexToRgb((target as HTMLInputElement).value);

                if (!color) return;
                this.plugin.settings.colorBackGroundDark = `${color.r}, ${color.g}, ${color.b}`;
                this.plugin.saveData(this.plugin.settings)
                this.plugin.refresh();
            };
        }
    );

    new Setting(containerEl)
      .setName("Active Card Color in Light Mode")
      .setDesc("Specify active card color in light mode")
      .controlEl.createEl(
        "input",
        {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorActiveCardLight)
        },
        (el) => {
            el.value = rgbToHex(this.plugin.settings.colorActiveCardLight);
            el.oninput = ({ target }) => {
                let color = hexToRgb((target as HTMLInputElement).value);

                if (!color) return;
                this.plugin.settings.colorActiveCardLight = `${color.r}, ${color.g}, ${color.b}`;
                this.plugin.settings.colorNonActiveCardLight = `${color.r - this.plugin.settings.colorDiffBetweenActive}, ${color.g - this.plugin.settings.colorDiffBetweenActive}, ${color.b - this.plugin.settings.colorDiffBetweenActive}`;                
                this.plugin.saveData(this.plugin.settings)
                this.plugin.refresh();
            };
        }
    );    

    new Setting(containerEl)
      .setName("Active Card Color in Dark Mode")
      .setDesc("Specify active card color in dark mode")
      .controlEl.createEl(
        "input",
        {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorActiveCardDark)
        },
        (el) => {
            el.value = rgbToHex(this.plugin.settings.colorActiveCardDark);
            el.oninput = ({ target }) => {
                let color = hexToRgb((target as HTMLInputElement).value);

                if (!color) return;
                this.plugin.settings.colorActiveCardDark = `${color.r}, ${color.g}, ${color.b}`;
                this.plugin.settings.colorNonActiveCardDark = `${color.r - this.plugin.settings.colorDiffBetweenActive}, ${color.g - this.plugin.settings.colorDiffBetweenActive}, ${color.b - this.plugin.settings.colorDiffBetweenActive}`;
                this.plugin.saveData(this.plugin.settings)
                this.plugin.refresh();
            };
        }
    );

    new Setting(containerEl)
      .setName("Card Title Edge Color")
      .setDesc("Specify card tittle edge color")
      .controlEl.createEl(
        "input",
        {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorTitleCardEdge)
        },
        (el) => {
            el.value = rgbToHex(this.plugin.settings.colorTitleCardEdge);
            el.oninput = ({ target }) => {
                let color = hexToRgb((target as HTMLInputElement).value);

                if (!color) return;
                this.plugin.settings.colorTitleCardEdge = `${color.r}, ${color.g}, ${color.b}`;
                this.plugin.saveData(this.plugin.settings)
                this.plugin.refresh();
            };
        }
    );

    new Setting(containerEl)
      .setName("Card Title Background Color in Light Mode")
      .setDesc("Specify card tittle background color")
      .controlEl.createEl(
        "input",
        {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorTitleCardBackGroundLight)
        },
        (el) => {
            el.value = rgbToHex(this.plugin.settings.colorTitleCardBackGroundLight);
            el.oninput = ({ target }) => {
                let color = hexToRgb((target as HTMLInputElement).value);

                if (!color) return;
                this.plugin.settings.colorTitleCardBackGroundLight = `${color.r}, ${color.g}, ${color.b}`;
                this.plugin.saveData(this.plugin.settings)
                this.plugin.refresh();
            };
        }
    );


    new Setting(containerEl)
      .setName("Card Title Background Color in Dark Mode")
      .setDesc("Specify card tittle background color")
      .controlEl.createEl(
        "input",
        {
            type: "color",
            value: rgbToHex(this.plugin.settings.colorTitleCardBackGroundDark)
        },
        (el) => {
            el.value = rgbToHex(this.plugin.settings.colorTitleCardBackGroundDark);
            el.oninput = ({ target }) => {
                let color = hexToRgb((target as HTMLInputElement).value);

                if (!color) return;
                this.plugin.settings.colorTitleCardBackGroundDark = `${color.r}, ${color.g}, ${color.b}`;
                this.plugin.saveData(this.plugin.settings)
                this.plugin.refresh();
            };
        }
    );

    // SLIDER setting
    // new Setting(containerEl)
    //   .setName('Diff Between Active & NonActive Cards')
    //   .setDesc('Spcifiy Color difference between active & non active cards. Set 0 to diable "Attention pane"')
    //   .addSlider(slider => slider
    //     .setLimits(100, 100, 5)
    //     .setValue(this.plugin.settings.colorDiffBetweenActive)
    //     .onChange((value) => {
    //       this.plugin.settings.colorDiffBetweenActive = value;
    //       let activeColorLight = hexToRgb(rgbToHex(this.plugin.settings.colorActiveCardDark));
    //       let activeColorDark = hexToRgb(rgbToHex(this.plugin.settings.colorActiveCardDark));
    //       this.plugin.settings.colorNonActiveCardLight = `${activeColorLight.r - value}, ${activeColorLight.g - value}, ${activeColorLight.b - value}`;
    //       this.plugin.settings.colorNonActiveCardDark = `${activeColorDark.r - value}, ${activeColorDark.g - value}, ${activeColorDark.b - value}`;
    //       this.plugin.saveData(this.plugin.settings);
    //       this.plugin.refresh();
    //     })
    // );

    new Setting(containerEl)
      .setName('Diff Between Active & NonActive Cards')
      .setDesc('Spcifiy Color difference between active & non active cards. Set 0 to diable "Attention pane"')
      .addText(text => text.setPlaceholder('Example: 700')
        .setValue((this.plugin.settings.colorDiffBetweenActive || '') + '')
        .setPlaceholder('defalut: 20')
        .onChange((value) => {
          let nu = Number(value)
          this.plugin.settings.colorDiffBetweenActive = nu;
          let activeColorLight = hexToRgb(rgbToHex(this.plugin.settings.colorActiveCardDark));
          let activeColorDark = hexToRgb(rgbToHex(this.plugin.settings.colorActiveCardDark));
          this.plugin.settings.colorNonActiveCardLight = `${activeColorLight.r - nu}, ${activeColorLight.g - nu}, ${activeColorLight.b - nu}`;
          this.plugin.settings.colorNonActiveCardDark = `${activeColorDark.r - nu}, ${activeColorDark.g - nu}, ${activeColorDark.b - nu}`;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        })
      );

  }
}

export class CardViewModeCommands {
  plugin: CardViewModePlugin;
  constructor(plugin: CardViewModePlugin) {
    this.plugin = plugin;
  }

  addToggleSettingCommand(id:string, name:string, settingName:string) {
    this.plugin.addCommand({
      id: id,
      name: name,
      callback: () => {
        // switch the setting, save and refresh
        //@ts-ignore
        this.plugin.settings[settingName] = !this.plugin.settings[settingName];
        this.plugin.saveData(this.plugin.settings);
        this.plugin.refresh();
      }
    });
  }

  addCommands(): void {
    this.plugin.addCommand({
      id: 'toggle-card-view-mode',
      name: 'Toggle Card View',
      callback: () => {
        // switch the disabled setting and save
        this.plugin.settings.disabled = !this.plugin.settings.disabled;
        this.plugin.saveData(this.plugin.settings);

        this.plugin.settings.disabled ? this.plugin.disable() : this.plugin.enable();
      }
    });

    this.addToggleSettingCommand('toggle-card-title', 'Toggle Card Title', 'cardTitle');
  }
}


function hexToRgb(hex: string) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16)
          }
        : null;
}
function componentToHex(c: number) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(rgb: string) {
    let result = /^(\d+),\s?(\d+),\s?(\d+)/i.exec(rgb);
    if (!result || !result.length) {
        return "";
    }
    return `#${componentToHex(Number(result[1]))}${componentToHex(
        Number(result[2])
    )}${componentToHex(Number(result[3]))}`;
}
